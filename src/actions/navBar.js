import {
    CLAIM_FAUCET_DIALOG_HIDE,
    CLAIM_FAUCET_DIALOG_SHOW,
    FAUCET_BALANCE_ADD_ERROR,
    FAUCET_BALANCE_ADD_IN_PROGRESS,
    FAUCET_BALANCE_ADD_SUCCESS,
    FAUCET_CLAIM_FETCH_ERROR,
    FAUCET_CLAIM_FETCH_IN_PROGRESS,
    FAUCET_CLAIM_FETCH_SUCCESS,
    FAUCET_SUCCESS_SET,
    NAV_TABS_SET,
} from '../constants/navBar';
import Axios from 'axios';
import { urlAddFaucet, urlClaimFaucet } from '../constants/url';

export const setNavTabs = (value) => {
    return {
        type: NAV_TABS_SET,
        value,
    };
};

export const showClaimFaucetDialog = (value) => {
    return {
        type: CLAIM_FAUCET_DIALOG_SHOW,
        value,
    };
};

export const hideClaimFaucetDialog = () => {
    return {
        type: CLAIM_FAUCET_DIALOG_HIDE,
    };
};

export const setFaucetSuccess = () => {
    return {
        type: FAUCET_SUCCESS_SET,
    };
};

const fetchFaucetClaimInProgress = () => {
    return {
        type: FAUCET_CLAIM_FETCH_IN_PROGRESS,
    };
};

const fetchFaucetClaimSuccess = (value, message) => {
    return {
        type: FAUCET_CLAIM_FETCH_SUCCESS,
        value,
        message,
        variant: 'success',
    };
};

const fetchFaucetClaimError = (message) => {
    return {
        type: FAUCET_CLAIM_FETCH_ERROR,
        message,
    };
};

export const fetchFaucetClaim = (address) => (dispatch) => {
    dispatch(fetchFaucetClaimInProgress());

    const url = urlClaimFaucet(address);
    Axios.get(url, {
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    })
        .then((res) => {
            dispatch(fetchFaucetClaimSuccess(res.data, 'success'));
        })
        .catch((error) => {
            dispatch(fetchFaucetClaimError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
        });
};

const addFaucetBalanceInProgress = () => {
    return {
        type: FAUCET_BALANCE_ADD_IN_PROGRESS,
    };
};

const addFaucetBalanceSuccess = (message) => {
    return {
        type: FAUCET_BALANCE_ADD_SUCCESS,
        message,
        variant: 'success',
    };
};

const addFaucetBalanceError = (message) => {
    return {
        type: FAUCET_BALANCE_ADD_ERROR,
        message,
        variant: 'error',
    };
};

export const addFaucetBalance = (address, cb) => (dispatch) => {
    dispatch(addFaucetBalanceInProgress());

    const url = urlAddFaucet(address);
    Axios.get(url, {
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    })
        .then((res) => {
            dispatch(addFaucetBalanceSuccess('Success'));
            cb(null);
        })
        .catch((error) => {
            dispatch(addFaucetBalanceError(
                error.response &&
                error.response.data &&
                error.response.data.error
                    ? error.response.data.error
                    : error.response &&
                    error.response.data &&
                    error.response.data.message
                        ? error.response.data.message
                        : 'Failed!',
            ));
            cb(error);
        });
};
