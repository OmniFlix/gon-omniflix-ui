import {
    COLLECTIONS_FETCH_ERROR,
    COLLECTIONS_FETCH_IN_PROGRESS,
    COLLECTIONS_FETCH_SUCCESS,
} from '../constants/collections';
import { Axios } from 'axios';
import { urlFetchCollections } from '../chains/collections';

const fetchCollectionsInProgress = () => {
    return {
        type: COLLECTIONS_FETCH_IN_PROGRESS,
    };
};

const fetchCollectionsSuccess = (value, chain, skip, limit, search, total) => {
    return {
        type: COLLECTIONS_FETCH_SUCCESS,
        value,
        chain,
        skip,
        limit,
        search,
        total,
    };
};

const fetchCollectionsError = (message) => {
    return {
        type: COLLECTIONS_FETCH_ERROR,
        message,
    };
};

export const fetchCollections = (chain, address, skip, limit, search, cb) => (dispatch) => {
    dispatch(fetchCollectionsInProgress());

    const url = urlFetchCollections(chain, address, skip, limit, search);
    Axios.get(url, {
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    })
        .then((res) => {
            dispatch(fetchCollectionsSuccess(res.data && res.data.result && res.data.result.list,
                chain, skip, limit, search, res.data && res.data.result && res.data.result.count));
            if (cb) {
                cb(res.data && res.data.result && res.data.result.list, res.data && res.data.result && res.data.result.count);
            }
        })
        .catch((error) => {
            dispatch(fetchCollectionsError(
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
