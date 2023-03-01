import { combineReducers } from 'redux';
import { CONTRACTS_FETCH_ERROR, CONTRACTS_FETCH_IN_PROGRESS, CONTRACTS_FETCH_SUCCESS } from '../constants/cosmwasm';

const contracts = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case CONTRACTS_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case CONTRACTS_FETCH_SUCCESS: {
        if (action.chain) {
            return {
                ...state,
                inProgress: false,
                value: {
                    ...state.value,
                    [action.chain]: {
                        value: action.value,
                    },
                },
            };
        }

        return {
            ...state,
            inProgress: false,
        };
    }
    case CONTRACTS_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

export default combineReducers({
    contracts,
});
