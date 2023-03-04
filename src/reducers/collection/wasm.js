import { CLEAR_COLLECTION_SET } from '../../constants/collections';
import { combineReducers } from 'redux';
import {
    WASM_COLLECTION_FETCH_ERROR,
    WASM_COLLECTION_FETCH_IN_PROGRESS,
    WASM_COLLECTION_FETCH_SUCCESS,
    WASM_COLLECTION_HASH_FETCH_ERROR,
    WASM_COLLECTION_HASH_FETCH_IN_PROGRESS,
    WASM_COLLECTION_HASH_FETCH_SUCCESS,
    WASM_COLLECTION_NFT_S_FETCH_ERROR,
    WASM_COLLECTION_NFT_S_FETCH_IN_PROGRESS,
    WASM_COLLECTION_NFT_S_FETCH_SUCCESS,
    WASM_NFT_INFO_FETCH_ERROR,
    WASM_NFT_INFO_FETCH_IN_PROGRESS,
    WASM_NFT_INFO_FETCH_SUCCESS,
} from '../../constants/collection/wasm';
import { COLLECTION_INFO_CLEAR } from '../../constants/collection';

const collection = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case WASM_COLLECTION_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case WASM_COLLECTION_FETCH_SUCCESS: {
        return {
            ...state,
            inProgress: false,
            value: action.value,
        };
    }
    case WASM_COLLECTION_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const nfts = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case WASM_COLLECTION_NFT_S_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case WASM_COLLECTION_NFT_S_FETCH_SUCCESS: {
        return {
            ...state,
            inProgress: false,
            value: action.value,
        };
    }
    case WASM_COLLECTION_NFT_S_FETCH_ERROR:
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

const nftsInfo = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case WASM_NFT_INFO_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case WASM_NFT_INFO_FETCH_SUCCESS: {
        if (action.nftID) {
            return {
                ...state,
                inProgress: false,
                value: {
                    ...state.value,
                    [action.nftID]: action.value,
                },
            };
        }

        return {
            ...state,
            inProgress: false,
        };
    }
    case WASM_NFT_INFO_FETCH_ERROR:
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

const collectionHash = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case WASM_COLLECTION_HASH_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case WASM_COLLECTION_HASH_FETCH_SUCCESS: {
        if (action.chain) {
            return {
                ...state,
                inProgress: false,
                value: {
                    ...state.value,
                    [action.chain]: action.value,
                },
            };
        }

        return {
            ...state,
            inProgress: false,
        };
    }
    case WASM_COLLECTION_HASH_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    case CLEAR_COLLECTION_SET:
    case COLLECTION_INFO_CLEAR:
        return {
            ...state,
            value: {},
        };

    default:
        return state;
    }
};

export default combineReducers({
    collection,
    nfts,
    nftsInfo,
    collectionHash,
});
