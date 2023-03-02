import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';
import {
    WASM_ALL_COLLECTIONS_FETCH_ERROR,
    WASM_ALL_COLLECTIONS_FETCH_IN_PROGRESS,
    WASM_ALL_COLLECTIONS_FETCH_SUCCESS,
} from '../../constants/collections/wasm';

const fetchWasmAllCollectionsInProgress = () => {
    return {
        type: WASM_ALL_COLLECTIONS_FETCH_IN_PROGRESS,
    };
};

const fetchWasmAllCollectionsSuccess = (value, chain, contract) => {
    return {
        type: WASM_ALL_COLLECTIONS_FETCH_SUCCESS,
        value,
        chain,
        contract,
    };
};

const fetchWasmAllCollectionsError = (message) => {
    return {
        type: WASM_ALL_COLLECTIONS_FETCH_ERROR,
        message,
        variant: 'error',
    };
};

export const fetchWasmAllCollections = (config, chain, contract) => (dispatch) => {
    dispatch(fetchWasmAllCollectionsInProgress());
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
                dispatch(fetchWasmAllCollectionsSuccess(resp, chain, contract));
            }).catch((e) => {
                dispatch(fetchWasmAllCollectionsError(e && e.message));
            });
        } catch (e) {
            dispatch(fetchWasmAllCollectionsError(e && e.message));
        }
    })();
};
