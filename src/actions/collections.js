import {
    AVATAR_UPLOAD_ERROR, AVATAR_UPLOAD_IN_PROGRESS, AVATAR_UPLOAD_SUCCESS,
    COLLECTION_ADD_ERROR,
    COLLECTION_ADD_IN_PROGRESS,
    COLLECTION_ADD_SUCCESS,
    COLLECTION_CONFIRM_DIALOG_HIDE,
    COLLECTION_CONFIRM_DIALOG_SHOW,
    COLLECTIONS_FETCH_ERROR,
    COLLECTIONS_FETCH_IN_PROGRESS,
    COLLECTIONS_FETCH_SUCCESS,
    CREATE_COLLECTION_DESCRIPTION_SET,
    CREATE_COLLECTION_IMAGE_URL_SET,
    CREATE_COLLECTION_JSON_SCHEMA_SET,
    CREATE_COLLECTION_NAME_SET,
    CREATE_COLLECTION_SYMBOL_SET,
    JSON_TAB_SWITCH_SET, SCHEMA_FETCH_ERROR,
    SCHEMA_FETCH_IN_PROGRESS,
    SCHEMA_FETCH_SUCCESS, SCHEMA_SET,
    SCHEMA_VALUES_SET,
} from '../constants/collections';
import Axios from 'axios';
import { urlFetchCollections } from '../chains/collections';
import { AVATAR_UPLOAD_URL, COLLECTIONS_URL, SCHEMA_LIST_URL } from '../constants/url';

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

const addCollectionInProgress = () => {
    return {
        type: COLLECTION_ADD_IN_PROGRESS,
    };
};

const addCollectionSuccess = (value) => {
    return {
        type: COLLECTION_ADD_SUCCESS,
        value,
    };
};

const addCollectionError = (message) => {
    return {
        type: COLLECTION_ADD_ERROR,
        message,
        variant: 'error',
    };
};

export const addCollection = (data, cb) => (dispatch) => {
    dispatch(addCollectionInProgress());

    Axios.post(COLLECTIONS_URL, data, {
        headers: {
            Accept: 'application/json, text/plain, */*',
            Connection: 'keep-alive',
        },
    })
        .then((res) => {
            dispatch(addCollectionSuccess(res.data));
            cb(res.data);
        })
        .catch((error) => {
            dispatch(addCollectionError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : error.response &&
                    error.response.data &&
                    error.response.data.error
                        ? error.response.data.error
                        : 'Failed!',
            ));
            cb(null);
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
