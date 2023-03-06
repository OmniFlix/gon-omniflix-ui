import { combineReducers } from 'redux';
import {
    CONNECT_IBC_KEPLR_ACCOUNT_ERROR,
    CONNECT_IBC_KEPLR_ACCOUNT_IN_PROGRESS,
    CONNECT_IBC_KEPLR_ACCOUNT_SUCCESS,
    CONNECT_KEPLR_ACCOUNT_ERROR,
    CONNECT_KEPLR_ACCOUNT_IN_PROGRESS,
    CONNECT_KEPLR_ACCOUNT_SUCCESS,
    DISCONNECT_SET,
    KEPLR_ACCOUNT_KEYS_SET,
    TX_SIGN_AND_BROAD_CAST_ERROR,
    TX_SIGN_AND_BROAD_CAST_IN_PROGRESS,
    TX_SIGN_AND_BROAD_CAST_SUCCESS,
    TX_SIGN_ERROR,
    TX_SIGN_IN_PROGRESS,
    TX_SIGN_SUCCESS,
} from '../../constants/wallet';

const connection = (state = {
    inProgress: false,
    address: '',
    keys: {},
}, action) => {
    switch (action.type) {
    case CONNECT_KEPLR_ACCOUNT_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case CONNECT_KEPLR_ACCOUNT_SUCCESS:
        return {
            ...state,
            inProgress: false,
            address: action.value && action.value.length &&
                action.value[0] && action.value[0].address,
        };
    case CONNECT_KEPLR_ACCOUNT_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    case KEPLR_ACCOUNT_KEYS_SET:
        return {
            ...state,
            keys: action.value,
        };
    case DISCONNECT_SET:
        return {
            ...state,
            address: '',
        };
    default:
        return state;
    }
};

const connectionIBC = (state = {
    inProgress: false,
    address: {},
}, action) => {
    switch (action.type) {
    case CONNECT_IBC_KEPLR_ACCOUNT_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case CONNECT_IBC_KEPLR_ACCOUNT_SUCCESS:
        return {
            ...state,
            inProgress: false,
            address: {
                ...state.address,
                [action.chain]: action.value && action.value.length &&
                action.value[0] && action.value[0].address,
            },
        };
    case CONNECT_IBC_KEPLR_ACCOUNT_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    case DISCONNECT_SET:
        return {
            ...state,
            address: '',
        };
    default:
        return state;
    }
};

const broadCast = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case TX_SIGN_AND_BROAD_CAST_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case TX_SIGN_AND_BROAD_CAST_SUCCESS:
        return {
            inProgress: false,
            value: action.value,
        };
    case TX_SIGN_AND_BROAD_CAST_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const signTx = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case TX_SIGN_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case TX_SIGN_SUCCESS:
        return {
            inProgress: false,
            value: action.value,
        };
    case TX_SIGN_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

export default combineReducers({
    broadCast,
    connection,
    connectionIBC,
    signTx,
});
