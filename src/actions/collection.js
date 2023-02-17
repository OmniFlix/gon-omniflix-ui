import { urlFetchCollectionNFTS } from '../constants/url';
import Axios from 'axios';
import {
    COLLECTION_NFT_S_FETCH_ERROR,
    COLLECTION_NFT_S_FETCH_IN_PROGRESS,
    COLLECTION_NFT_S_FETCH_SUCCESS,
} from '../constants/collection';

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
