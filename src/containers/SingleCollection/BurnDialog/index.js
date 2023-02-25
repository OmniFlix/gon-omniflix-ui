import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dialog, DialogContent } from '@mui/material';
import { fetchCollectionNFTS, hideBurnDialog, setBurnFail, setBurnSuccess } from '../../../actions/collection';
import React from 'react';
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
    fetchTxHash,
    protoBufSigning,
    setTxHashInProgressFalse,
    txSignAndBroadCast,
    txSignAndBroadCastAminoSign,
} from '../../../actions/account/wallet';
import { config } from '../../../config';
import { customTypes } from '../../../registry';
import ImageOnLoad from '../../../components/ImageOnLoad';
import { fetchBalance } from '../../../actions/account/BCDetails';

const BurnDialog = (props) => {
    const handleBurn = () => {
        const denomID = props.collection && props.collection.denom && (props.collection.denom.id || props.collection.denom);

        if (denomID && props.collection.denom.id) {
            let balance = props.balance && props.balance.length && props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
            balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);
            const messages = [{
                type: 'OmniFlix/onft/MsgBurnONFT',
                value: {
                    id: props.burnNFT.id,
                    denom_id: denomID,
                    sender: props.address,
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
                                            props.setTxHashInProgressFalse();
                                            props.setBurnFail();
                                            clearInterval(time);

                                            return;
                                        }

                                        props.handleClose();
                                        props.fetchBalance(props.address);
                                        props.fetchCollectionNFTS(props.rpcClient, props.chainValue, denomID);
                                        props.setBurnSuccess(res1.txhash);
                                        props.setTxHashInProgressFalse();
                                        clearInterval(time);
                                    }

                                    counter++;
                                    if (counter === 3) {
                                        if (hashResult && hashResult.code !== undefined && hashResult.code !== 0) {
                                            props.showMessage(hashResult.raw_log || hashResult.logs, 'error', hashResult && hashResult.txhash);
                                            props.setTxHashInProgressFalse();
                                            props.setBurnFail();
                                            clearInterval(time);

                                            return;
                                        }

                                        props.setTxHashInProgressFalse();
                                        clearInterval(time);
                                    }
                                });
                            }, 5000);
                        } else {
                            props.setBurnFail();
                        }
                    });
                } else {
                    props.setBurnFail();
                }
            });
        } else {
            props.handleClose();
            props.showMessage('Something went wrong!', 'error');
        }
    };

    const id = props.burnNFT && props.burnNFT.id && props.burnNFT.id.substring(props.burnNFT.id.length - 4);
    const inProgress = props.signInProgress || props.broadCastInProgress || props.txHashInProgress;
    const disable = (props.nftID !== id) || inProgress;

    return (
        <Dialog
            aria-describedby="verify-twitter-dialog-description"
            aria-labelledby="verify-twitter-dialog-title"
            className="dialog burn_dialog"
            open={props.open}
            onClose={props.handleClose}>
            {props.success
                ? <DialogContent className="transfer_dialog_content success_transfer">
                    <img alt="success" src={successIcon}/>
                    <h2>{variables[props.lang]['nft_deleted']}</h2>
                    <div className="tx_hash">
                        <p>{variables[props.lang].tx_hash}</p>
                        <div>
                            <div className="hash_text">
                                <p>{props.hash}</p>
                                <span>{props.hash && props.hash.slice(props.hash.length - 6, props.hash.length)}</span>
                            </div>
                            <CopyButton data={props.hash}/>
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
                : props.fail
                    ? <DialogContent className="transfer_dialog_content failed_transfer">
                        <img alt="success" src={failedIcon}/>
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
                        <img alt="close" className="close_button" src={closeIcon} onClick={props.handleClose}/>
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
                                <CopyButton data={props.burnNFT && props.burnNFT.id}/>
                            </div>
                        </div>
                        <div className="fields">
                            <p>{variables[props.lang]['enter_last_digit']}</p>
                            <NFTIDTextField/>
                        </div>
                        <div className="actions">
                            <Button className="primary_button" disabled={disable} onClick={() => handleBurn()}>
                                {props.signInProgress
                                    ? variables[props.lang]['approval_pending'] + '....'
                                    : inProgress
                                        ? variables[props.lang].processing + '....'
                                        : variables[props.lang]['burn_nft']}
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
    broadCastInProgress: PropTypes.bool.isRequired,
    burnNFT: PropTypes.object.isRequired,
    chainValue: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    fail: PropTypes.bool.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchCollectionNFTS: PropTypes.func.isRequired,
    fetchTxHash: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    hash: PropTypes.string.isRequired,
    keys: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    nftID: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    rpcClient: PropTypes.any.isRequired,
    setBurnFail: PropTypes.func.isRequired,
    setBurnSuccess: PropTypes.func.isRequired,
    setTxHashInProgressFalse: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    sign: PropTypes.func.isRequired,
    signInProgress: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    txHashInProgress: PropTypes.bool.isRequired,
    txSignAndBroadCast: PropTypes.func.isRequired,
    txSignAndBroadCastAminoSign: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        chainValue: state.dashboard.chainValue.value,
        lang: state.language,
        open: state.collection.burnDialog.open,
        burnNFT: state.collection.burnDialog.value,
        fail: state.collection.burnDialog.fail,
        hash: state.collection.burnDialog.hash,
        success: state.collection.burnDialog.success,
        collection: state.collection.collection.value,
        nftID: state.collection.nftID,

        allowances: state.account.bc.allowances.value,
        balance: state.account.bc.balance.value,
        keys: state.account.wallet.connection.keys,
        broadCastInProgress: state.account.wallet.broadCast.inProgress,
        signInProgress: state.account.bc.protoBufSign.inProgress,
        txHashInProgress: state.account.bc.txHash.inProgress,
        rpcClient: state.query.rpcClient.value,
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
    setBurnSuccess,
    setBurnFail,
};

export default connect(stateToProps, actionToProps)(BurnDialog);
