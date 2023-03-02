import {
    GQL_ALL_COLLECTIONS_FETCH_ERROR,
    GQL_ALL_COLLECTIONS_FETCH_IN_PROGRESS,
    GQL_ALL_COLLECTIONS_FETCH_SUCCESS,
} from '../constants/collections.gql';

const fetchGqlAllCollectionsInProgress = () => {
    return {
        type: GQL_ALL_COLLECTIONS_FETCH_IN_PROGRESS,
    };
};

const fetchGqlAllCollectionsSuccess = (value, chain, skip, limit, total) => {
    return {
        type: GQL_ALL_COLLECTIONS_FETCH_SUCCESS,
        value,
        chain,
        skip,
        limit,
        total,
    };
};

const fetchGqlAllCollectionsError = (message) => {
    return {
        type: GQL_ALL_COLLECTIONS_FETCH_ERROR,
        message,
    };
};

export const fetchGqlAllCollections = (getCollections, chain) => (dispatch) => {
    dispatch(fetchGqlAllCollectionsInProgress());

    getCollections().then((res) => {
        if (res && res.data) {
            dispatch(fetchGqlAllCollectionsSuccess(res.data, chain, res.data && res.data.collections && res.data.collections.offset,
                res.data && res.data.collections && res.data.collections.limit, res.data && res.data.collections && res.data.collections.total));
        } else {
            dispatch(fetchGqlAllCollectionsError(res && res.error));
        }
    }).catch((error) => {
        dispatch(fetchGqlAllCollectionsError(
            error.response &&
            error.response.data &&
            error.response.data.message
                ? error.response.data.message
                : 'Failed!',
        ));
    });

    //
    // queryService.Denoms(request).then((queryResult) => {
    //     dispatch(fetchGqlAllCollectionsSuccess(queryResult && queryResult.denoms, chain,
    //         skip, limit, (queryResult.pagination && queryResult.pagination.total)));
    //     if (cb) {
    //         cb(queryResult && queryResult.denoms);
    //     }
    // }).catch((error) => {
    //     dispatch(fetchGqlAllCollectionsError(
    //         error.response &&
    //         error.response.data &&
    //         error.response.data.message
    //             ? error.response.data.message
    //             : 'Failed!',
    //     ));
    //     if (cb) {
    //         cb(null);
    //     }
    // });
};
