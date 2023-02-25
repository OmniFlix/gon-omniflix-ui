import {
    ALL_COLLECTIONS_FETCH_ERROR,
    ALL_COLLECTIONS_FETCH_IN_PROGRESS,
    ALL_COLLECTIONS_FETCH_SUCCESS,
    AVATAR_UPLOAD_ERROR,
    AVATAR_UPLOAD_IN_PROGRESS,
    AVATAR_UPLOAD_SUCCESS,
    CLEAR_COLLECTION_SET,
    COLLECTION_CONFIRM_DIALOG_HIDE,
    COLLECTION_CONFIRM_DIALOG_SHOW,
    COLLECTION_FETCH_ERROR,
    COLLECTION_FETCH_IN_PROGRESS,
    COLLECTION_FETCH_SUCCESS,
    COLLECTIONS_FETCH_ERROR,
    COLLECTIONS_FETCH_IN_PROGRESS,
    COLLECTIONS_FETCH_SUCCESS,
    CREATE_COLLECTION_DESCRIPTION_SET,
    CREATE_COLLECTION_IMAGE_URL_SET,
    CREATE_COLLECTION_JSON_SCHEMA_SET,
    CREATE_COLLECTION_NAME_SET,
    CREATE_COLLECTION_SYMBOL_SET,
    JSON_TAB_SWITCH_SET,
    SCHEMA_SET,
    SCHEMA_VALUES_SET,
    UPDATE_COLLECTION_SET,
} from '../constants/collections';
import Axios from 'axios';
import { AVATAR_UPLOAD_URL, urlFetchCollectionInfo } from '../constants/url';
import { ChainsList } from '../chains';

export const setCollectionName = (value) => {
    return {
        type: CREATE_COLLECTION_NAME_SET,
        value,
    };
};

export const setCollectionSymbol = (value) => {
    return {
        type: CREATE_COLLECTION_SYMBOL_SET,
        value,
    };
};

export const setCollectionDescription = (value, valid) => {
    return {
        type: CREATE_COLLECTION_DESCRIPTION_SET,
        value,
        valid,
    };
};

export const setCollectionJsonSchema = (value, valid) => {
    return {
        type: CREATE_COLLECTION_JSON_SCHEMA_SET,
        value,
        valid,
    };
};

export const setCollectionImageUrl = (value) => {
    return {
        type: CREATE_COLLECTION_IMAGE_URL_SET,
        value,
    };
};

export const setSchemaValues = (value, valid) => {
    return {
        type: SCHEMA_VALUES_SET,
        value,
        valid,
    };
};

export const setJsonTabSwitch = (value) => {
    return {
        type: JSON_TAB_SWITCH_SET,
        value,
    };
};

export const showCollectionConfirmDialog = (value) => {
    return {
        type: COLLECTION_CONFIRM_DIALOG_SHOW,
        value,
    };
};

export const hideCollectionConfirmDialog = () => {
    return {
        type: COLLECTION_CONFIRM_DIALOG_HIDE,
    };
};

export const setClearCollection = () => {
    return {
        type: CLEAR_COLLECTION_SET,
    };
};

const fetchCollectionsInProgress = () => {
    return {
        type: COLLECTIONS_FETCH_IN_PROGRESS,
    };
};

const fetchCollectionsSuccess = (value, chain) => {
    return {
        type: COLLECTIONS_FETCH_SUCCESS,
        value,
        chain,
    };
};

const fetchCollectionsError = (message) => {
    return {
        type: COLLECTIONS_FETCH_ERROR,
        message,
    };
};

