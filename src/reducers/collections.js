import { combineReducers } from 'redux';
import {
    COLLECTIONS_FETCH_ERROR,
    COLLECTIONS_FETCH_IN_PROGRESS,
    COLLECTIONS_FETCH_SUCCESS,
} from '../constants/collections';

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

export default combineReducers({
    collectionSList,
});
