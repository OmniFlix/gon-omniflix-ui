import { combineReducers } from 'redux';
import { RPC_CLIENT_ERROR, RPC_CLIENT_IN_PROGRESS, RPC_CLIENT_SUCCESS } from '../constants/query';

const rpcClient = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case RPC_CLIENT_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case RPC_CLIENT_SUCCESS: {
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
    case RPC_CLIENT_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

export default combineReducers({
    rpcClient,
});
