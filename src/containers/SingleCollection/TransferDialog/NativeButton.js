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
import { decodeFromBech32 } from '../../../utils/address';

const NativeButton = (props) => {
    const handleClick = () => {
        const object = [{
            type: 'OmniFlix/onft/MsgTransferONFT',
            value: {
                denom_id: props.router.params.id,
                id: props.value && props.value.id,
                recipient: props.toAddress,
                sender: props.address,
            },
        }];

        let balance = props.balance && props.balance.length && props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
        balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

        const Tx = {
            msgs: object,
            msgType: 'TransferONFT',
            fee: {
                amount: [{
                    amount: String(5000),
                    denom: config.COIN_MINIMAL_DENOM,
                }],
                gasLimit: String(300000),
            },
            memo: '',
        };

        const type = customTypes && customTypes.TransferONFT && customTypes.TransferONFT.typeUrl;
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
                                        props.showMessage(hashResult.raw_log || hashResult.logs, 'error', hashResult && hashResult.txhash);
                                        props.setTransferFail();
                                        props.setTxHashInProgressFalse();
                                        clearInterval(time);

                                        return;
                                    }

                                    props.setTransferSuccess(res1.txhash);
                                    props.fetchBalance(props.address);
                                    props.fetchCollectionNFTS(props.chainValue, props.router.params.id, DEFAULT_SKIP, DEFAULT_LIMIT);
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
    };

    const inProgress = props.broadCastInProgress || props.txHashInProgress;
    const valid = props.toAddress && decodeFromBech32(props.toAddress) && (props.toAddress.indexOf(config.PREFIX) > -1);
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
                    : variables[props.lang]['native_transfer']}
        </Button>
    );
};

NativeButton.propTypes = {
    address: PropTypes.string.isRequired,
    allowances: PropTypes.array.isRequired,
    balance: PropTypes.array.isRequired,
    broadCastInProgress: PropTypes.bool.isRequired,
    chainValue: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchCollectionNFTS: PropTypes.func.isRequired,
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
        chainValue: state.dashboard.chainValue.value,
        lang: state.language,
        signInProgress: state.account.bc.protoBufSign.inProgress,
        txHashInProgress: state.account.bc.txHash.inProgress,
        value: state.collection.transferDialog.value,
        collection: state.collection.collection.value,
        toAddress: state.collection.address,
    };
};

const actionToProps = {
    fetchBalance,
    fetchCollectionNFTS,
    fetchTxHash,
    handleClose: hideTransferDialog,
    setTransferFail,
    setTransferSuccess,
    setTxHashInProgressFalse,
    showMessage,
    sign: protoBufSigning,
    txSignAndBroadCast,
};

export default withRouter(connect(stateToProps, actionToProps)(NativeButton));
