import {
    ALL_COLLECTIONS_FETCH_ERROR, ALL_COLLECTIONS_FETCH_IN_PROGRESS, ALL_COLLECTIONS_FETCH_SUCCESS,
    AVATAR_UPLOAD_ERROR,
    AVATAR_UPLOAD_IN_PROGRESS,
    AVATAR_UPLOAD_SUCCESS,
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
    SCHEMA_FETCH_ERROR,
    SCHEMA_FETCH_IN_PROGRESS,
    SCHEMA_FETCH_SUCCESS,
    SCHEMA_SET,
    SCHEMA_VALUES_SET,
    UPDATE_COLLECTION_SET,
} from '../constants/collections';
import Axios from 'axios';
import { urlFetchAllCollections, urlFetchCollections } from '../chains/collections';
import { AVATAR_UPLOAD_URL, SCHEMA_LIST_URL, urlFetchCollectionInfo } from '../constants/url';

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

const fetchCollectionsInProgress = () => {
    return {
        type: COLLECTIONS_FETCH_IN_PROGRESS,
    };
};

const fetchCollectionsSuccess = (value, chain, skip, limit, total) => {
    return {
        type: COLLECTIONS_FETCH_SUCCESS,
        value,
        chain,
        skip,
        limit,
        total,
    };
};

const fetchCollectionsError = (message) => {
    return {
        type: COLLECTIONS_FETCH_ERROR,
        message,
    };
};

export const fetchCollections = (chain, address, skip, limit, cb) => (dispatch) => {
    dispatch(fetchCollectionsInProgress());

    const url = urlFetchCollections(chain, address, skip, limit);
    Axios.get(url, {
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    })
        .then((res) => {
            dispatch(fetchCollectionsSuccess(res.data && res.data.denoms, chain, skip, limit,
                res.data && res.data.pagination && res.data.pagination.total));
            if (cb) {
                cb(res.data && res.data.denoms, res.data && res.data.pagination && res.data.pagination.total);
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

const fetchSchemaInProgress = () => {
    return {
        type: SCHEMA_FETCH_IN_PROGRESS,
    };
};

const fetchSchemaSuccess = (value) => {
    return {
        type: SCHEMA_FETCH_SUCCESS,
        value,
    };
};

const fetchSchemaError = (message) => {
    return {
        type: SCHEMA_FETCH_ERROR,
        message,
    };
};

export const fetchSchema = () => (dispatch) => {
    dispatch(fetchSchemaInProgress());

    Axios.get(SCHEMA_LIST_URL, {
        headers: {
            Accept: 'application/json, text/plain, */*',
            Connection: 'keep-alive',
            Authorization: 'Bearer ' + localStorage.getItem('acToken_of_studio'),
        },
    })
        .then((res) => {
            dispatch(fetchSchemaSuccess(res.data && res.data.result));
        })
        .catch((error) => {
            dispatch(fetchSchemaError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
        });
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

const fetchAllCollectionsSuccess = (value, chain, skip, limit, total) => {
    return {
        type: ALL_COLLECTIONS_FETCH_SUCCESS,
        value,
        chain,
        skip,
        limit,
        total,
    };
};

const fetchAllCollectionsError = (message) => {
    return {
        type: ALL_COLLECTIONS_FETCH_ERROR,
        message,
    };
};

export const fetchAllCollections = (chain, skip, limit, cb) => (dispatch) => {
    dispatch(fetchAllCollectionsInProgress());

    const url = urlFetchAllCollections(chain, skip, limit);
    Axios.get(url, {
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    })
        .then((res) => {
            dispatch(fetchAllCollectionsSuccess(res.data && res.data.denoms, chain, skip, limit,
                res.data && res.data.pagination && res.data.pagination.total));
            if (cb) {
                cb(res.data && res.data.denoms, res.data && res.data.pagination && res.data.pagination.total);
            }
        })
        .catch((error) => {
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
};
