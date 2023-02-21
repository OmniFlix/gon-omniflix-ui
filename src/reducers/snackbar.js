import { MESSAGE_SHOW, SNACKBAR_HIDE } from '../constants/snackbar';
import { CONNECT_BC_ACCOUNT_ERROR, VERIFY_ACCOUNT_ERROR } from '../constants/account';
import {
    CONNECT_KEPLR_ACCOUNT_ERROR,
    TX_HASH_FETCH_ERROR,
    TX_HASH_FETCH_SUCCESS,
    TX_SIGN_AND_BROAD_CAST_ERROR,
    TX_SIGN_AND_BROAD_CAST_SUCCESS,
    TX_SIGN_ERROR,
} from '../constants/wallet';

const snackbar = (state = {
    open: false,
    message: '',
    explorer: null,
}, action) => {
    switch (action.type) {
    case VERIFY_ACCOUNT_ERROR:
    case TX_SIGN_AND_BROAD_CAST_ERROR:
    case TX_SIGN_ERROR:
    case TX_SIGN_AND_BROAD_CAST_SUCCESS:
    case TX_HASH_FETCH_SUCCESS:
    case TX_HASH_FETCH_ERROR:
    case CONNECT_BC_ACCOUNT_ERROR:
    case CONNECT_KEPLR_ACCOUNT_ERROR:
    case MESSAGE_SHOW:
        return {
            open: true,
            message: action.message,
            variant: action.variant,
            hash: action.hash,
            explorer: action.explorer ? action.explorer : null,
        };
    case SNACKBAR_HIDE:
        return {
            open: false,
            message: '',
            variant: '',
            hash: '',
        };
    default:
        return state;
    }
};

export default snackbar;
