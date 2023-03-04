import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';
import {
    WASM_COLLECTION_FETCH_ERROR,
    WASM_COLLECTION_FETCH_IN_PROGRESS,
    WASM_COLLECTION_FETCH_SUCCESS,
    WASM_COLLECTION_HASH_FETCH_ERROR,
    WASM_COLLECTION_HASH_FETCH_IN_PROGRESS,
    WASM_COLLECTION_HASH_FETCH_SUCCESS,
    WASM_COLLECTION_NFT_S_FETCH_ERROR,
    WASM_COLLECTION_NFT_S_FETCH_IN_PROGRESS,
    WASM_COLLECTION_NFT_S_FETCH_SUCCESS,
    WASM_NFT_INFO_FETCH_ERROR,
    WASM_NFT_INFO_FETCH_IN_PROGRESS,
    WASM_NFT_INFO_FETCH_SUCCESS,
} from '../../constants/collection/wasm';

const fetchWasmCollectionInProgress = () => {
    return {
        type: WASM_COLLECTION_FETCH_IN_PROGRESS,
    };
};

const fetchWasmCollectionSuccess = (value) => {
    return {
        type: WASM_COLLECTION_FETCH_SUCCESS,
        value,
    };
};

const fetchWasmCollectionError = (message) => {
    return {
        type: WASM_COLLECTION_FETCH_ERROR,
        message,
        variant: 'error',
    };
};

export const fetchWasmCollection = (config, chain, contract) => (dispatch) => {
    dispatch(fetchWasmCollectionInProgress());
    return (async () => {
        await window.keplr && window.keplr.enable(config.CHAIN_ID);
        const offlineSigner = window.getOfflineSigner && window.getOfflineSigner(config.CHAIN_ID);

        try {
            const client = await SigningCosmWasmClient.connectWithSigner(
                config.RPC_URL,
                offlineSigner,
                {
                    prefix: config.PREFIX,
                    gasPrice: GasPrice.fromString('0.025' + config.COIN_MINIMAL_DENOM),
                },
            );

            await client?.queryContractSmart(
                contract,
                {
                    contract_info: {},
                },
            ).then((resp) => {
                dispatch(fetchWasmCollectionSuccess(resp));
            }).catch((e) => {
                dispatch(fetchWasmCollectionError(e && e.message));
            });
        } catch (e) {
            dispatch(fetchWasmCollectionError(e && e.message));
        }
    })();
};

const fetchWasmCollectionNFTSInProgress = () => {
    return {
        type: WASM_COLLECTION_NFT_S_FETCH_IN_PROGRESS,
    };
};

const fetchWasmCollectionNFTSSuccess = (value) => {
    return {
        type: WASM_COLLECTION_NFT_S_FETCH_SUCCESS,
        value,
    };
};

const fetchWasmCollectionNFTSError = (message) => {
    return {
        type: WASM_COLLECTION_NFT_S_FETCH_ERROR,
        message,
        variant: 'error',
    };
};

export const fetchWasmCollectionNFTS = (config, contract, cb) => (dispatch) => {
    dispatch(fetchWasmCollectionNFTSInProgress());

    (async () => {
        await window.keplr && window.keplr.enable(config.CHAIN_ID);
        const offlineSigner = window.getOfflineSigner && window.getOfflineSigner(config.CHAIN_ID);

        try {
            const client = await SigningCosmWasmClient.connectWithSigner(
                config.RPC_URL,
                offlineSigner,
                {
                    prefix: config.PREFIX,
                    gasPrice: GasPrice.fromString('0.025' + config.COIN_MINIMAL_DENOM),
                },
            );

            await client?.queryContractSmart(
                contract,
                {
                    all_tokens: {
                        limit: 1000,
                    },
                },
            ).then((resp) => {
                dispatch(fetchWasmCollectionNFTSSuccess(resp));
                if (cb) {
                    cb(resp);
                }
            }).catch((e) => {
                dispatch(fetchWasmCollectionNFTSError(e && e.message));
                if (cb) {
                    cb(null);
                }
            });
        } catch (e) {
            dispatch(fetchWasmCollectionNFTSError(e && e.message));
        }
    })();
};

const fetchWasmNFTInfoInProgress = () => {
    return {
        type: WASM_NFT_INFO_FETCH_IN_PROGRESS,
    };
};

const fetchWasmNFTInfoSuccess = (value, nftID) => {
    return {
        type: WASM_NFT_INFO_FETCH_SUCCESS,
        value,
        nftID,
    };
};

const fetchWasmNFTInfoError = (message) => {
    return {
        type: WASM_NFT_INFO_FETCH_ERROR,
        message,
        variant: 'error',
    };
};

export const fetchWasmNFTInfo = (config, contract, nftID) => (dispatch) => {
    dispatch(fetchWasmNFTInfoInProgress());

    return (async () => {
        await window.keplr && window.keplr.enable(config.CHAIN_ID);
        const offlineSigner = window.getOfflineSigner && window.getOfflineSigner(config.CHAIN_ID);

        try {
            const client = await SigningCosmWasmClient.connectWithSigner(
                config.RPC_URL,
                offlineSigner,
                {
                    prefix: config.PREFIX,
                    gasPrice: GasPrice.fromString('0.025' + config.COIN_MINIMAL_DENOM),
                },
            );

            await client?.queryContractSmart(
                contract,
                {
                    all_nft_info: {
                        token_id: nftID,
                    },
                },
            ).then((resp) => {
                dispatch(fetchWasmNFTInfoSuccess(resp, nftID));
            }).catch((e) => {
                dispatch(fetchWasmNFTInfoError(e && e.message));
            });
        } catch (e) {
            dispatch(fetchWasmNFTInfoError(e && e.message));
        }
    })();
};

const fetchWasmCollectionHashInProgress = () => {
    return {
        type: WASM_COLLECTION_HASH_FETCH_IN_PROGRESS,
    };
};

const fetchWasmCollectionHashSuccess = (value, chain) => {
    return {
        type: WASM_COLLECTION_HASH_FETCH_SUCCESS,
        value,
        chain,
    };
};

const fetchWasmCollectionHashError = (message) => {
    return {
        type: WASM_COLLECTION_HASH_FETCH_ERROR,
        message,
        variant: 'error',
    };
};

export const fetchWasmCollectionHash = (config, chain, classID) => (dispatch) => {
    dispatch(fetchWasmCollectionHashInProgress());

    return (async () => {
        await window.keplr && window.keplr.enable(config.CHAIN_ID);
        const offlineSigner = window.getOfflineSigner && window.getOfflineSigner(config.CHAIN_ID);

        try {
            const client = await SigningCosmWasmClient.connectWithSigner(
                config.RPC_URL,
                offlineSigner,
                {
                    prefix: config.PREFIX,
                    gasPrice: GasPrice.fromString('0.025' + config.COIN_MINIMAL_DENOM),
                },
            );

            await client?.queryContractSmart(
                config.CONTRACT_ADDRESS,
                {
                    nft_contract: {
                        class_id: classID,
                    },
                },
            ).then((resp) => {
                dispatch(fetchWasmCollectionHashSuccess(resp, chain));
            }).catch((e) => {
                dispatch(fetchWasmCollectionHashError(e && e.message));
            });
        } catch (e) {
            dispatch(fetchWasmCollectionHashError(e && e.message));
        }
    })();
};
