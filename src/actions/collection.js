import { urlFetchCollectionNFTS } from '../constants/url';
import Axios from 'axios';
import {
    BURN_DIALOG_HIDE, BURN_DIALOG_SHOW, CHAIN_ID_SET,
    COLLECTION_NFT_S_FETCH_ERROR,
    COLLECTION_NFT_S_FETCH_IN_PROGRESS,
    COLLECTION_NFT_S_FETCH_SUCCESS, NFT_ID_SET, TRANSFER_ADDRESS_SET, TRANSFER_DIALOG_HIDE, TRANSFER_DIALOG_SHOW,
} from '../constants/collection';

export const showTransferDialog = () => {
    return {
        type: TRANSFER_DIALOG_SHOW,
    };
};

export const hideTransferDialog = () => {
    return {
        type: TRANSFER_DIALOG_HIDE,
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
