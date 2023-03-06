import { MESSAGE_SHOW, SNACKBAR_HIDE } from '../constants/snackbar';
import {
    CONNECT_KEPLR_ACCOUNT_ERROR, CONTRACT_SIGN_ERROR,
    TX_HASH_FETCH_SUCCESS,
    TX_SIGN_AND_BROAD_CAST_ERROR,
    TX_SIGN_AND_BROAD_CAST_SUCCESS,
    TX_SIGN_ERROR,
} from '../constants/wallet';
import { FAUCET_BALANCE_ADD_SUCCESS, FAUCET_CLAIM_FETCH_ERROR, FAUCET_CLAIM_FETCH_SUCCESS } from '../constants/navBar';
import { TIMEOUT_HEIGHT_FETCH_ERROR } from '../constants/IBCTokens';

const snackbar = (state = {
    open: false,
    message: '',
    explorer: null,
}, action) => {
    switch (action.type) {
    case FAUCET_BALANCE_ADD_SUCCESS:
    case FAUCET_CLAIM_FETCH_ERROR:
    case FAUCET_CLAIM_FETCH_SUCCESS:
    case TX_SIGN_AND_BROAD_CAST_ERROR:
    case TX_SIGN_ERROR:
    case TX_SIGN_AND_BROAD_CAST_SUCCESS:
    case TX_HASH_FETCH_SUCCESS:
    case CONNECT_KEPLR_ACCOUNT_ERROR:
    case TIMEOUT_HEIGHT_FETCH_ERROR:
    case CONTRACT_SIGN_ERROR:
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
