import { combineReducers } from 'redux';
import {
    GQL_ALL_COLLECTIONS_FETCH_ERROR,
    GQL_ALL_COLLECTIONS_FETCH_IN_PROGRESS,
    GQL_ALL_COLLECTIONS_FETCH_SUCCESS,
} from '../../constants/collections.gql';

const allCollectionSList = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case GQL_ALL_COLLECTIONS_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case GQL_ALL_COLLECTIONS_FETCH_SUCCESS: {
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
    case GQL_ALL_COLLECTIONS_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

export default combineReducers({
    allCollectionSList,
});
