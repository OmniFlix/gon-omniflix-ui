import { combineReducers } from 'redux';
import {
    AVATAR_UPLOAD_ERROR,
    AVATAR_UPLOAD_IN_PROGRESS, AVATAR_UPLOAD_SUCCESS,
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
    JSON_TAB_SWITCH_SET,
    SCHEMA_FETCH_ERROR,
    SCHEMA_FETCH_IN_PROGRESS,
    SCHEMA_FETCH_SUCCESS, SCHEMA_SET,
} from '../constants/collections';
import { TX_HASH_IN_PROGRESS_FALSE_SET } from '../constants/wallet';

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

const newCollection = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case COLLECTION_ADD_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case COLLECTION_ADD_SUCCESS:
        return {
            ...state,
            inProgress: false,
            value: action.value,
        };
    case COLLECTION_ADD_ERROR:
        return {
            ...state,
            inProgress: false,
        };
        // case CREATE_COLLECTION_DIALOG_HIDE:
        //     return {
        //         ...state,
        //         value: {},
        //     };
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
    // case CREATE_COLLECTION_DIALOG_SHOW:
    //     return {
    //         ...state,
    //         dialog: true,
    //         value: action.value || '',
    //         symbol: '',
    //         jsonSchema: '',
    //         jsonValid: true,
    //     };
    // case CREATE_COLLECTION_DIALOG_HIDE:
    //     return {
    //         ...state,
    //         dialog: false,
    //         jsonSchema: '',
    //         jsonValid: true,
    //     };
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
    list: [],
    value: null,
}, action) => {
    switch (action.type) {
    case SCHEMA_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case SCHEMA_FETCH_SUCCESS:
        return {
            ...state,
            inProgress: false,
            list: action.value,
        };
    case SCHEMA_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
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
    collectionSList,
    newCollection,
    createCollection,
    collectionConfirmDialog,
    tabSwitch,
    schemas,
    avatar,
});
