import { combineReducers } from 'redux';
import {
    CONNECT_KEPLR_ACCOUNT_ERROR,
    CONNECT_KEPLR_ACCOUNT_IN_PROGRESS,
    CONNECT_KEPLR_ACCOUNT_SUCCESS,
    CONTRACT_SIGN_ERROR,
    CONTRACT_SIGN_IN_PROGRESS,
    CONTRACT_SIGN_SUCCESS,
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
    case CONTRACT_SIGN_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case TX_SIGN_SUCCESS:
    case CONTRACT_SIGN_SUCCESS:
        return {
            inProgress: false,
            value: action.value,
        };
    case TX_SIGN_ERROR:
    case CONTRACT_SIGN_ERROR:
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
    signTx,
});
