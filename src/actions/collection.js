import { urlFetchClassTrace, urlFetchCollectionNFTS } from '../constants/url';
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

export const showTransferDialog = (value) => {
    return {
        type: TRANSFER_DIALOG_SHOW,
        value,
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

const fetchCollectionNFTSSuccess = (value, skip, limit, total) => {
    return {
        type: COLLECTION_NFT_S_FETCH_SUCCESS,
        value,
        skip,
        limit,
        total,
    };
};

const fetchCollectionNFTSError = (message) => {
    return {
        type: COLLECTION_NFT_S_FETCH_ERROR,
        message,
        variant: 'error',
    };
};

export const fetchCollectionNFTS = (id, address, skip, limit, cb) => (dispatch) => {
    dispatch(fetchCollectionNFTSInProgress());

    const url = urlFetchCollectionNFTS(id, address, skip, limit);
    Axios.get(url, {
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    })
        .then((res) => {
            dispatch(fetchCollectionNFTSSuccess(res.data && res.data.collection, skip, limit,
                res.data && res.data.pagination && res.data.pagination.total));
            if (cb) {
                cb(res.data && res.data.collection);
            }
        })
        .catch((error) => {
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

export const fetchClassTrace = (hash, cb) => (dispatch) => {
    dispatch(fetchClassTraceInProgress());

    const url = urlFetchClassTrace(hash);
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