export const fetchCollections = (rpcClient, chain, address, cb) => (dispatch) => {
    dispatch(fetchCollectionsInProgress());

    const QueryClientImpl = ChainsList[chain] && ChainsList[chain].QueryClientImpl;
    const client = rpcClient && rpcClient[chain];
    if (!QueryClientImpl) {
        dispatch(fetchCollectionsError('Failed!'));
        return;
    }

    (async () => {
        const queryService = new QueryClientImpl(client);
        let request = null;

        if (chain === 'iris') {
            return;
        } else {
            request = {
                owner: address,
                pagination: undefined,
            };
        }

        queryService.Denoms(request).then((queryResult) => {
            dispatch(fetchCollectionsSuccess(queryResult && queryResult.denoms, chain));
            if (cb) {
                cb(queryResult && queryResult.denoms);
            }
        }).catch((error) => {
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
    })();
};

export const setSchema = (value) => {
    return {
        type: SCHEMA_SET,
        value,
    };
};

const avatarUploadInProgress = () => {
    return {
        type: AVATAR_UPLOAD_IN_PROGRESS,
    };
};

const avatarUploadSuccess = (value) => {
    return {
        type: AVATAR_UPLOAD_SUCCESS,
        value,
    };
};

const avatarUploadError = (message) => {
    return {
        type: AVATAR_UPLOAD_ERROR,
        message,
        variant: 'error',
    };
};

export const avatarUpload = (file, cb) => (dispatch) => {
    dispatch(avatarUploadInProgress());

    const formData = new FormData();
    formData.append('file', file);

    Axios.post(AVATAR_UPLOAD_URL, formData, {
        headers: {
            Accept: 'application/json, text/plain, */*',
            Connection: 'keep-alive',
        },
    })
        .then((res) => {
            dispatch(avatarUploadSuccess(res.data));
            cb(res.data);
        })
        .catch((error) => {
            dispatch(avatarUploadError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
            cb(null);
        });
};

const fetchCollectionInProgress = () => {
    return {
        type: COLLECTION_FETCH_IN_PROGRESS,
    };
};

const fetchCollectionSuccess = (value) => {
    return {
        type: COLLECTION_FETCH_SUCCESS,
        value,
    };
};

const fetchCollectionError = (message) => {
    return {
        type: COLLECTION_FETCH_ERROR,
        message,
        variant: 'error',
    };
};

export const fetchCollection = (id, cb) => (dispatch) => {
    dispatch(fetchCollectionInProgress());

    const url = urlFetchCollectionInfo(id);
    Axios.get(url, {
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    })
        .then((res) => {
            if (res.data && res.data.denom) {
                dispatch(fetchCollectionSuccess(res.data.denom));
                if (cb) {
                    cb(res.data.denom);
                }
            }
        })
        .catch((error) => {
            dispatch(fetchCollectionError(
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

export const setUpdateCollection = (value) => {
    return {
        type: UPDATE_COLLECTION_SET,
        value,
    };
};

const fetchAllCollectionsInProgress = () => {
    return {
        type: ALL_COLLECTIONS_FETCH_IN_PROGRESS,
    };
};

const fetchAllCollectionsSuccess = (value, chain) => {
    return {
        type: ALL_COLLECTIONS_FETCH_SUCCESS,
        value,
        chain,
    };
};

const fetchAllCollectionsError = (message) => {
    return {
        type: ALL_COLLECTIONS_FETCH_ERROR,
        message,
    };
};

export const fetchAllCollections = (rpcClient, chain, cb) => (dispatch) => {
    dispatch(fetchAllCollectionsInProgress());

    const QueryClientImpl = ChainsList[chain] && ChainsList[chain].QueryClientImpl;
    const client = rpcClient && rpcClient[chain];
    if (!QueryClientImpl) {
        dispatch(fetchAllCollectionsError('Failed!'));
        return;
    }

    (async () => {
        const queryService = new QueryClientImpl(client);
        let request = null;

        if (chain === 'iris') {
            request = {
                pagination: undefined,
            };
        } else {
            request = {
                owner: '',
                pagination: undefined,
            };
        }

        queryService.Denoms(request).then((queryResult) => {
            dispatch(fetchAllCollectionsSuccess(queryResult && queryResult.denoms, chain));
            if (cb) {
                cb(queryResult && queryResult.denoms);
            }
        }).catch((error) => {
            dispatch(fetchAllCollectionsError(
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
