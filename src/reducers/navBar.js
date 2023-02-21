import { combineReducers } from 'redux';
import {
    CLAIM_FAUCET_DIALOG_HIDE,
    CLAIM_FAUCET_DIALOG_SHOW,
    FAUCET_BALANCE_ADD_ERROR,
    FAUCET_BALANCE_ADD_IN_PROGRESS,
    FAUCET_BALANCE_ADD_SUCCESS,
    FAUCET_CLAIM_FETCH_ERROR,
    FAUCET_CLAIM_FETCH_IN_PROGRESS,
    FAUCET_CLAIM_FETCH_SUCCESS, FAUCET_SUCCESS_SET,
    NAV_TABS_SET,
} from '../constants/navBar';

const tabValue = (state = {
    value: 'about',
}, action) => {
    switch (action.type) {
    case NAV_TABS_SET:
        return {
            ...state,
            value: action.value,
        };

    default:
        return state;
    }
};

const claimFaucetDialog = (state = {
    open: false,
}, action) => {
    switch (action.type) {
    case CLAIM_FAUCET_DIALOG_SHOW:
        return {
            open: true,
        };
    case CLAIM_FAUCET_DIALOG_HIDE:
    case FAUCET_SUCCESS_SET:
        return {
            open: false,
        };

    default:
        return state;
    }
};

const claimFaucet = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case FAUCET_CLAIM_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case FAUCET_CLAIM_FETCH_SUCCESS:
        return {
            inProgress: false,
            value: action.value,
        };
    case FAUCET_CLAIM_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const faucetDialog = (state = {
    success: false,
    inProgress: false,
}, action) => {
    switch (action.type) {
    case FAUCET_BALANCE_ADD_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case FAUCET_BALANCE_ADD_SUCCESS:
    case FAUCET_BALANCE_ADD_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    case FAUCET_SUCCESS_SET:
        return {
            ...state,
            success: true,
        };
    default:
        return state;
    }
};

export default combineReducers({
    tabValue,
    claimFaucetDialog,
    claimFaucet,
    faucetDialog,
});
