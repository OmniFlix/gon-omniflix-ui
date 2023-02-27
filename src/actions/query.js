import { RPC_CLIENT_ERROR, RPC_CLIENT_IN_PROGRESS, RPC_CLIENT_SUCCESS } from '../constants/query';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';
// import { config } from '../config';
import { ChainsList } from '../chains';

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
