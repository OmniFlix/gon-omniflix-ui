import { combineReducers } from 'redux';
import {
    COLLECTION_NFT_S_FETCH_ERROR,
    COLLECTION_NFT_S_FETCH_IN_PROGRESS,
    COLLECTION_NFT_S_FETCH_SUCCESS,
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

export default combineReducers({
    collection,
});
