import { combineReducers } from 'redux';
import {
    BURN_DIALOG_HIDE,
    BURN_DIALOG_SHOW,
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
} from '../constants/collection';
import { DEFAULT_LIMIT, DEFAULT_SKIP, DEFAULT_TOTAL } from '../config';

const collection = (state = {
    inProgress: false,
    value: {},
    skip: DEFAULT_SKIP,
    limit: DEFAULT_LIMIT,
    total: DEFAULT_TOTAL,
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
            skip: action.skip,
            limit: action.limit,
            total: action.total,
        };
    }
    case COLLECTION_NFT_S_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const transferDialog = (state = {
    open: false,
}, action) => {
    switch (action.type) {
    case TRANSFER_DIALOG_SHOW:
        return {
            open: true,
        };

    case TRANSFER_DIALOG_HIDE:
        return {
            open: false,
        };

    default:
        return state;
    }
};

const burnDialog = (state = {
    open: false,
}, action) => {
    switch (action.type) {
    case BURN_DIALOG_SHOW:
        return {
            open: true,
        };

    case BURN_DIALOG_HIDE:
        return {
            open: false,
        };

    default:
        return state;
    }
};

const chainID = (state = 'OmniFlix Hub', action) => {
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
