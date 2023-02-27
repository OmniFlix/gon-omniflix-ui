import React from 'react';
import { Button } from '@mui/material';
import variables from '../../../utils/variables';
import * as PropTypes from 'prop-types';
import {
    fetchCollectionNFTS,
    hideTransferDialog,
    setTransferFail,
    setTransferSuccess,
} from '../../../actions/collection';
import { connect } from 'react-redux';
import { config } from '../../../config';
import { customTypes } from '../../../registry';
import {
    fetchTxHashIBC,
    initializeChainIBC,
    protoBufSigningIBC,
    setTxHashInProgressFalse,
    txSignAndBroadCastIBC,
} from '../../../actions/account/wallet';
import { showMessage } from '../../../actions/snackbar';
import { fetchBalance } from '../../../actions/account/BCDetails';
import withRouter from '../../../components/WithRouter';
import { fetchTimeoutHeight } from '../../../actions/account/IBCTokens';
import { ChainsList } from '../../../chains';
import { decodeFromBech32 } from '../../../utils/address';
import { getTimestampInNanoSeconds } from '../../../utils/date';

const IBCButton = (props) => {
    const handleClick = () => {
        let chainConfig = ChainsList && ChainsList[props.chain];
        if (!chainConfig.REST_URL) {
            chainConfig = ChainsList && ChainsList.omniflix;
        }

        props.initializeChainIBC(chainConfig, props.chain, (address) => {
            if (address.length && address[0] && address[0].address) {
                const ibcAddress = address[0].address;
                const updatedID = props.router.params.id.replaceAll('_', '/');
                const object = [{
                    type: '/ibc.applications.nft_transfer.v1.MsgTransfer',
                    value: {
                        source_port: 'nft-transfer',
                        source_channel: chainConfig.CHANNELS && chainConfig.CHANNELS[props.chainID],
                        class_id: updatedID,
                        token_ids: [
                            props.value && props.value.id,
                        ],
                        receiver: props.toAddress,
                        sender: props.value && props.value.owner,
                        timeout_height: undefined,
                        timeout_timestamp: getTimestampInNanoSeconds(),
                    },
                }];

                let balance = props.balance && props.balance.length && props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
                balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

                const Tx = {
                    msgs: object,
                    msgType: 'IBCTransferONFT',
                    fee: {
                        amount: [{
                            amount: String(5000),
                            denom: config.COIN_MINIMAL_DENOM,
                        }],
                        gasLimit: String(300000),
                    },
                    memo: '',
                };

                const type = customTypes && customTypes.IBCTransferONFT && customTypes.IBCTransferONFT.typeUrl;
                const granterInfo = {};
                if (props.allowances && props.allowances.length) {
                    props.allowances.map((val) => {
                        if (val && val.allowance && val.allowance.spend_limit && val.allowance.spend_limit.length) {
                            const amount = val.allowance.spend_limit.find((val1) => (val1.denom === config.COIN_MINIMAL_DENOM) &&
                                val1.amount && (val1.amount > 0.1 * (10 ** config.COIN_DECIMALS)));
                            if (amount && amount.amount) {
                                granterInfo.granter = val.granter;
                                granterInfo.amount = amount.amount / 10 ** config.COIN_DECIMALS;
                            }
                        } else if (val && val.allowance && val.allowance.allowed_messages &&
                            type && val.allowance.allowed_messages.indexOf(type) > -1) {
                            if (val && val.allowance && val.allowance.allowance &&
                                val.allowance.allowance.spend_limit && val.allowance.allowance.spend_limit.length) {
                                const amount = val.allowance.allowance.spend_limit.find((val1) => (val1.denom === config.COIN_MINIMAL_DENOM) &&
                                    val1.amount && (val1.amount > 0.1 * (10 ** config.COIN_DECIMALS)));
                                if (amount && amount.amount) {
                                    granterInfo.granter = val.granter;
                                    granterInfo.amount = amount.amount / 10 ** config.COIN_DECIMALS;
                                }
                            }
                        }

                        return null;
                    });
                }

                if ((granterInfo && granterInfo.granter && !balance) ||
                    (granterInfo && granterInfo.granter && balance && (balance < 0.1))) {
                    Tx.fee.granter = granterInfo.granter;
                }

                props.sign(chainConfig, Tx, ibcAddress, (result, txBytes) => {
                    if (result) {
                        const data = {
                            tx_bytes: txBytes,
                            mode: 'BROADCAST_MODE_SYNC',
                        };
                        props.txSignAndBroadCast(chainConfig, data, (res1) => {
                            if (res1 && res1.txhash) {
                                let counter = 0;
                                const time = setInterval(() => {
                                    props.fetchTxHash(chainConfig, res1.txhash, (hashResult) => {
                                        if (hashResult) {
                                            if (hashResult && hashResult.code !== undefined && hashResult.code !== 0) {
                                                props.showMessage(hashResult.raw_log || hashResult.logs, 'error', hashResult && hashResult.txhash);
                                                props.setTransferFail();
                                                props.setTxHashInProgressFalse();
                                                clearInterval(time);

                                                return;
                                            }

                                            props.setTransferSuccess(res1.txhash);
                                            props.fetchBalance(props.address);
                                            props.fetchCollectionNFTS(props.rpcClient, props.chainValue, props.router.params.id);
                                            props.setTxHashInProgressFalse();
                                            clearInterval(time);
                                        }

                                        counter++;
                                        if (counter === 3) {
                                            if (hashResult && hashResult.code !== undefined && hashResult.code !== 0) {
                                                props.showMessage(hashResult.raw_log || hashResult.logs, 'error', hashResult && hashResult.txhash);
                                                props.setTransferFail();
                                                props.setTxHashInProgressFalse();
                                                clearInterval(time);

                                                return;
                                            }

                                            props.handleClose();
                                            props.showMessage(variables[props.lang]['check_later']);
                                            props.setTxHashInProgressFalse();
                                            clearInterval(time);
                                        }
                                    });
                                }, 5000);
                            } else {
                                props.setTransferFail();
                            }
                        });
                    } else {
                        props.setTransferFail();
                    }
                });
            }
        });
    };

    const inProgress = props.broadCastInProgress || props.txHashInProgress;
    const prefix = props.chainID && ChainsList[props.chainID] && ChainsList[props.chainID].PREFIX;
    const valid = props.toAddress && decodeFromBech32(props.toAddress) && (props.toAddress.indexOf(prefix) > -1);
    const disable = props.toAddress === '' || props.signInProgress || inProgress || !valid;

    return (
        <Button
            className="primary_button"
            disabled={disable}
            onClick={handleClick}>
            {props.signInProgress
                ? variables[props.lang]['approval_pending'] + '....'
                : inProgress
                    ? variables[props.lang].processing + '....'
                    : variables[props.lang]['ibc_transfer']}
        </Button>
    );
};

