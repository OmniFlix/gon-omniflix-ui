import { RPC_CLIENT_ERROR, RPC_CLIENT_IN_PROGRESS, RPC_CLIENT_SUCCESS } from '../constants/query';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { createProtobufRpcClient, GasPrice, QueryClient } from '@cosmjs/stargate';
import { ChainsList } from '../chains';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import {
    ALL_COLLECTIONS_WASM_FETCH_ERROR,
    ALL_COLLECTIONS_WASM_FETCH_IN_PROGRESS,
    ALL_COLLECTIONS_WASM_FETCH_SUCCESS,
} from '../constants/collections';

const rpcClientInProgress = () => {
    return {
        type: RPC_CLIENT_IN_PROGRESS,
    };
};

const rpcClientSuccess = (value, chain) => {
    return {
        type: RPC_CLIENT_SUCCESS,
        value,
        chain,
    };
};

const rpcClientError = (message) => {
    return {
        type: RPC_CLIENT_ERROR,
        message,
    };
};

export const setRpcClient = (chain, cb) => (dispatch) => {
    dispatch(rpcClientInProgress());
    const RPC_URL = ChainsList[chain] && ChainsList[chain].RPC_URL;
    if (!RPC_URL) {
        dispatch(rpcClientError('Failed!'));
        return;
    }

    (async () => {
        try {
            // Inside an async function...
            // The Tendermint client knows how to talk to the Tendermint RPC endpoint
            const tendermintClient = await Tendermint34Client.connect(RPC_URL);
            // The generic Stargate query client knows how to use the Tendermint client to submit unverified ABCI queries
            const queryClient = new QueryClient(tendermintClient);
            // This helper function wraps the generic Stargate query client for use by the specific generated query client
            const rpcClient = createProtobufRpcClient(queryClient);

            dispatch(rpcClientSuccess(rpcClient, chain));
            if (cb) {
                cb(rpcClient);
            }
        } catch (error) {
            dispatch(rpcClientError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
            if (cb) {
                cb(null);
            }
        }
    })();
};

const fetchAllCollectionsWasmInProgress = () => {
    return {
        type: ALL_COLLECTIONS_WASM_FETCH_IN_PROGRESS,
    };
};

const fetchAllCollectionsWasmSuccess = (value) => {
    return {
        type: ALL_COLLECTIONS_WASM_FETCH_SUCCESS,
        value,
    };
};

const fetchAllCollectionsWasmError = (message) => {
    return {
        type: ALL_COLLECTIONS_WASM_FETCH_ERROR,
        message,
        variant: 'error',
    };
};

export const fetchAllCollectionsWasm = (config) => (dispatch) => {
    dispatch(fetchAllCollectionsWasmInProgress());
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

            // await client?.queryContractSmart(
            //     config.CONTRACT_ADDRESS,
            //     {
            //         list_streams: {},
            //     }).then((resp) => {
            //     console.log('55555', resp);
            //     dispatch(fetchAllCollectionsWasmSuccess(resp && resp.streams));
            // }).catch((e) => {
            //     dispatch(fetchAllCollectionsWasmError(e && e.message));
            // });
            await client?.queryContractSmart(
                config.CONTRACT,
                {
                    // nft_info: {},
                    // nft_contract: {
                    //     class_id: 'wasm.stars16teejyjpa4qpcha54eulxv9l3n5vv9ujw3wc263ctuqahxx5k3as52my82/channel-187/onftdenom4ce508e776f64d9e8dd4af7367d65844',
                    // },
                    // contract_info: {},
                    // all_nft_info: {
                    //     token_id: 'onftab3dee07a9264b24b48d2a73e4ce3dc6',
                    // },
                },
            ).then((resp) => {
                console.log('5555555', resp);
                dispatch(fetchAllCollectionsWasmSuccess(resp && resp.streams));
            }).catch((e) => {
                dispatch(fetchAllCollectionsWasmError(e && e.message));
            });
        } catch (e) {
            dispatch(fetchAllCollectionsWasmError(e && e.message));
        }
    })();
};
