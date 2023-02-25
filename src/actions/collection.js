import { urlFetchClassTrace } from '../chains/classTrace';
import Axios from 'axios';
import {
    BURN_DIALOG_HIDE,
    BURN_DIALOG_SHOW,
    BURN_FAIL_SET,
    BURN_SUCCESS_SET,
    CHAIN_ID_SET,
    CLASS_TRACE_FETCH_ERROR,
    CLASS_TRACE_FETCH_IN_PROGRESS,
    CLASS_TRACE_FETCH_SUCCESS,
    COLLECTION_NFT_S_FETCH_ERROR,
    COLLECTION_NFT_S_FETCH_IN_PROGRESS,
    COLLECTION_NFT_S_FETCH_SUCCESS,
    NFT_ID_SET,
    TRANSFER_ADDRESS_SET,
    TRANSFER_DIALOG_HIDE,
    TRANSFER_DIALOG_SHOW,
    TRANSFER_FAIL_SET,
    TRANSFER_SUCCESS_SET,
} from '../constants/collection';
import { ChainsList } from '../chains';

export const showTransferDialog = (value, chain) => {
    return {
        type: TRANSFER_DIALOG_SHOW,
        value,
        chain,
    };
};

export const hideTransferDialog = () => {
    return {
        type: TRANSFER_DIALOG_HIDE,
    };
};

export const setTransferSuccess = (hash) => {
    return {
        type: TRANSFER_SUCCESS_SET,
        hash,
    };
};

export const setTransferFail = () => {
    return {
        type: TRANSFER_FAIL_SET,
    };
};

export const showBurnDialog = (value) => {
    return {
        type: BURN_DIALOG_SHOW,
        value,
    };
};

export const hideBurnDialog = () => {
    return {
        type: BURN_DIALOG_HIDE,
    };
};

export const setBurnSuccess = (hash) => {
    return {
        type: BURN_SUCCESS_SET,
        hash,
    };
};

export const setBurnFail = () => {
    return {
        type: BURN_FAIL_SET,
    };
};

export const setChainID = (value) => {
    return {
        type: CHAIN_ID_SET,
        value,
    };
};

export const setTransferAddress = (value) => {
    return {
        type: TRANSFER_ADDRESS_SET,
        value,
    };
};

export const setNftID = (value) => {
    return {
        type: NFT_ID_SET,
        value,
    };
};

const fetchCollectionNFTSInProgress = () => {
    return {
        type: COLLECTION_NFT_S_FETCH_IN_PROGRESS,
    };
};

const fetchCollectionNFTSSuccess = (value) => {
    return {
        type: COLLECTION_NFT_S_FETCH_SUCCESS,
        value,
    };
};

const fetchCollectionNFTSError = (message) => {
    return {
        type: COLLECTION_NFT_S_FETCH_ERROR,
        message,
        variant: 'error',
    };
};

export const fetchCollectionNFTS = (rpcClient, chain, id, cb) => (dispatch) => {
    dispatch(fetchCollectionNFTSInProgress());

    const QueryClientImpl = ChainsList[chain] && ChainsList[chain].QueryClientImpl;
    const client = rpcClient && rpcClient[chain];
    if (!QueryClientImpl) {
        dispatch(fetchCollectionNFTSError('Failed!'));
        return;
    }

    (async () => {
        let queryService = new QueryClientImpl(client);
        if (ChainsList[chain] && ChainsList[chain].service) {
            queryService = new QueryClientImpl(client, { service: ChainsList[chain].service });
        }

        let request = null;

        if (chain === 'iris' || chain === 'uptick') {
            request = {
                denomId: id,
                pagination: undefined,
            };
        } else {
            request = {
                denomId: id,
                pagination: undefined,
            };
        }

        queryService.Collection(request).then((queryResult) => {
            dispatch(fetchCollectionNFTSSuccess(queryResult && queryResult.collection, chain));
            if (cb) {
                cb(queryResult && queryResult.collection);
            }
        }).catch((error) => {
            dispatch(fetchCollectionNFTSError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
            if (cb) {
                cb(null);
            }
        });
    })();
};

const fetchClassTraceInProgress = () => {
    return {
        type: CLASS_TRACE_FETCH_IN_PROGRESS,
    };
};

const fetchClassTraceSuccess = (value, hash) => {
    return {
        type: CLASS_TRACE_FETCH_SUCCESS,
        value,
        hash,
    };
};

const fetchClassTraceError = (message) => {
    return {
        type: CLASS_TRACE_FETCH_ERROR,
        message,
        variant: 'error',
    };
};

export const fetchClassTrace = (chain, hash, cb) => (dispatch) => {
    dispatch(fetchClassTraceInProgress());

    const url = urlFetchClassTrace(chain, hash);
    Axios.get(url, {
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    })
        .then((res) => {
            dispatch(fetchClassTraceSuccess(res.data && res.data.class_trace, hash));
            if (cb) {
                cb(res.data && res.data.class_trace);
            }
        })
        .catch((error) => {
            dispatch(fetchClassTraceError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
            if (cb) {
                cb(null);
            }
        });
};
