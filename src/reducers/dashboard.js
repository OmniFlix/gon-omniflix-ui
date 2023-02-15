import { combineReducers } from 'redux';
import { CHAIN_VALUE_SET, TAB_VALUE_SET } from '../constants/dashboard';

const chainValue = (state = {
    value: 'omniflix',
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
    value: 'nfts',
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

export default combineReducers({
    chainValue,
    tabValue,
});
