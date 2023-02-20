import React from 'react';
import * as PropTypes from 'prop-types';
import variables from '../../utils/variables';
import { showMessage } from '../../actions/snackbar';
import { connect } from 'react-redux';
import './index.css';
import { Button } from '@mui/material';
import { config, DEFAULT_SKIP } from '../../config';
import { customTypes } from '../../registry';
import {
    aminoSignTx,
    fetchTxHash,
    protoBufSigning,
    setTxHashInProgressFalse,
    txSignAndBroadCast,
} from '../../actions/account/wallet';
import {
    fetchAllCollections,
    fetchCollections,
    hideCollectionConfirmDialog,
    setSchema,
} from '../../actions/collections';
import { fetchBalance } from '../../actions/account/BCDetails';
import withRouter from '../../components/WithRouter';
import { setTabValue } from '../../actions/dashboard';

const UpdateCollectionButton = (props) => {
    const handleClick = () => {
        const data = {
            id: props.router.params.collectionID,
            sender: props.address,
        };
        if (props.collection && props.value !== props.collection.name) {
            data.name = props.value;
        }
        if (props.collection && props.description !== props.collection.description) {
            data.description = props.description;
        }
        if (props.collection && props.imageUrl !== props.collection.preview_uri) {
            data.preview_uri = props.imageUrl;
        }

        if (props.router && props.router.params && props.router.params.collectionID) {
            let balance = props.balance && props.balance.length && props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
            balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

            const msg = [{
                type: 'OmniFlix/marketplace/MsgUpdateDenom',
                value: data,
            }];

            const Tx = {
                msgs: msg,
                msgType: 'UpdateDenom',
                fee: {
                    amount: [{
                        amount: String(5000),
                        denom: config.COIN_MINIMAL_DENOM,
                    }],
                    gasLimit: String(300000),
                },
                memo: '',
            };

            const type = customTypes && customTypes.UpdateDenom && customTypes.UpdateDenom.typeUrl;
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
                                            props.setTxHashInProgressFalse();
                                            clearInterval(time);

                                            return;
                                        }

                                        props.fetch(props.chainValue, props.address, DEFAULT_SKIP, 500);
                                        props.fetchAllCollections(props.chainValue, DEFAULT_SKIP, 500);
                                        props.setSchema(null);
                                        props.fetchBalance(props.address);
                                        props.setTxHashInProgressFalse();
                                        props.hideCollectionConfirmDialog();
                                        props.router.navigate('/dashboard');
                                        props.setTabValue(props.tabValue);
                                        clearInterval(time);
                                    }

                                    counter++;
                                    if (counter === 3) {
                                        if (hashResult && hashResult.code !== undefined && hashResult.code !== 0) {
                                            props.showMessage(hashResult.logs || hashResult.raw_log, 'error', hashResult && hashResult.hash);
                                            props.setTxHashInProgressFalse();
                                            clearInterval(time);

                                            return;
                                        }

                                        props.setTxHashInProgressFalse();
                                        clearInterval(time);
                                    }
                                });
                            }, 5000);
                        }
                    });
                }
            });
        }
    };

    const inProgress = props.signInProgress || props.broadCastInProgress || props.txHashInProgress;
    const disable = props.value === '' || inProgress;
    return (
        <Button
            className="primary_button"
            disabled={disable}
            variant="contained"
            onClick={handleClick}>
            {inProgress
                ? variables[props.lang]['approval_pending'] + '....'
                : variables[props.lang].confirm}
        </Button>
    );
};

UpdateCollectionButton.propTypes = {
    address: PropTypes.string.isRequired,
    allowances: PropTypes.array.isRequired,
    aminoSignTx: PropTypes.func.isRequired,
    balance: PropTypes.array.isRequired,
    broadCastInProgress: PropTypes.bool.isRequired,
    chainValue: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    fetch: PropTypes.func.isRequired,
    fetchAllCollections: PropTypes.func.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchTxHash: PropTypes.func.isRequired,
    hideCollectionConfirmDialog: PropTypes.func.isRequired,
    keys: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        params: PropTypes.shape({
            collectionID: PropTypes.string,
        }).isRequired,
    }).isRequired,
    setSchema: PropTypes.func.isRequired,
    setTabValue: PropTypes.func.isRequired,
    setTxHashInProgressFalse: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    sign: PropTypes.func.isRequired,
    signInProgress: PropTypes.bool.isRequired,
    tabValue: PropTypes.string.isRequired,
    txHashInProgress: PropTypes.bool.isRequired,
    txSignAndBroadCast: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageUrl: PropTypes.any,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        allowances: state.account.bc.allowances.value,
        balance: state.account.bc.balance.value,
        broadCastInProgress: state.account.wallet.broadCast.inProgress,
        chainValue: state.dashboard.chainValue.value,
        keys: state.account.wallet.connection.keys,
        lang: state.language,
        signInProgress: state.account.bc.protoBufSign.inProgress,
        txHashInProgress: state.account.bc.txHash.inProgress,
        value: state.collections.createCollection.value,
        description: state.collections.createCollection.description,
        imageUrl: state.collections.createCollection.imageUrl,
        collection: state.collections.singleCollection.value,
        tabValue: state.dashboard.tabValue.value,
    };
};

const actionToProps = {
    aminoSignTx,
    txSignAndBroadCast,
    fetch: fetchCollections,
    fetchAllCollections,
    fetchBalance,
    fetchTxHash,
    showMessage,
    setSchema,
    setTabValue,
    setTxHashInProgressFalse,
    sign: protoBufSigning,
    hideCollectionConfirmDialog,
};

export default withRouter(connect(stateToProps, actionToProps)(UpdateCollectionButton));
