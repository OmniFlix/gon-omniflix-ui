import { combineReducers } from 'redux';
import BCDetails from './BCDetails';
import wallet from './wallet';
import {
    ACCESS_TOKEN_FETCH_ERROR,
    ACCESS_TOKEN_FETCH_IN_PROGRESS,
    ACCESS_TOKEN_FETCH_SUCCESS,
    ACCOUNT_SIGN_IN_PROGRESS_SET,
    CONNECT_BC_ACCOUNT_ERROR,
    CONNECT_BC_ACCOUNT_IN_PROGRESS,
    CONNECT_BC_ACCOUNT_SUCCESS,
    VERIFY_ACCOUNT_ERROR,
    VERIFY_ACCOUNT_IN_PROGRESS,
    VERIFY_ACCOUNT_SUCCESS,
} from '../../constants/account';

const connect = (state = false, action) => {
    switch (action.type) {
    case CONNECT_BC_ACCOUNT_IN_PROGRESS:
    case VERIFY_ACCOUNT_IN_PROGRESS:
        return true;
    case CONNECT_BC_ACCOUNT_ERROR:
    case CONNECT_BC_ACCOUNT_SUCCESS:
    case VERIFY_ACCOUNT_ERROR:
    case VERIFY_ACCOUNT_SUCCESS:
        return false;
    case ACCOUNT_SIGN_IN_PROGRESS_SET:
        return action.value;
    default:
        return state;
    }
};

const token = (state = {
    inProgress: false,
    value: localStorage.getItem('acToken_gon_of'),
}, action) => {
    switch (action.type) {
    case ACCESS_TOKEN_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case ACCESS_TOKEN_FETCH_SUCCESS:
    case VERIFY_ACCOUNT_SUCCESS:
        return {
            inProgress: false,
            value: action.value,
        };
    case ACCESS_TOKEN_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

export default combineReducers({
    connect,
    token,
    wallet,
    bc: BCDetails,
});
