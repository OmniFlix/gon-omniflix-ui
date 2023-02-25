import { combineReducers } from 'redux';
import {
    BURN_DIALOG_HIDE,
    BURN_DIALOG_SHOW,
    BURN_FAIL_SET,
    BURN_SUCCESS_SET,
    CHAIN_ID_SET,
    CLASS_TRACE_FETCH_ERROR,
    CLASS_TRACE_FETCH_IN_PROGRESS,
    CLASS_TRACE_FETCH_SUCCESS,
    COLLECTION_NFT_S_FETCH_ERROR,
    COLLECTION_NFT_S_FETCH_IN_PROGRESS,
    COLLECTION_NFT_S_FETCH_SUCCESS,
    NFT_ID_SET,
    TRANSFER_ADDRESS_SET,
    TRANSFER_DIALOG_HIDE,
    TRANSFER_DIALOG_SHOW,
    TRANSFER_FAIL_SET,
    TRANSFER_SUCCESS_SET,
} from '../constants/collection';
import { CLEAR_COLLECTION_SET } from '../constants/collections';

const collection = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case COLLECTION_NFT_S_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case COLLECTION_NFT_S_FETCH_SUCCESS: {
        return {
            ...state,
            inProgress: false,
            value: action.value,
        };
    }
    case COLLECTION_NFT_S_FETCH_ERROR:
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

const transferDialog = (state = {
    open: false,
    value: {},
    success: false,
    fail: false,
    hash: '',
}, action) => {
    switch (action.type) {
    case TRANSFER_DIALOG_SHOW:
        return {
            ...state,
            open: true,
            value: action.value,
        };
    case TRANSFER_SUCCESS_SET:
        return {
            ...state,
            success: true,
            hash: action.hash,
        };
    case TRANSFER_FAIL_SET:
        return {
            ...state,
            fail: true,
        };
    case TRANSFER_DIALOG_HIDE:
        return {
            open: false,
            value: {},
            success: false,
            fail: false,
            hash: '',
        };
    default:
        return state;
    }
};

const burnDialog = (state = {
    open: false,
    value: {},
    success: false,
    fail: false,
    hash: '',
}, action) => {
    switch (action.type) {
    case BURN_DIALOG_SHOW:
        return {
            ...state,
            open: true,
            value: action.value,
        };
    case BURN_SUCCESS_SET:
        return {
            ...state,
            success: true,
            hash: action.hash,
        };
    case BURN_FAIL_SET:
        return {
            ...state,
            fail: true,
        };
    case BURN_DIALOG_HIDE:
        return {
            open: false,
            value: {},
            success: false,
            fail: false,
            hash: '',
        };
    default:
        return state;
    }
};

const chainID = (state = 'omniflix', action) => {
    switch (action.type) {
    case CHAIN_ID_SET:
        return action.value;
    default:
        return state;
    }
};

const address = (state = '', action) => {
    switch (action.type) {
    case TRANSFER_ADDRESS_SET:
        return action.value;
    default:
        return state;
    }
};

const nftID = (state = '', action) => {
    switch (action.type) {
    case NFT_ID_SET:
        return action.value;
    default:
        return state;
    }
};

const classTrace = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case CLASS_TRACE_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case CLASS_TRACE_FETCH_SUCCESS: {
        const obj = { ...state.value };
        if (action.hash) {
            obj[action.hash] = action.value;
        }

        return {
            ...state,
            inProgress: false,
            value: obj,
        };
    }
    case CLASS_TRACE_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

export default combineReducers({
    collection,
    transferDialog,
    burnDialog,
    chainID,
    address,
    nftID,
    classTrace,
});