IBCButton.propTypes = {
    address: PropTypes.string.isRequired,
    allowances: PropTypes.array.isRequired,
    balance: PropTypes.array.isRequired,
    broadCastInProgress: PropTypes.bool.isRequired,
    chain: PropTypes.string.isRequired,
    chainID: PropTypes.string.isRequired,
    chainValue: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchCollectionNFTS: PropTypes.func.isRequired,
    fetchTimeoutHeight: PropTypes.func.isRequired,
    fetchTxHash: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    initializeChainIBC: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        params: PropTypes.shape({
            id: PropTypes.string,
        }).isRequired,
    }).isRequired,
    rpcClient: PropTypes.any.isRequired,
    setTransferFail: PropTypes.func.isRequired,
    setTransferSuccess: PropTypes.func.isRequired,
    setTxHashInProgressFalse: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    sign: PropTypes.func.isRequired,
    signInProgress: PropTypes.bool.isRequired,
    toAddress: PropTypes.string.isRequired,
    txHashInProgress: PropTypes.bool.isRequired,
    txSignAndBroadCast: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        allowances: state.account.bc.allowances.value,
        balance: state.account.bc.balance.value,
        broadCastInProgress: state.account.wallet.broadCast.inProgress,
        chainID: state.collection.chainID,
        chainValue: state.dashboard.chainValue.value,
        collection: state.collection.collection.value,
        lang: state.language,
        signInProgress: state.account.bc.protoBufSign.inProgress,
        txHashInProgress: state.account.bc.txHash.inProgress,
        value: state.collection.transferDialog.value,
        chain: state.collection.transferDialog.chain,
        toAddress: state.collection.address,
        rpcClient: state.query.rpcClient.value,
    };
};

const actionToProps = {
    fetchBalance,
    fetchCollectionNFTS,
    fetchTimeoutHeight,
    fetchTxHash: fetchTxHashIBC,
    handleClose: hideTransferDialog,
    setTransferFail,
    setTransferSuccess,
    setTxHashInProgressFalse,
    showMessage,
    sign: protoBufSigningIBC,
    txSignAndBroadCast: txSignAndBroadCastIBC,
    initializeChainIBC,
};

export default withRouter(connect(stateToProps, actionToProps)(IBCButton));
