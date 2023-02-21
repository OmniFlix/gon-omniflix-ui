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
import { config, DEFAULT_LIMIT, DEFAULT_SKIP } from '../../../config';
import { customTypes } from '../../../registry';
import {
    fetchTxHash,
    protoBufSigning,
    setTxHashInProgressFalse,
    txSignAndBroadCast,
} from '../../../actions/account/wallet';
import { showMessage } from '../../../actions/snackbar';
import { fetchBalance } from '../../../actions/account/BCDetails';
import withRouter from '../../../components/WithRouter';
import Long from 'long';
import { fetchTimeoutHeight } from '../../../actions/account/IBCTokens';
import { ChainsList, sourceChannel } from '../../../chains';
import { decodeFromBech32 } from '../../../utils/address';

const IBCButton = (props) => {
    const handleClick = () => {
        props.fetchTimeoutHeight(config.REST_URL, sourceChannel[props.chainID], (result) => {
            const revisionNumber = result && result.proof_height && result.proof_height.revision_number &&
                Long.fromNumber(result.proof_height.revision_number);
            const revisionHeight = result && result.proof_height && result.proof_height.revision_height;

            const object = [{
                type: '/ibc.applications.nft_transfer.v1.MsgTransfer',
                value: {
                    source_port: 'nft-transfer',
                    source_channel: sourceChannel[props.chainID],
                    class_id: props.router.params.id,
                    token_ids: [
                        props.value && props.value.id,
                    ],
                    receiver: props.toAddress,
                    sender: props.address,
                    timeout_height: {
                        revisionNumber: revisionNumber || undefined,
                        revisionHeight: Long.fromNumber(parseInt(revisionHeight) + 150) || undefined,
                    },
                    timeout_timestamp: undefined,
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

            props.sign(Tx, props.address, (result, txBytes) => {
                if (result) {
                    const data = {
                        tx_bytes: txBytes,
                        mode: 'BROADCAST_MODE_SYNC',
                    };
                    props.txSignAndBroadCast(data, (res1) => {
                        if (res1 && res1.txhash) {
                            let counter = 0;
                            const time = setInterval(() => {
                                props.fetchTxHash(res1.txhash, (hashResult) => {
                                    if (hashResult) {
                                        if (hashResult && hashResult.code !== undefined && hashResult.code !== 0) {
                                            props.showMessage(hashResult.logs || hashResult.raw_log, 'error', hashResult && hashResult.hash);
                                            props.setTransferFail();
                                            props.setTxHashInProgressFalse();
                                            clearInterval(time);

                                            return;
                                        }

                                        props.setTransferSuccess(res1.txhash);
                                        props.fetchBalance(props.address);
                                        props.fetchCollectionNFTS(props.router.params.id, DEFAULT_SKIP, DEFAULT_LIMIT);
                                        props.setTxHashInProgressFalse();
                                        clearInterval(time);
                                    }

                                    counter++;
                                    if (counter === 3) {
                                        if (hashResult && hashResult.code !== undefined && hashResult.code !== 0) {
                                            props.showMessage(hashResult.logs || hashResult.raw_log, 'error', hashResult && hashResult.hash);
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
    chainID: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchCollectionNFTS: PropTypes.func.isRequired,
    fetchTimeoutHeight: PropTypes.func.isRequired,
    fetchTxHash: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        params: PropTypes.shape({
            id: PropTypes.string,
        }).isRequired,
    }).isRequired,
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
        collection: state.collection.collection.value,
        lang: state.language,
        signInProgress: state.account.bc.protoBufSign.inProgress,
        txHashInProgress: state.account.bc.txHash.inProgress,
        value: state.collection.transferDialog.value,
        toAddress: state.collection.address,
    };
};

const actionToProps = {
    fetchBalance,
    fetchCollectionNFTS,
    fetchTimeoutHeight,
    fetchTxHash,
    handleClose: hideTransferDialog,
    setTransferFail,
    setTransferSuccess,
    setTxHashInProgressFalse,
    showMessage,
    sign: protoBufSigning,
    txSignAndBroadCast,
};

export default withRouter(connect(stateToProps, actionToProps)(IBCButton));
