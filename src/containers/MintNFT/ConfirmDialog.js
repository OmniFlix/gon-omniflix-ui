import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './dialog.css';
import { Button, Dialog, DialogContent } from '@mui/material';
import { hideMintNFTConfirmDialog, setBulkMint } from '../../actions/mintNFT';
import variables from '../../utils/variables';
import { customTypes } from '../../registry';
import { config, gas, GAS_PRICE_STEP_LOW } from '../../config';
import ImageOnLoad from '../../components/ImageOnLoad';
import { setSchemaValues } from '../../actions/collections';
import withRouter from '../../components/WithRouter';
import {
    aminoSignTx,
    fetchTxHash,
    protoBufSigning,
    setTxHashInProgressFalse,
    txSignAndBroadCast,
    txSignAndBroadCastAminoSign,
} from '../../actions/account/wallet';
import { fetchBalance } from '../../actions/account/BCDetails';
import { showMessage } from '../../actions/snackbar';
import { mediaReference } from '../../utils/ipfs';
import { setEmptyValue } from '../../actions/account';
import { generateID } from '../../utils/generateID';

const ConfirmMintNFTDialog = (props) => {
    const [inProgressLocal, setInProgress] = useState(false);

    const handleMint = () => {
        let mint = true;

        const data = {
            id: 'onft' + generateID(),
            sender: props.address,
            recipient: props.address,
            metadata: {
                name: props.assetTitle + handleSuffix(0),
                preview_uri: props.previewURL,
                media_uri: props.mediaURL,
            },
            transferable: props.transferStatus,
            extensible: props.extensibleStatus,
            nsfw: props.nsfwStatus,
            royalty_share: '0',
            denom_id: props.collection && props.collection.id,
            data: {},
        };

        if (props.description) {
            data.metadata.description = props.description;
        }
        if (props.royaltyShareStatus) {
            const royalty = props.royaltyShare && (Number(props.royaltyShare) / 100);
            data.royalty_share = String(royalty);
        } else {
            data.royalty_share = '0';
        }

        // Schema validation
        let schema = {};
        if (props.collection && props.collection.schema) {
            try {
                schema = JSON.parse(props.collection.schema);
            } catch (e) {
                schema = {};
            }
        }

        const required = schema && schema.required;
        if (required && required.length) {
            required.map((val) => {
                if (!props.schemaValues[val]) {
                    mint = false;
                    props.setSchemaValues(props.schemaValues, false);
                }

                return null;
            });
        }

        if (props.schemaValues && Object.keys(props.schemaValues).length) {
            data.data = props.schemaValues;
        }

        data.data = JSON.stringify(data.data);

        if (mint) {
            let balance = props.balance && props.balance.length && props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
            balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

            const msg = [{
                type: 'OmniFlix/onft/MsgMintONFT',
                value: data,
            }];

            if (msg.length && msg[0] && msg[0].value) {
                if (props.royaltyShareStatus) {
                    let royalty = props.royaltyShare && (Number(props.royaltyShare) / 100);
                    royalty = (10 ** 18) * royalty;
                    msg[0].value.royalty_share = String(royalty);
                } else {
                    let royalty = Number(0) / 100;
                    royalty = (10 ** 18) * royalty;
                    msg[0].value.royalty_share = String(royalty);
                }

                if (!msg[0].value.nsfw) {
                    msg[0].value.nsfw = props.nsfwStatus;
                }
            }

            const Tx = {
                msgs: msg,
                msgType: 'MintONFT',
                fee: {
                    amount: [{
                        amount: String(5000),
                        denom: config.COIN_MINIMAL_DENOM,
                    }],
                    gasLimit: String(300000),
                },
                memo: '',
            };

            const type = customTypes && customTypes.MintONFT && customTypes.MintONFT.typeUrl;
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
                                        if (hashResult.code !== undefined && hashResult.code !== 0) {
                                            props.showMessage(hashResult.logs || hashResult.raw_log, 'error', hashResult && hashResult.hash);
                                        }

                                        props.handleClose();
                                        props.fetchBalance(props.address);
                                        props.setTxHashInProgressFalse();
                                        props.router.navigate('/dashboard');
                                        props.setEmptyValue();
                                        clearInterval(time);
                                    }

                                    counter++;
                                    if (counter === 3) {
                                        if (hashResult.code !== undefined && hashResult.code !== 0) {
                                            props.showMessage(hashResult.logs || hashResult.raw_log, 'error', hashResult && hashResult.hash);
                                        }

                                        props.handleClose();
                                        props.fetchBalance(props.address);
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

    const handleSuffix = (index) => {
        if (props.suffixCount < 1 && !props.suffixCount) {
            return '';
        }

        switch (props.suffix && props.suffix.value) {
        case '()':
            return `(${Number(props.suffixCount) + Number(index)})`;
        case null:
            return '';
        default:
            return `${props.suffix.value}${Number(props.suffixCount) + Number(index)}`;
        }
    };

    const handleBulkMint = (whiteListed, mintMsg) => {
        setInProgress(true);

        const messages = mintMsg;
        const accounts = [...whiteListed];
        if (accounts && accounts.length && accounts[0]) {
            let mint = true;

            const data = {
                id: 'onft' + generateID(),
                sender: props.address,
                metadata: {
                    name: props.assetTitle + handleSuffix(messages.length),
                    preview_uri: props.previewURL,
                    media_uri: props.mediaURL,
                },
                transferable: props.transferStatus,
                extensible: props.extensibleStatus,
                nsfw: props.nsfwStatus,
                royalty_share: '0',
                denom_id: props.collection && props.collection.id,
                data: {},
                recipient: accounts[0],
            };

            if (props.description) {
                data.metadata.description = props.description;
            }
            if (props.royaltyShareStatus) {
                const royalty = props.royaltyShare && (Number(props.royaltyShare) / 100);
                data.royalty_share = String(royalty);
            } else {
                data.royalty_share = '0';
            }

            // Schema validation
            let schema = {};
            if (props.collection && props.collection.schema) {
                try {
                    schema = JSON.parse(props.collection.schema);
                } catch (e) {
                    schema = {};
                }
            }

            const required = schema && schema.required;
            if (required && required.length) {
                required.map((val) => {
                    if (!props.schemaValues[val]) {
                        mint = false;
                        props.setSchemaValues(props.schemaValues, false);
                    }

                    return null;
                });
            }

            if (props.schemaValues && Object.keys(props.schemaValues).length) {
                data.data = props.schemaValues;
            }

            data.data = JSON.stringify(data.data);

            if (mint) {
                const msg = [{
                    type: 'OmniFlix/onft/MsgMintONFT',
                    value: data,
                }];

                if (msg.length && msg[0] && msg[0].value) {
                    if (props.royaltyShareStatus) {
                        let royalty = props.royaltyShare && (Number(props.royaltyShare) / 100);
                        royalty = (10 ** 18) * royalty;
                        msg[0].value.royalty_share = String(royalty);
                    } else {
                        let royalty = Number(0) / 100;
                        royalty = (10 ** 18) * royalty;
                        msg[0].value.royalty_share = String(royalty);
                    }

                    if (!msg[0].value.nsfw) {
                        msg[0].value.nsfw = props.nsfwStatus;
                    }
                }

                if (msg && msg.length) {
                    messages.push(...msg);
                }

                accounts.splice(0, 1);
                setTimeout(() => {
                    handleBulkMint(accounts, messages);
                }, 1);
            }
        } else {
            let balance = props.balance && props.balance.length && props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
            balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

            let gasValue = gas.MINT_NFT;
            if (messages && messages.length > 1) {
                gasValue = (messages.length - 1) / 2 * gas.MINT_NFT + gas.MINT_NFT;
            }

            const Tx = {
                msgs: messages,
                msgType: 'MintONFT',
                fee: {
                    amount: [{
                        amount: String(gasValue * GAS_PRICE_STEP_LOW),
                        denom: config.COIN_MINIMAL_DENOM,
                    }],
                    gasLimit: String(gasValue),
                },
                memo: '',
            };

            const type = customTypes && customTypes.MintONFT && customTypes.MintONFT.typeUrl;
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

            setInProgress(false);
            props.sign(Tx, props.address, (result, txBytes) => {
                if (result) {
                    const data = {
                        tx_bytes: txBytes,
                        mode: 'BROADCAST_MODE_SYNC',
                    };
                    props.txSignAndBroadCast(data, (res1) => {
                        if (res1 && res1.txhash) {
                            handleBulkMintTxHash(res1);
                        }
                    });
                }
            });
        }
    };

    const handleBulkMintTxHash = (res1) => {
        let counter = 0;
        const time = setInterval(() => {
            props.fetchTxHash(res1.txhash, (hashResult) => {
                if (hashResult) {
                    if (hashResult.code !== undefined && hashResult.code !== 0) {
                        props.showMessage(hashResult.logs || hashResult.raw_log, 'error', hashResult && hashResult.hash);
                        props.setTxHashInProgressFalse();
                        props.handleClose();
                        clearInterval(time);

                        return;
                    }

                    props.handleClose();
                    props.fetchBalance(props.address);
                    props.setTxHashInProgressFalse();
                    handleRedirect();
                    clearInterval(time);
                }

                counter++;
                if (counter === 3) {
                    if (hashResult.code !== undefined && hashResult.code !== 0) {
                        props.showMessage(hashResult.logs || hashResult.raw_log, 'error', hashResult && hashResult.hash);
                        props.setTxHashInProgressFalse();
                        props.handleClose();
                        clearInterval(time);

                        return;
                    }

                    props.handleClose();
                    props.fetchBalance(props.address);
                    props.setTxHashInProgressFalse();
                    handleRedirect();
                    clearInterval(time);
                }
            });
        }, 5000);
    };

    const handleRedirect = () => {
        props.setEmptyValue();
        props.setBulkMint(false);
        props.router.navigate('/dashboard');
    };

    let royalty = 0;
    if (props.royaltyShareStatus) {
        royalty = props.royaltyShare && Number(props.royaltyShare);
    }

    const inProgress = props.signInProgress || props.broadCastInProgress || props.txHashInProgress;
    const mintDisable = !props.collection || Object.keys(props.collection).length === 0 || inProgress;

    return (
        <Dialog
            aria-describedby="verify-twitter-dialog-description"
            aria-labelledby="verify-twitter-dialog-title"
            className="dialog confirm_mint_dialog"
            open={props.open}
            onClose={props.handleClose}>
            <DialogContent className="confirm_mint_dialog_content">
                <h2 className="title">{variables[props.lang]['mint_nft_confirmation']}</h2>
                <div className="row1">
                    <div className="left_section">
                        <ImageOnLoad
                            preview={props.previewURL && mediaReference(props.previewURL)}
                            src={props.mediaURL && mediaReference(props.mediaURL)}/>
                        <div className="row">
                            <span>
                                {props.collection && (props.collection.name || props.collection.symbol)}
                            </span>
                            <p>{props.assetTitle + handleSuffix(0)}</p>
                        </div>
                    </div>
                    <div className="right_section">
                        <div className="row">
                            <span>{variables[props.lang].message_type}</span>
                            <p>{customTypes.MintONFT && customTypes.MintONFT.typeUrl}</p>
                        </div>
                        <div className="row">
                            <span>{variables[props.lang].denom_symbol}</span>
                            <p>{props.collection && props.collection.symbol}</p>
                        </div>
                        <div className="row">
                            <span>{variables[props.lang].nft_image_url}</span>
                            {props.mediaURL && props.mediaURL !== ''
                                ? <p
                                    className="url_css"
                                    onClick={() => window.open(props.mediaURL && mediaReference(props.mediaURL))}>
                                    {props.mediaURL && mediaReference(props.mediaURL)}
                                </p>
                                : props.previewURL && props.previewURL !== ''
                                    ? <p
                                        className="url_css"
                                        onClick={() => window.open(props.previewURL && mediaReference(props.previewURL))}>
                                        {props.previewURL && mediaReference(props.previewURL)}
                                    </p> : null}
                        </div>
                        <div className="row">
                            <span>{variables[props.lang].royalties}</span>
                            <p>{royalty + '%'}</p>
                        </div>
                        <div className="row">
                            <span>{variables[props.lang].nsfw}</span>
                            <p>{props.nsfwStatus ? 'true' : 'false'}</p>
                        </div>
                        <div className="row">
                            <span>{variables[props.lang].transferability}</span>
                            <p>{props.transferStatus ? 'true' : 'false'}</p>
                        </div>
                        <div className="row">
                            <span>{variables[props.lang].extensibility}</span>
                            <p>{props.extensibleStatus ? 'true' : 'false'}</p>
                        </div>
                        <div className="row">
                            <span>{variables[props.lang].schema}</span>
                            <p>{props.collection && props.collection.schema ? 'true' : 'false'}</p>
                        </div>
                    </div>
                </div>
                <div className="confirm_mint_action">
                    <Button
                        className="cancel_button"
                        onClick={props.handleClose}>
                        {variables[props.lang].cancel}
                    </Button>
                    {props.whiteListValue && props.whiteListValue.length
                        ? <Button
                            className="primary_button"
                            disabled={mintDisable || inProgressLocal}
                            variant="contained"
                            onClick={() => handleBulkMint(props.whiteListValue, [])}>
                            {inProgressLocal
                                ? variables[props.lang].processing + '....'
                                : inProgress
                                    ? variables[props.lang]['approval_pending'] + '....'
                                    : variables[props.lang]['confirm_mint_nft']}
                        </Button>
                        : <Button
                            className="primary_button"
                            disabled={mintDisable}
                            variant="contained"
                            onClick={handleMint}>
                            {inProgress
                                ? variables[props.lang]['approval_pending'] + '....'
                                : variables[props.lang]['confirm_mint_nft']}
                        </Button>}
                </div>
            </DialogContent>
        </Dialog>
    );
};

ConfirmMintNFTDialog.propTypes = {
    address: PropTypes.string.isRequired,
    allowances: PropTypes.array.isRequired,
    aminoSignTx: PropTypes.func.isRequired,
    assetTitle: PropTypes.string.isRequired,
    balance: PropTypes.array.isRequired,
    broadCastInProgress: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    extensibleStatus: PropTypes.bool.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchTxHash: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    keys: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    mediaURL: PropTypes.string.isRequired,
    nsfwStatus: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    previewURL: PropTypes.string.isRequired,
    royaltyShare: PropTypes.string.isRequired,
    royaltyShareStatus: PropTypes.bool.isRequired,
    schemaValues: PropTypes.object.isRequired,
    setBulkMint: PropTypes.func.isRequired,
    setEmptyValue: PropTypes.func.isRequired,
    setSchemaValues: PropTypes.func.isRequired,
    setTxHashInProgressFalse: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    sign: PropTypes.func.isRequired,
    signInProgress: PropTypes.bool.isRequired,
    suffixCount: PropTypes.number.isRequired,
    transferStatus: PropTypes.bool.isRequired,
    txHashInProgress: PropTypes.bool.isRequired,
    txSignAndBroadCast: PropTypes.func.isRequired,
    txSignAndBroadCastAminoSign: PropTypes.func.isRequired,
    whiteListValue: PropTypes.array.isRequired,
    collection: PropTypes.object,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }),
    suffix: PropTypes.object,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        allowances: state.account.bc.allowances.value,
        balance: state.account.bc.balance.value,
        broadCastInProgress: state.account.wallet.broadCast.inProgress,
        collection: state.mintNFT.collection.value,
        extensibleStatus: state.mintNFT.extensibleStatus,
        keys: state.account.wallet.connection.keys,
        lang: state.language,
        nsfwStatus: state.mintNFT.nsfwStatus,
        open: state.mintNFT.mintNFTConfirmDialog.open,
        value: state.mintNFT.mintNFTConfirmDialog.value,
        royaltyShare: state.mintNFT.royaltyShare.value,
        royaltyShareStatus: state.mintNFT.royaltyShare.status,
        schemaValues: state.mintNFT.schemaValues.value,
        signInProgress: state.account.bc.protoBufSign.inProgress,
        transferStatus: state.mintNFT.transferStatus,
        txHashInProgress: state.account.bc.txHash.inProgress,

        description: state.mintNFT.description.value,
        assetTitle: state.mintNFT.assetTitle.value,
        whiteListValue: state.mintNFT.whiteListValue,
        suffix: state.mintNFT.suffix.value,
        suffixCount: state.mintNFT.suffix.count,
        mediaURL: state.mintNFT.mediaURL.value,
        previewURL: state.mintNFT.previewURL.value,
    };
};

const actionToProps = {
    aminoSignTx,
    fetchBalance,
    fetchTxHash,
    handleClose: hideMintNFTConfirmDialog,
    setBulkMint,
    setEmptyValue,
    setSchemaValues,
    setTxHashInProgressFalse,
    showMessage,
    sign: protoBufSigning,
    txSignAndBroadCast,
    txSignAndBroadCastAminoSign,
};

export default withRouter(connect(stateToProps, actionToProps)(ConfirmMintNFTDialog));
