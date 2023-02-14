import { combineReducers } from 'redux';
import { CHAIN_VALUE_SET, SEARCH_VALUE_SET, TAB_VALUE_SET } from '../constants/home';

const chainValue = (state = {
    value: 'Cosmos',
}, action) => {
    switch (action.type) {
    case CHAIN_VALUE_SET:
        return {
            ...state,
            value: action.value,
        };

    default:
        return state;
    }
};

const tabValue = (state = {
    value: 'collections',
}, action) => {
    switch (action.type) {
    case TAB_VALUE_SET:
        return {
            ...state,
            value: action.value,
        };

    default:
        return state;
    }
};

const searchValue = (state = {
    value: '',
}, action) => {
    switch (action.type) {
    case SEARCH_VALUE_SET:
        return {
            ...state,
            value: action.value,
        };

    default:
        return state;
    }
};

export default combineReducers({
    chainValue,
    tabValue,
    searchValue,
});
