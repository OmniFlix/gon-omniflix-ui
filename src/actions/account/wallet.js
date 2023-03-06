import {
    CONNECT_KEPLR_ACCOUNT_ERROR,
    CONNECT_KEPLR_ACCOUNT_IN_PROGRESS,
    CONNECT_KEPLR_ACCOUNT_SUCCESS,
    CONTRACT_SIGN_ERROR,
    CONTRACT_SIGN_IN_PROGRESS,
    CONTRACT_SIGN_SUCCESS,
    DISCONNECT_SET,
    KEPLR_ACCOUNT_KEYS_SET,
    PROTO_BUF_SIGN_ERROR,
    PROTO_BUF_SIGN_IN_PROGRESS,
    PROTO_BUF_SIGN_SUCCESS,
    TX_HASH_FETCH_ERROR,
    TX_HASH_FETCH_IN_PROGRESS,
    TX_HASH_FETCH_SUCCESS,
    TX_HASH_IN_PROGRESS_FALSE_SET,
    TX_SIGN_AND_BROAD_CAST_ERROR,
    TX_SIGN_AND_BROAD_CAST_IN_PROGRESS,
    TX_SIGN_AND_BROAD_CAST_SUCCESS,
    TX_SIGN_ERROR,
    TX_SIGN_IN_PROGRESS,
    TX_SIGN_SUCCESS,
} from '../../constants/wallet';
import { chainConfig, chainId, config } from '../../config';
import { defaultRegistryTypes, SigningStargateClient } from '@cosmjs/stargate';
import { encodePubkey, makeSignDoc, Registry } from '@cosmjs/proto-signing';
import { makeSignDoc as AminoMakeSignDoc } from '@cosmjs/amino';
import { customRegistry, customTypes } from '../../registry';
import { encodeSecp256k1Pubkey } from '@cosmjs/amino/build/encoding';
import { AuthInfo, TxBody, TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import Axios from 'axios';
import { convertToCamelCase } from '../../utils/strings';
import { MsgTransfer } from 'cosmjs-types/ibc/applications/transfer/v1/tx';
import { fromBase64, toBase64 } from '@cosmjs/encoding';
import { chainConfigIBC } from '../../chains';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';

const connectKeplrAccountInProgress = () => {
    return {
        type: CONNECT_KEPLR_ACCOUNT_IN_PROGRESS,
    };
};

const connectKeplrAccountSuccess = (value) => {
    return {
        type: CONNECT_KEPLR_ACCOUNT_SUCCESS,
        value,
    };
};

const connectKeplrAccountError = (message) => {
    return {
        type: CONNECT_KEPLR_ACCOUNT_ERROR,
        message,
    };
};

const setKeplrAccountKeys = (value) => {
    return {
        type: KEPLR_ACCOUNT_KEYS_SET,
        value,
    };
};

export const initializeChain = (cb) => (dispatch) => {
    dispatch(connectKeplrAccountInProgress());
    (async () => {
        if (!window.getOfflineSigner || !window.keplr) {
            const error = 'Please install keplr extension';
            dispatch(connectKeplrAccountError(error));
        } else {
            if (window.keplr.experimentalSuggestChain) {
                try {
                    await window.keplr.experimentalSuggestChain(chainConfig);
                } catch (error) {
                    const chainError = 'Failed to suggest the chain';
                    dispatch(connectKeplrAccountError(chainError));
                }
            } else {
                const versionError = 'Please use the recent version of keplr extension';
                dispatch(connectKeplrAccountError(versionError));
            }
        }

        if (window.keplr) {
            window.keplr.enable(chainId)
                .then(async () => {
                    const offlineSigner = window.getOfflineSigner(chainId);
                    const accounts = await offlineSigner.getAccounts();
                    dispatch(connectKeplrAccountSuccess(accounts));
                    cb(accounts);
                }).catch((error) => {
                    dispatch(connectKeplrAccountError(error.toString()));
                });
            window.keplr && window.keplr.getKey(chainId)
                .then((res) => {
                    dispatch(setKeplrAccountKeys(res));
                }).catch(() => {

                });
        } else {
            return null;
        }
    })();
};

export const initializeChainIBC = (config, chain, cb) => () => {
    (async () => {
        if (!window.getOfflineSigner || !window.keplr) {
            cb(null);
        } else {
            if (window.keplr.experimentalSuggestChain) {
                try {
                    await window.keplr.experimentalSuggestChain(chainConfigIBC(chain));
                } catch (error) {
                    cb(null);
                }
            } else {
                cb(null);
            }
        }

        if (window.keplr) {
            window.keplr.enable(config.CHAIN_ID)
                .then(async () => {
                    const offlineSigner = window.getOfflineSigner(config.CHAIN_ID);
                    const accounts = await offlineSigner.getAccounts();
                    cb(accounts);
                    // eslint-disable-next-line handle-callback-err
                }).catch((error) => {
                    cb(null);
                });
        } else {
            return null;
        }
    })();
};

const signTxInProgress = () => {
    return {
        type: TX_SIGN_IN_PROGRESS,
    };
};

const signTxSuccess = (value) => {
    return {
        type: TX_SIGN_SUCCESS,
        value,
    };
};

const signTxError = (message) => {
    return {
        type: TX_SIGN_ERROR,
        message,
        variant: 'error',
    };
};

export const aminoSignTx = (tx, address, cb) => (dispatch) => {
    dispatch(signTxInProgress());
    (async () => {
        await window.keplr && window.keplr.enable(config.CHAIN_ID);
        const offlineSigner = window.getOfflineSigner && window.getOfflineSigner(config.CHAIN_ID);

        try {
            const client = await SigningStargateClient.connectWithSigner(
                config.RPC_URL,
                offlineSigner,
            );

            const account = {};
            try {
                const {
                    accountNumber,
                    sequence,
                } = await client.getSequence(address);
                account.accountNumber = accountNumber;
                account.sequence = sequence;
            } catch (e) {
                account.accountNumber = 0;
                account.sequence = 0;
            }

            const signDoc = AminoMakeSignDoc(
                tx.msgs ? tx.msgs : [tx.msg],
                tx.fee,
                config.CHAIN_ID,
                tx.memo,
                account.accountNumber,
                account.sequence,
            );

            offlineSigner.signAmino(address, signDoc).then((result) => {
                if (result && result.code !== undefined && result.code !== 0) {
                    dispatch(signTxError(result.log || result.rawLog));
                } else {
                    dispatch(signTxSuccess(result));
                    cb(result);
                }
            }).catch((error) => {
                dispatch(signTxError(error && error.message));
            });
        } catch (e) {
            dispatch(signTxError(e && e.message));
        }
    })();
};

const protoBufSigningInProgress = () => {
    return {
        type: PROTO_BUF_SIGN_IN_PROGRESS,
    };
};

const protoBufSigningSuccess = (value) => {
    return {
        type: PROTO_BUF_SIGN_SUCCESS,
        value,
    };
};

const protoBufSigningError = (message) => {
    return {
        type: PROTO_BUF_SIGN_ERROR,
        message,
        variant: 'error',
    };
};

export const protoBufSigning = (tx, address, cb) => (dispatch) => {
    dispatch(protoBufSigningInProgress());
    (async () => {
        await window.keplr && window.keplr.enable(config.CHAIN_ID);
        const offlineSigner = window.getOfflineSigner && window.getOfflineSigner(config.CHAIN_ID);
        const myRegistry = new Registry([...defaultRegistryTypes, ...customRegistry]);
        if (tx && tx.fee && tx.fee.granter && window.keplr) {
            window.keplr.defaultOptions = {
                sign: {
                    disableBalanceCheck: true,
                },
            };
        } else if (window.keplr) {
            window.keplr.defaultOptions = {};
        }

        try {
            const client = await SigningStargateClient.connectWithSigner(
                config.RPC_URL,
                offlineSigner,
                { registry: myRegistry },
            );

            let account = {};
            try {
                account = await client.getAccount(address);
            } catch (e) {
                account.accountNumber = 0;
                account.sequence = 0;
            }
            const accounts = await offlineSigner.getAccounts();

            let pubkey = accounts && accounts.length && accounts[0] &&
                accounts[0].pubkey && encodeSecp256k1Pubkey(accounts[0].pubkey);
            pubkey = accounts && accounts.length && accounts[0] &&
                accounts[0].pubkey && pubkey && pubkey.value &&
                encodePubkey(pubkey);

            let authInfo = {
                signerInfos: [{
                    publicKey: pubkey,
                    modeInfo: {
                        single: {
                            mode: 1,
                        },
                    },
                    sequence: account && account.sequence,
                }],
                fee: { ...tx.fee },
            };
            authInfo = AuthInfo.encode(AuthInfo.fromPartial(authInfo)).finish();

            const messages = [];
            if (tx.msgs && tx.msgs.length) {
                tx.msgs.map((val) => {
                    let msgValue = val.value;
                    msgValue = msgValue && convertToCamelCase(msgValue);
                    let typeUrl = val.typeUrl;

                    if (tx.msgType) {
                        const type = customTypes[tx.msgType].type;
                        typeUrl = customTypes[tx.msgType].typeUrl;
                        msgValue = type.encode(type.fromPartial(msgValue)).finish();
                    } else if (typeUrl === '/ibc.applications.transfer.v1.MsgTransfer') {
                        msgValue = MsgTransfer.encode(MsgTransfer.fromPartial(msgValue)).finish();
                    }

                    messages.push({
                        typeUrl: typeUrl,
                        value: msgValue,
                    });

                    return null;
                });
            } else {
                let msgValue = tx.msg && tx.msg.value;
                msgValue = msgValue && convertToCamelCase(msgValue);
                let typeUrl = tx.msg && tx.msg.typeUrl;

                if (tx.msgType) {
                    const type = customTypes[tx.msgType].type;
                    typeUrl = customTypes[tx.msgType].typeUrl;
                    msgValue = type.encode(type.fromPartial(msgValue)).finish();
                } else if (typeUrl === '/ibc.applications.transfer.v1.MsgTransfer') {
                    msgValue = MsgTransfer.encode(MsgTransfer.fromPartial(msgValue)).finish();
                }

                messages.push({
                    typeUrl: typeUrl,
                    value: msgValue,
                });
            }

            let bodyBytes = {
                messages: messages,
                memo: tx.memo,
            };
            bodyBytes = TxBody.encode(TxBody.fromPartial(bodyBytes)).finish();

            const signDoc = makeSignDoc(
                bodyBytes,
                authInfo,
                config.CHAIN_ID,
                account && account.accountNumber,
            );

            offlineSigner.signDirect(address, signDoc).then((result) => {
                const txRaw = TxRaw.fromPartial({
                    bodyBytes: result.signed.bodyBytes,
                    authInfoBytes: result.signed.authInfoBytes,
                    signatures: [fromBase64(result.signature.signature)],
                });
                const txBytes = TxRaw.encode(txRaw).finish();
                if (result && result.code !== undefined && result.code !== 0) {
                    dispatch(protoBufSigningError(result.log || result.rawLog));
                } else {
                    dispatch(protoBufSigningSuccess(result));
                    cb(result, toBase64(txBytes));
                }
            }).catch((error) => {
                dispatch(protoBufSigningError(error && error.message));
            });
        } catch (e) {
            dispatch(protoBufSigningError(e && e.message));
        }
    })();
};

export const protoBufSigningIBC = (config, tx, address, cb) => (dispatch) => {
    dispatch(protoBufSigningInProgress());
    (async () => {
        await window.keplr && window.keplr.enable(config.CHAIN_ID);
        const offlineSigner = window.getOfflineSigner && window.getOfflineSigner(config.CHAIN_ID);
        const myRegistry = new Registry([...defaultRegistryTypes, ...customRegistry]);
        if (tx && tx.fee && tx.fee.granter && window.keplr) {
            window.keplr.defaultOptions = {
                sign: {
                    disableBalanceCheck: true,
                },
            };
        } else if (window.keplr) {
            window.keplr.defaultOptions = {};
        }

        try {
            const client = await SigningStargateClient.connectWithSigner(
                config.RPC_URL,
                offlineSigner,
                { registry: myRegistry },
            );

            let account = {};
            try {
                account = await client.getAccount(address);
            } catch (e) {
                account.accountNumber = 0;
                account.sequence = 0;
            }
            const accounts = await offlineSigner.getAccounts();

            let pubkey = accounts && accounts.length && accounts[0] &&
                accounts[0].pubkey && encodeSecp256k1Pubkey(accounts[0].pubkey);
            pubkey = accounts && accounts.length && accounts[0] &&
                accounts[0].pubkey && pubkey && pubkey.value &&
                encodePubkey(pubkey);

            let authInfo = {
                signerInfos: [{
                    publicKey: pubkey,
                    modeInfo: {
                        single: {
                            mode: 1,
                        },
                    },
                    sequence: account && account.sequence,
                }],
                fee: { ...tx.fee },
            };
            authInfo = AuthInfo.encode(AuthInfo.fromPartial(authInfo)).finish();

            const messages = [];
            if (tx.msgs && tx.msgs.length) {
                tx.msgs.map((val) => {
                    let msgValue = val.value;
                    msgValue = msgValue && convertToCamelCase(msgValue);
                    let typeUrl = val.typeUrl;

                    if (tx.msgType) {
                        const type = customTypes[tx.msgType].type;
                        typeUrl = customTypes[tx.msgType].typeUrl;
                        msgValue = type.encode(type.fromPartial(msgValue)).finish();
                    } else if (typeUrl === '/ibc.applications.transfer.v1.MsgTransfer') {
                        msgValue = MsgTransfer.encode(MsgTransfer.fromPartial(msgValue)).finish();
                    }

                    messages.push({
                        typeUrl: typeUrl,
                        value: msgValue,
                    });

                    return null;
                });
            } else {
                let msgValue = tx.msg && tx.msg.value;
                msgValue = msgValue && convertToCamelCase(msgValue);
                let typeUrl = tx.msg && tx.msg.typeUrl;

                if (tx.msgType) {
                    const type = customTypes[tx.msgType].type;
                    typeUrl = customTypes[tx.msgType].typeUrl;
                    msgValue = type.encode(type.fromPartial(msgValue)).finish();
                } else if (typeUrl === '/ibc.applications.transfer.v1.MsgTransfer') {
                    msgValue = MsgTransfer.encode(MsgTransfer.fromPartial(msgValue)).finish();
                }

                messages.push({
                    typeUrl: typeUrl,
                    value: msgValue,
                });
            }

            let bodyBytes = {
                messages: messages,
                memo: tx.memo,
            };
            bodyBytes = TxBody.encode(TxBody.fromPartial(bodyBytes)).finish();

            const signDoc = makeSignDoc(
                bodyBytes,
                authInfo,
                config.CHAIN_ID,
                account && account.accountNumber,
            );

            offlineSigner.signDirect(address, signDoc).then((result) => {
                const txRaw = TxRaw.fromPartial({
                    bodyBytes: result.signed.bodyBytes,
                    authInfoBytes: result.signed.authInfoBytes,
                    signatures: [fromBase64(result.signature.signature)],
                });
                const txBytes = TxRaw.encode(txRaw).finish();
                if (result && result.code !== undefined && result.code !== 0) {
                    dispatch(protoBufSigningError(result.log || result.rawLog));
                } else {
                    dispatch(protoBufSigningSuccess(result));
                    cb(result, toBase64(txBytes));
                }
            }).catch((error) => {
                dispatch(protoBufSigningError(error && error.message));
            });
        } catch (e) {
            dispatch(protoBufSigningError(e && e.message));
        }
    })();
};

const signContractInProgress = () => {
    return {
        type: CONTRACT_SIGN_IN_PROGRESS,
    };
};

const signContractSuccess = (value) => {
    return {
        type: CONTRACT_SIGN_SUCCESS,
        value,
        message: 'Success',
        variant: 'success',
    };
};

const signContractError = (message) => {
    return {
        type: CONTRACT_SIGN_ERROR,
        message,
        variant: 'error',
    };
};

export const signContract = (config, tx, address, CONTRACT, cb) => (dispatch) => {
    dispatch(signContractInProgress());
    (async () => {
        await window.keplr && window.keplr.enable(config.CHAIN_ID);
        const offlineSigner = window.getOfflineSigner && window.getOfflineSigner(config.CHAIN_ID);

        try {
            const client = await SigningCosmWasmClient.connectWithSigner(
                config.RPC_URL,
                offlineSigner,
            );

            client.execute(
                address,
                CONTRACT,
                tx.msg,
                tx.fee,
                tx.memo,
                tx.funds,
            ).then((result) => {
                if (result && result.code !== undefined && result.code !== 0) {
                    dispatch(signContractError(result.log || result.rawLog));
                    cb(result);
                } else {
                    dispatch(signContractSuccess(result));
                    cb(result);
                }
            }).catch((error) => {
                dispatch(signContractError(error && error.message));
                cb(null);
            });
        } catch (e) {
            dispatch(signContractError(e && e.message));
        }
    })();
};

const txSignAndBroadCastInProgress = () => {
    return {
        type: TX_SIGN_AND_BROAD_CAST_IN_PROGRESS,
    };
};

const txSignAndBroadCastSuccess = (value, message, variant, hash, explorer) => {
    return {
        type: TX_SIGN_AND_BROAD_CAST_SUCCESS,
        value,
        message,
        variant,
        hash,
        explorer,
    };
};

const txSignAndBroadCastError = (message) => {
    return {
        type: TX_SIGN_AND_BROAD_CAST_ERROR,
        message,
        variant: 'error',
    };
};

export const txSignAndBroadCast = (data, cb) => (dispatch) => {
    dispatch(txSignAndBroadCastInProgress());

    const url = config.REST_URL + '/cosmos/tx/v1beta1/txs';
    Axios.post(url, data, {
        headers: {
            Accept: 'application/json, text/plain, */*',
            Connection: 'keep-alive',
        },
    })
        .then((res) => {
            if (res.data && res.data.tx_response && (res.data.tx_response.code !== undefined) && (res.data.tx_response.code !== 0)) {
                dispatch(txSignAndBroadCastError(res.data.tx_response.logs && res.data.tx_response.logs.length
                    ? res.data.tx_response.logs
                    : res.data.tx_response.raw_log));
                cb(null);
            } else {
                const message = 'Transaction Success, Waiting for the tx to be included in block';
                dispatch(txSignAndBroadCastSuccess(res.data && res.data.tx_response, message, 'processing',
                    res.data && res.data.tx_response && res.data.tx_response.txhash));
                cb(res.data && res.data.tx_response);
            }
        })
        .catch((error) => {
            dispatch(txSignAndBroadCastError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
            cb(null);
        });
};

export const txSignAndBroadCastIBC = (config, data, cb) => (dispatch) => {
    dispatch(txSignAndBroadCastInProgress());

    const url = config.REST_URL + '/cosmos/tx/v1beta1/txs';
    Axios.post(url, data, {
        headers: {
            Accept: 'application/json, text/plain, */*',
            Connection: 'keep-alive',
        },
    })
        .then((res) => {
            if (res.data && res.data.tx_response && (res.data.tx_response.code !== undefined) && (res.data.tx_response.code !== 0)) {
                dispatch(txSignAndBroadCastError(res.data.tx_response.logs && res.data.tx_response.logs.length
                    ? res.data.tx_response.logs
                    : res.data.tx_response.raw_log));
                cb(null);
            } else {
                const message = 'Transaction Success, Waiting for the tx to be included in block';
                dispatch(txSignAndBroadCastSuccess(res.data && res.data.tx_response, message, 'processing',
                    res.data && res.data.tx_response && res.data.tx_response.txhash, config.EXPLORER));
                cb(res.data && res.data.tx_response);
            }
        })
        .catch((error) => {
            dispatch(txSignAndBroadCastError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
            cb(null);
        });
};

export const txSignAndBroadCastAminoSign = (data, cb) => (dispatch) => {
    dispatch(txSignAndBroadCastInProgress());

    const url = config.REST_URL + '/txs';
    Axios.post(url, data, {
        headers: {
            Accept: 'application/json, text/plain, */*',
            Connection: 'keep-alive',
        },
    })
        .then((res) => {
            if (res.data && res.data.code !== undefined && (res.data.code !== 0)) {
                dispatch(txSignAndBroadCastError(res.data.logs || res.data.raw_log));
                cb(null);
            } else {
                const message = 'Transaction Success, Waiting for the tx to be included in block';
                dispatch(txSignAndBroadCastSuccess(res.data, message, 'processing',
                    res.data && res.data.txhash));
                cb(res.data);
            }
        })
        .catch((error) => {
            dispatch(txSignAndBroadCastError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
            cb(null);
        });
};

const fetchTxHashInProgress = () => {
    return {
        type: TX_HASH_FETCH_IN_PROGRESS,
    };
};

const fetchTxHashSuccess = (message, hash, explorer) => {
    return {
        type: TX_HASH_FETCH_SUCCESS,
        message,
        variant: 'success',
        hash,
        explorer,
    };
};

const fetchTxHashError = (message) => {
    return {
        type: TX_HASH_FETCH_ERROR,
        message,
    };
};

export const fetchTxHash = (hash, cb) => (dispatch) => {
    dispatch(fetchTxHashInProgress());

    const url = config.REST_URL + '/cosmos/tx/v1beta1/txs/' + hash;
    Axios.get(url, {
        headers: {
            Accept: 'application/json, text/plain, */*',
            Connection: 'keep-alive',
        },
    })
        .then((res) => {
            if (res.data && res.data.tx_response && (res.data.tx_response.code !== undefined) && (res.data.tx_response.code !== 0)) {
                dispatch(fetchTxHashError(res.data.tx_response.logs && res.data.tx_response.logs.length
                    ? res.data.tx_response.logs
                    : res.data.tx_response.raw_log));
                cb(res.data && res.data.tx_response);
            } else {
                dispatch(fetchTxHashSuccess('success', hash));
                cb(res.data && res.data.tx_response);
            }
        })
        .catch((error) => {
            dispatch(fetchTxHashError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : error.response &&
                    error.response.data &&
                    error.response.data.error
                        ? error.response.data.error
                        : 'Failed!',
            ));
            cb(null);
        });
};

export const fetchTxHashIBC = (config, hash, cb) => (dispatch) => {
    dispatch(fetchTxHashInProgress());

    const url = config.REST_URL + '/cosmos/tx/v1beta1/txs/' + hash;
    Axios.get(url, {
        headers: {
            Accept: 'application/json, text/plain, */*',
            Connection: 'keep-alive',
        },
    })
        .then((res) => {
            if (res.data && res.data.tx_response && (res.data.tx_response.code !== undefined) && (res.data.tx_response.code !== 0)) {
                dispatch(fetchTxHashError(res.data.tx_response.logs && res.data.tx_response.logs.length
                    ? res.data.tx_response.logs
                    : res.data.tx_response.raw_log));
                cb(res.data && res.data.tx_response);
            } else {
                dispatch(fetchTxHashSuccess('success', hash, config.EXPLORER));
                cb(res.data && res.data.tx_response);
            }
        })
        .catch((error) => {
            dispatch(fetchTxHashError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : error.response &&
                    error.response.data &&
                    error.response.data.error
                        ? error.response.data.error
                        : 'Failed!',
            ));
            cb(null);
        });
};

export const setTxHashInProgressFalse = () => {
    return {
        type: TX_HASH_IN_PROGRESS_FALSE_SET,
    };
};

export const setDisconnect = () => {
    return {
        type: DISCONNECT_SET,
    };
};
