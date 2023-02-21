import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dialog, DialogContent } from '@mui/material';
import { fetchCollectionNFTS, hideBurnDialog } from '../../../actions/collection';
import React, { useState } from 'react';
import successIcon from '../../../assets/success.svg';
import variables from '../../../utils/variables';
import CopyButton from '../../../components/CopyButton';
import failedIcon from '../../../assets/failed.svg';
import closeIcon from '../../../assets/close.svg';
import NFTIDTextField from './NFTIDTextField';
import './index.css';
import { showMessage } from '../../../actions/snackbar';
import {
    aminoSignTx,
    fetchTxHash, protoBufSigning,
    setTxHashInProgressFalse,
    txSignAndBroadCast,
    txSignAndBroadCastAminoSign,
} from '../../../actions/account/wallet';
import { config, DEFAULT_LIMIT, DEFAULT_SKIP } from '../../../config';
import { customTypes } from '../../../registry';
import ImageOnLoad from '../../../components/ImageOnLoad';
import { fetchBalance } from '../../../actions/account/BCDetails';

const BurnDialog = (props) => {
    const [burn, setBurn] = useState('');
    const denomID = props.collection && props.collection.denom && (props.collection.denom.id || props.collection.denom);

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
                gas: String(300000),
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
                                        setBurn('fail');
                                        props.showMessage(hashResult.logs || hashResult.raw_log, 'error', hashResult && hashResult.hash);
                                        props.setTxHashInProgressFalse();
                                        clearInterval(time);

                                        return;
                                    }

                                    props.handleClose();
                                    props.fetchBalance(props.address);
                                    props.fetchCollectionNFTS(denomID, DEFAULT_SKIP, DEFAULT_LIMIT);
                                    setBurn('success');

                                    props.setTxHashInProgressFalse();
                                    clearInterval(time);
                                }

                                counter++;
                                if (counter === 3) {
                                    if (hashResult && hashResult.code !== undefined && hashResult.code !== 0) {
                                        setBurn('fail');
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

    const handleBurn = () => {
        const denomID = props.collection && props.collection.denom && (props.collection.denom.id || props.collection.denom);

        if (denomID && props.collection.denom.id) {
            let balance = props.balance && props.balance.length && props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
            balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);
            const messages = [{
                type: 'OmniFlix/onft/MsgBurnONFT',
                value: {
                    id: props.collection.denom.id,
                    denom_id: denomID,
                    sender: props.collection.owner,
                },
            }];

            const Tx = {
                msgs: messages,
                msgType: 'BurnONFT',
                fee: {
                    amount: [{
                        amount: String(5000),
                        denom: config.COIN_MINIMAL_DENOM,
                    }],
                    gasLimit: String(300000),
                },
                memo: '',
            };

            const type = customTypes && customTypes.BurnONFT && customTypes.BurnONFT.typeUrl;
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
                handleLedgerTransaction(Tx, messages, granterInfo, balance);

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

                                        props.handleClose();
                                        props.fetchBalance(props.address);
                                        props.fetchCollectionNFTS(denomID, DEFAULT_SKIP, DEFAULT_LIMIT);
                                        setBurn('success');
                                        props.setTxHashInProgressFalse();
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
        } else {
            props.handleClose();
            props.showMessage('Something went wrong!', 'error');
        }
    };

    return (
        <Dialog
            aria-describedby="verify-twitter-dialog-description"
            aria-labelledby="verify-twitter-dialog-title"
            className="dialog burn_dialog"
            open={props.open}
            onClose={props.handleClose}>
            {burn === 'success'
                ? <DialogContent className="transfer_dialog_content success_transfer">
                    <img alt="success" src={successIcon} />
                    <h2>{variables[props.lang]['nft_deleted']}</h2>
                    <div className="tx_hash">
                        <p>{variables[props.lang].tx_hash}</p>
                        <div>
                            <div className="hash_text">
                                <p>{props.burnNFT && props.burnNFT.id}</p>
                                <span>{props.burnNFT && props.burnNFT && props.burnNFT.id.slice(props.burnNFT.id.length - 6, props.burnNFT.id.length)}</span>
                            </div>
                            <CopyButton data={props.burnNFT && props.burnNFT.id} />
                        </div>
                    </div>
                    <div className="card">
                        <ImageOnLoad
                            preview={props.burnNFT && props.burnNFT.metadata && props.burnNFT.metadata.preview_uri}
                            src={props.burnNFT && props.burnNFT.metadata && props.burnNFT.metadata.preview_uri}
                            text={variables[props.lang]['asset_preview_not_ready']}/>
                        <div>
                            <p className="collection">
                                {props.collection && props.collection.denom && (props.collection.name || props.collection.symbol)}
                            </p>
                            <p className="nft">
                                {props.burnNFT && props.burnNFT.metadata && props.burnNFT.metadata.name}
                            </p>
                        </div>
                    </div>
                    <div className="actions">
                        <Button className="primary_button" onClick={props.handleClose}>
                            {variables[props.lang].okay}
                        </Button>
                    </div>
                </DialogContent>
                : burn === 'failed'
                    ? <DialogContent className="transfer_dialog_content failed_transfer">
                        <img alt="success" src={failedIcon} />
                        <h2>{variables[props.lang]['burn_failed']}</h2>
                        <div className="card">
                            <ImageOnLoad
                                preview={props.burnNFT && props.burnNFT.metadata && props.burnNFT.metadata.preview_uri}
                                src={props.burnNFT && props.burnNFT.metadata && props.burnNFT.metadata.preview_uri}
                                text={variables[props.lang]['asset_preview_not_ready']}/>
                            <div>
                                <p className="collection">
                                    {props.collection && props.collection.denom && (props.collection.name || props.collection.symbol)}
                                </p>
                                <p className="nft">
                                    {props.burnNFT && props.burnNFT.metadata && props.burnNFT.metadata.name}
                                </p>
                            </div>
                        </div>
                        <div className="actions">
                            <Button className="primary_button" onClick={props.handleClose}>
                                {variables[props.lang].okay}
                            </Button>
                        </div>
                    </DialogContent>
                    : <DialogContent className="transfer_dialog_content">
                        <h2>{variables[props.lang]['agree_to_delete']}</h2>
                        <img alt="close" className="close_button" src={closeIcon} onClick={props.handleClose} />
                        <div className="card">
                            <ImageOnLoad
                                preview={props.burnNFT && props.burnNFT.metadata && props.burnNFT.metadata.preview_uri}
                                src={props.burnNFT && props.burnNFT.metadata && props.burnNFT.metadata.preview_uri}
                                text={variables[props.lang]['asset_preview_not_ready']}/>
                            <div>
                                <p className="collection">
                                    {props.collection && props.collection.denom && (props.collection.name || props.collection.symbol)}
                                </p>
                                <p className="nft">
                                    {props.burnNFT && props.burnNFT.metadata && props.burnNFT.metadata.name}
                                </p>
                            </div>
                        </div>
                        <div className="tx_hash">
                            <div>
                                <div className="hash_text">
                                    <p>{props.burnNFT && props.burnNFT.id}</p>
                                    {/* <span>{props.burnNFT && props.burnNFT.id.slice(props.burnNFT.id.length - 6, props.burnNFT.id.length)}</span> */}
                                </div>
                                <CopyButton data={props.burnNFT && props.burnNFT.id} />
                            </div>
                        </div>
                        <div className="fields">
                            <p>{variables[props.lang]['enter_last_digit']}</p>
                            <NFTIDTextField />
                        </div>
                        <div className="actions">
                            <Button className="primary_button" onClick={() => handleBurn()}>
                                {variables[props.lang]['burn_nft']}
                            </Button>
                        </div>
                    </DialogContent>}
        </Dialog>
    );
};

BurnDialog.propTypes = {
    address: PropTypes.string.isRequired,
    allowances: PropTypes.array.isRequired,
    aminoSignTx: PropTypes.func.isRequired,
    balance: PropTypes.array.isRequired,
    burnNFT: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchCollectionNFTS: PropTypes.func.isRequired,
    fetchTxHash: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    keys: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    setTxHashInProgressFalse: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    sign: PropTypes.func.isRequired,
    txSignAndBroadCast: PropTypes.func.isRequired,
    txSignAndBroadCastAminoSign: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        lang: state.language,
        open: state.collection.burnDialog.open,
        burnNFT: state.collection.burnDialog.value,
        collection: state.collection.collection.value,

        allowances: state.account.bc.allowances.value,
        balance: state.account.bc.balance.value,
        keys: state.account.wallet.connection.keys,
    };
};

const actionToProps = {
    handleClose: hideBurnDialog,
    showMessage,
    setTxHashInProgressFalse,
    txSignAndBroadCast,
    fetchTxHash,
    txSignAndBroadCastAminoSign,
    aminoSignTx,
    sign: protoBufSigning,
    fetchBalance,
    fetchCollectionNFTS,
};

export default connect(stateToProps, actionToProps)(BurnDialog);
