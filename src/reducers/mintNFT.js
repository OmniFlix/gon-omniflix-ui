import { combineReducers } from 'redux';
import {
    ASSET_TITLE_SET,
    BULK_MINT_SET,
    COLLECTION_SET,
    DESCRIPTION_SET,
    EXTENSIBLE_STATUS_SET,
    MEDIA_URL_SET,
    MINT_NFT_CONFIRM_DIALOG_HIDE,
    MINT_NFT_CONFIRM_DIALOG_SHOW,
    NSFW_STATUS_SET,
    PREVIEW_URL_SET,
    ROYALTY_SHARE_SET,
    ROYALTY_SHARE_STATUS_SET,
    SUFFIX_COUNT_SET,
    SUFFIX_VALUE_SET,
    TRANSFER_STATUS_SET,
    WHITELIST_VALUE_SET,
} from '../constants/mintNFT';
import { EMPTY_VALUES_SET } from '../constants/account';
import { suffixOptions } from '../utils/defaultOptions';
import {
    COLLECTIONS_FETCH_ERROR,
    COLLECTIONS_FETCH_IN_PROGRESS,
    COLLECTIONS_FETCH_SUCCESS,
    CREATE_COLLECTION_IMAGE_URL_SET,
    SCHEMA_VALUES_SET,
} from '../constants/collections';
import { TX_HASH_FETCH_SUCCESS, TX_HASH_IN_PROGRESS_FALSE_SET } from '../constants/wallet';

const assetTitle = (state = {
    value: '',
    valid: true,
}, action) => {
    switch (action.type) {
    case ASSET_TITLE_SET:
        return {
            value: action.value,
            valid: action.valid,
        };
    case EMPTY_VALUES_SET:
        return {
            ...state,
            value: '',
        };
    default:
        return state;
    }
};

const description = (state = {
    value: '',
    valid: true,
}, action) => {
    switch (action.type) {
    case DESCRIPTION_SET:
        return {
            value: action.value,
            valid: action.valid,
        };
    case EMPTY_VALUES_SET:
        return {
            ...state,
            value: '',
        };
    default:
        return state;
    }
};

const collection = (state = {
    value: null,
    options: [],
    inProgress: false,
}, action) => {
    switch (action.type) {
    case COLLECTION_SET:
        return {
            ...state,
            value: action.value,
        };
    case COLLECTIONS_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case COLLECTIONS_FETCH_SUCCESS:
        return {
            ...state,
            inProgress: false,
            options: action.value,
        };
    case COLLECTIONS_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    case EMPTY_VALUES_SET:
        return {
            ...state,
            value: null,
        };
    default:
        return state;
    }
};

const transferStatus = (state = true, action) => {
    switch (action.type) {
    case TRANSFER_STATUS_SET:
        return action.value;
    case TX_HASH_FETCH_SUCCESS:
    case TX_HASH_IN_PROGRESS_FALSE_SET:
    case EMPTY_VALUES_SET:
        return true;
    default:
        return state;
    }
};

const extensibleStatus = (state = true, action) => {
    switch (action.type) {
    case EXTENSIBLE_STATUS_SET:
        return action.value;
    case TX_HASH_FETCH_SUCCESS:
    case TX_HASH_IN_PROGRESS_FALSE_SET:
    case EMPTY_VALUES_SET:
        return true;
    default:
        return state;
    }
};

const nsfwStatus = (state = false, action) => {
    switch (action.type) {
    case NSFW_STATUS_SET:
        return action.value;
    case TX_HASH_FETCH_SUCCESS:
    case TX_HASH_IN_PROGRESS_FALSE_SET:
    case EMPTY_VALUES_SET:
        return false;
    default:
        return state;
    }
};

const royaltyShare = (state = {
    status: false,
    value: '',
}, action) => {
    switch (action.type) {
    case ROYALTY_SHARE_STATUS_SET:
        return {
            ...state,
            status: action.value,
        };
    case ROYALTY_SHARE_SET:
        return {
            ...state,
            value: action.value,
        };
    case TX_HASH_FETCH_SUCCESS:
    case TX_HASH_IN_PROGRESS_FALSE_SET:
    case EMPTY_VALUES_SET:
        return {
            status: false,
            value: '',
        };
    default:
        return state;
    }
};

const bulkMint = (state = {
    show: false,
}, action) => {
    switch (action.type) {
    case BULK_MINT_SET:
        return {
            show: action.show,
        };
    case EMPTY_VALUES_SET:
        return {
            show: false,
        };
    default:
        return state;
    }
};

const suffix = (state = {
    value: {
        name: 'No Suffix',
        value: null,
    },
    options: suffixOptions,
    count: null,
    countValid: true,
}, action) => {
    switch (action.type) {
    case SUFFIX_VALUE_SET:
        return {
            ...state,
            value: action.value,
        };
    case SUFFIX_COUNT_SET:
        return {
            ...state,
            count: action.value,
            countValid: action.valid,
        };
    case EMPTY_VALUES_SET:
        return {
            ...state,
            value: {
                name: 'No Suffix',
                value: null,
            },
            count: null,
        };
    default:
        return state;
    }
};

const mediaURL = (state = {
    value: '',
}, action) => {
    switch (action.type) {
    case MEDIA_URL_SET:
        return {
            ...state,
            value: action.value,
        };
    case EMPTY_VALUES_SET:
        return {
            value: '',
        };
    default:
        return state;
    }
};

const previewURL = (state = {
    value: '',
}, action) => {
    switch (action.type) {
    case PREVIEW_URL_SET:
        return {
            ...state,
            value: action.value,
        };
    case CREATE_COLLECTION_IMAGE_URL_SET: {
        return {
            ...state,
            value: action.value,
        };
    }
    case EMPTY_VALUES_SET:
        return {
            value: '',
        };

    default:
        return state;
    }
};

const whiteListValue = (state = [], action) => {
    switch (action.type) {
    case WHITELIST_VALUE_SET:
        return action.value;
    case EMPTY_VALUES_SET:
        return [];
    default:
        return state;
    }
};

const mintNFTConfirmDialog = (state = {
    open: false,
    value: {},
}, action) => {
    switch (action.type) {
    case MINT_NFT_CONFIRM_DIALOG_SHOW:
        return {
            open: true,
            value: action.value,
        };
    case MINT_NFT_CONFIRM_DIALOG_HIDE:
        return {
            open: false,
            value: {},
        };
    default:
        return state;
    }
};

const schemaValues = (state = {
    value: {},
    valid: true,
}, action) => {
    switch (action.type) {
    case SCHEMA_VALUES_SET:
        return {
            value: action.value,
            valid: action.valid,
        };
    case EMPTY_VALUES_SET:
        return {
            ...state,
            value: {},
        };
    default:
        return state;
    }
};

export default combineReducers({
    assetTitle,
    description,
    collection,
    transferStatus,
    extensibleStatus,
    nsfwStatus,
    royaltyShare,
    bulkMint,
    suffix,
    mediaURL,
    previewURL,
    whiteListValue,
    mintNFTConfirmDialog,
    schemaValues,
});
