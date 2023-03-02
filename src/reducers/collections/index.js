import { combineReducers } from 'redux';
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
    UPDATE_COLLECTION_SET,
} from '../../constants/collections';
import { TX_HASH_IN_PROGRESS_FALSE_SET } from '../../constants/wallet';
import { schemaList } from '../../utils/defaultOptions';
import wasm from './wasm';

const collectionSList = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case COLLECTIONS_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case COLLECTIONS_FETCH_SUCCESS: {
        if (action.chain) {
            return {
                ...state,
                inProgress: false,
                value: {
                    ...state.value,
                    [action.chain]: {
                        value: action.value,
                        skip: action.skip,
                        limit: action.limit,
                        total: action.total,
                    },
                },
            };
        }

        return {
            ...state,
            inProgress: false,
        };
    }
    case COLLECTIONS_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const allCollectionSList = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case ALL_COLLECTIONS_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case ALL_COLLECTIONS_FETCH_SUCCESS: {
        if (action.chain) {
            return {
                ...state,
                inProgress: false,
                value: {
                    ...state.value,
                    [action.chain]: {
                        value: action.value,
                        skip: action.skip,
                        limit: action.limit,
                        total: action.total,
                    },
                },
            };
        }

        return {
            ...state,
            inProgress: false,
        };
    }
    case ALL_COLLECTIONS_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const singleCollection = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case COLLECTION_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case COLLECTION_FETCH_SUCCESS:
        return {
            inProgress: false,
            value: action.value,
        };
    case COLLECTION_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    case CLEAR_COLLECTION_SET:
        return {
            ...state,
            value: {},
        };
    default:
        return state;
    }
};

const createCollection = (state = {
    dialog: false,
    value: '',
    symbol: '',
    description: '',
    descriptionValid: true,
    jsonSchema: '',
    jsonValid: true,
    imageUrl: '',
}, action) => {
    switch (action.type) {
    case CREATE_COLLECTION_NAME_SET:
        return {
            ...state,
            value: action.value,
        };
    case CREATE_COLLECTION_SYMBOL_SET:
        return {
            ...state,
            symbol: action.value,
        };
    case CREATE_COLLECTION_DESCRIPTION_SET:
        return {
            ...state,
            description: action.value,
            descriptionValid: action.valid,
        };
    case CREATE_COLLECTION_JSON_SCHEMA_SET:
        return {
            ...state,
            jsonSchema: action.value,
            jsonValid: action.valid,
        };
    case CREATE_COLLECTION_IMAGE_URL_SET:
        return {
            ...state,
            imageUrl: action.value,
        };
    case TX_HASH_IN_PROGRESS_FALSE_SET:
        return {
            ...state,
            imageUrl: '',
        };
    case UPDATE_COLLECTION_SET:
        return {
            ...state,
            value: action.value && action.value.name ? action.value.name : '',
            symbol: action.value && action.value.symbol ? action.value.symbol : '',
            description: action.value && action.value.description ? action.value.description : '',
            imageUrl: action.value && action.value.preview_uri ? action.value.preview_uri : '',
            jsonSchema: action.value && action.value.schema ? action.value.schema : '',
        };

    default:
        return state;
    }
};

const collectionConfirmDialog = (state = {
    open: false,
    value: {},
}, action) => {
    switch (action.type) {
    case COLLECTION_CONFIRM_DIALOG_SHOW:
        return {
            open: true,
            value: action.value,
        };
    case COLLECTION_CONFIRM_DIALOG_HIDE:
        return {
            open: false,
            value: {},
        };
    default:
        return state;
    }
};

const tabSwitch = (state = 'code', action) => {
    if (action.type === JSON_TAB_SWITCH_SET) {
        return action.value;
    }

    return state;
};

const schemas = (state = {
    inProgress: false,
    list: schemaList,
    value: null,
}, action) => {
    switch (action.type) {
    case SCHEMA_SET:
        return {
            ...state,
            value: action.value,
        };
    case COLLECTION_CONFIRM_DIALOG_HIDE:
        return {
            ...state,
            value: null,
        };
    default:
        return state;
    }
};

const avatar = (state = {
    inProgress: false,
    value: null,
}, action) => {
    switch (action.type) {
    case AVATAR_UPLOAD_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case AVATAR_UPLOAD_SUCCESS:
        return {
            inProgress: false,
            value: action.value,
        };
    case AVATAR_UPLOAD_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

export default combineReducers({
    _wasm: wasm,
    collectionSList,
    allCollectionSList,
    singleCollection,
    createCollection,
    collectionConfirmDialog,
    tabSwitch,
    schemas,
    avatar,
});
