import React from 'react';
import * as PropTypes from 'prop-types';
import { showMessage } from '../../actions/snackbar';
import { connect } from 'react-redux';
import './index.css';
import { Button } from '@mui/material';
import {
    config,
    DEFAULT_LIMIT,
    DEFAULT_SEARCH,
    DEFAULT_SKIP,
    TRANSACTION_SET_TIME_OUT,
} from '../../config';
import {
    aminoSignTx,
    fetchTxHash, protoBufSigning,
    setTxHashInProgressFalse,
    txSignAndBroadCast,
    txSignAndBroadCastAminoSign,
} from '../../actions/account/wallet';
import { addCollection, fetchCollections, hideCollectionConfirmDialog, setSchema } from '../../actions/collections';
import { fetchBalance } from '../../actions/account/BCDetails';
import withRouter from '../../components/WithRouter';
import { customTypes } from '../../registry';
import variables from '../../utils/variables';

const MintCollectionButton = (props) => {
    const handleLedgerTransaction = (data, msg, granterInfo, balance) => {
        if (data && data.fee && data.fee.granter && window.keplr) {
            window.keplr.defaultOptions = {
                sign: {
                    disableBalanceCheck: true,
                },
            };
        } else if (window.keplr) {
            window.keplr.defaultOptions = {};
        }

        const Tx = {
            msgs: msg,
            fee: {
                amount: [{
                    amount: String(5000),
                    denom: config.COIN_MINIMAL_DENOM,
                }],
                gas: String(200000),
            },
            memo: '',
        };

        props.aminoSignTx(Tx, props.address, (result) => {
            if (result) {
                const data = {
                    tx: result.signed,
                    mode: 'sync',
                };
                if ((granterInfo && granterInfo.granter && !balance) ||
                    (granterInfo && granterInfo.granter && balance && (balance < 0.1))) {
                    data.fee_granter = granterInfo.granter;
                }
                data.tx.msg = result.signed.msgs;
                data.tx.signatures = [result.signature];
                if (data.tx.msgs) {
                    delete data.tx.msgs;
                }
                props.txSignAndBroadCastAminoSign(data, (res1) => {
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

                                    props.fetch(props.address, DEFAULT_SKIP, DEFAULT_LIMIT, DEFAULT_SEARCH, (result, total) => {
                                        if (total === props.collectionTotal) {
                                            setTimeout(() => {
                                                props.fetch(props.address, DEFAULT_SKIP, DEFAULT_LIMIT, DEFAULT_SEARCH);
                                            }, TRANSACTION_SET_TIME_OUT);
                                        }
                                    });
                                    props.setSchema(null);
                                    props.showCreateCollectionDialog('');
                                    props.setCreateCollectionActiveStep(2);
                                    props.fetchBalance(props.address);
                                    props.setTxHashInProgressFalse();
                                    props.hideCollectionConfirmDialog();
                                    props.history.push('/library');
                                    props.setLibraryTabValue('collections');
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
    };

    const handleClick = () => {
        const data = {
            base_req: {
                from: props.address,
                chain_id: config.CHAIN_ID,
            },
            sender: props.address,
            symbol: props.symbol,
            name: props.value,
        };
        if (props.description) {
            data.description = props.description;
        }
        if (props.imageUrl) {
            data.preview_uri = props.imageUrl;
        }
        if (props.jsonSchema) {
            const schema = JSON.parse(props.jsonSchema);
            data.schema = JSON.stringify(schema);
        }

        props.addCollection(data, (res) => {
            if (res) {
                let balance = props.balance && props.balance.length && props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
                balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

                const Tx = {
                    msgs: res.value && res.value.msg,
                    msgType: 'CreateDenom',
                    fee: {
                        amount: [{
                            amount: String(5000),
                            denom: config.COIN_MINIMAL_DENOM,
                        }],
                        gasLimit: String(200000),
                    },
                    memo: '',
                };

                const type = customTypes && customTypes.CreateDenom && customTypes.CreateDenom.typeUrl;
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

                if (props.keys && props.keys.isNanoLedger) {
                    handleLedgerTransaction(Tx, res.value && res.value.msg, granterInfo, balance);

                    return;
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

                                            props.fetch(props.address, DEFAULT_SKIP, DEFAULT_LIMIT, DEFAULT_SEARCH, (result, total) => {
                                                if (total === props.collectionTotal) {
                                                    setTimeout(() => {
                                                        props.fetch(props.address, DEFAULT_SKIP, DEFAULT_LIMIT, DEFAULT_SEARCH);
                                                    }, TRANSACTION_SET_TIME_OUT);
                                                }
                                            });
                                            props.setSchema(null);
                                            props.showCreateCollectionDialog('');
                                            props.setCreateCollectionActiveStep(2);
                                            props.fetchBalance(props.address);
                                            props.setTxHashInProgressFalse();
                                            props.hideCollectionConfirmDialog();
                                            props.history.push('/library');
                                            props.setLibraryTabValue('collections');
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
        });
    };

    const inProgress = props.inProgress || props.signInProgress ||
        props.aminoBroadCastInProgress || props.broadCastInProgress || props.txHashInProgress;
    const disable = props.symbol === '' || props.value === '' || inProgress;
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

MintCollectionButton.propTypes = {
    addCollection: PropTypes.func.isRequired,
    address: PropTypes.string.isRequired,
    allowances: PropTypes.array.isRequired,
    aminoBroadCastInProgress: PropTypes.bool.isRequired,
    aminoSignTx: PropTypes.func.isRequired,
    balance: PropTypes.array.isRequired,
    broadCastInProgress: PropTypes.bool.isRequired,
    fetch: PropTypes.func.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchTxHash: PropTypes.func.isRequired,
    hideCollectionConfirmDialog: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    inProgress: PropTypes.bool.isRequired,
    keys: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    setCreateCollectionActiveStep: PropTypes.func.isRequired,
    setLibraryTabValue: PropTypes.func.isRequired,
    setSchema: PropTypes.func.isRequired,
    setTxHashInProgressFalse: PropTypes.func.isRequired,
    showCreateCollectionDialog: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    sign: PropTypes.func.isRequired,
    signInProgress: PropTypes.bool.isRequired,
    symbol: PropTypes.string.isRequired,
    txHashInProgress: PropTypes.bool.isRequired,
    txSignAndBroadCast: PropTypes.func.isRequired,
    txSignAndBroadCastAminoSign: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    collectionTotal: PropTypes.number,
    description: PropTypes.string,
    imageUrl: PropTypes.any,
    jsonSchema: PropTypes.string,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        allowances: state.account.bc.allowances.value,
        aminoBroadCastInProgress: state.account.connection.inProgress,
        balance: state.account.bc.balance.value,
        broadCastInProgress: state.account.bc.broadCast.inProgress,
        // collectionTotal: state.collections.collection.total,
        inProgress: state.collections.newCollection.inProgress,
        keys: state.account.connection.keys,
        lang: state.language,
        signInProgress: state.account.bc.protoBufSign.inProgress,
        symbol: state.collections.createCollection.symbol,
        txHashInProgress: state.account.bc.txHash.inProgress,
        value: state.collections.createCollection.value,
        description: state.collections.createCollection.description,
        imageUrl: state.collections.createCollection.imageUrl,
        jsonSchema: state.collections.createCollection.jsonSchema,
    };
};

const actionToProps = {
    addCollection,
    aminoSignTx,
    txSignAndBroadCast,
    txSignAndBroadCastAminoSign,
    fetch: fetchCollections,
    fetchBalance,
    fetchTxHash,
    showMessage,
    // setLibraryTabValue,
    setTxHashInProgressFalse,
    sign: protoBufSigning,
    // setCreateCollectionActiveStep,
    // showCreateCollectionDialog,
    hideCollectionConfirmDialog,
    setSchema,
};

export default withRouter(connect(stateToProps, actionToProps)(MintCollectionButton));
