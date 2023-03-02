import { combineReducers } from 'redux';
import {
    WASM_ALL_COLLECTIONS_FETCH_ERROR,
    WASM_ALL_COLLECTIONS_FETCH_IN_PROGRESS,
    WASM_ALL_COLLECTIONS_FETCH_SUCCESS,
} from '../../constants/collections/wasm';

const allCollectionSList = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case WASM_ALL_COLLECTIONS_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case WASM_ALL_COLLECTIONS_FETCH_SUCCESS: {
        if (action.chain) {
            return {
                ...state,
                inProgress: false,
                value: {
                    ...state.value,
                    [action.chain]: {
                        ...state.value && state.value[action.chain],
                        [action.contract]: action.value,
                    },
                },
            };
        }

        return {
            ...state,
            inProgress: false,
        };
    }
    case WASM_ALL_COLLECTIONS_FETCH_ERROR:
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
