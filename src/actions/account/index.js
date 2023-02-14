import {
    ACCESS_TOKEN_FETCH_ERROR,
    ACCESS_TOKEN_FETCH_IN_PROGRESS,
    ACCESS_TOKEN_FETCH_SUCCESS,
    ACCOUNT_SIGN_IN_PROGRESS_SET,
    CONNECT_BC_ACCOUNT_ERROR,
    CONNECT_BC_ACCOUNT_IN_PROGRESS,
    CONNECT_BC_ACCOUNT_SUCCESS,
    EMPTY_VALUES_SET,
    VERIFY_ACCOUNT_ERROR,
    VERIFY_ACCOUNT_IN_PROGRESS,
    VERIFY_ACCOUNT_SUCCESS,
} from '../../constants/account';
import Axios from 'axios';
import { ACCESS_TOKEN_URL, CONNECT_ACCOUNT_URL, urlVerifyAccount } from '../../constants/url';

const connectBCAccountInProgress = () => {
    return {
        type: CONNECT_BC_ACCOUNT_IN_PROGRESS,
    };
};

const connectBCAccountSuccess = (value) => {
    return {
        type: CONNECT_BC_ACCOUNT_SUCCESS,
        value,
    };
};

const connectBCAccountError = (message) => {
    return {
        type: CONNECT_BC_ACCOUNT_ERROR,
        message,
        variant: 'error',
    };
};

export const setAccountInProgress = (value) => {
    return {
        type: ACCOUNT_SIGN_IN_PROGRESS_SET,
        value,
    };
};

export const connectBCAccount = (data, cb) => (dispatch) => {
    dispatch(connectBCAccountInProgress());

    Axios.post(CONNECT_ACCOUNT_URL, data, {
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    })
        .then((res) => {
            dispatch(connectBCAccountSuccess(res.data.result));
            cb(res.data.result);
        })
        .catch((error) => {
            dispatch(connectBCAccountError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
            cb(null);
        });
};

const verifyAccountInProgress = () => {
    return {
        type: VERIFY_ACCOUNT_IN_PROGRESS,
    };
};

const verifyAccountSuccess = (message, value) => {
    return {
        type: VERIFY_ACCOUNT_SUCCESS,
        message,
        value,
    };
};

const verifyAccountError = (message) => {
    return {
        type: VERIFY_ACCOUNT_ERROR,
        message,
        variant: 'error',
    };
};

export const verifyAccount = (userId, data, cb) => (dispatch) => {
    dispatch(verifyAccountInProgress());

    const url = urlVerifyAccount(userId);
    Axios.post(url, data, {
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    })
        .then((res) => {
            dispatch(verifyAccountSuccess('Success', res.data && res.data.result['acToken_gon_of']));
            localStorage.setItem('acToken_of_studio', res.data && res.data.result['acToken_gon_of']);
            localStorage.setItem('rfToken_of_studio', res.data && res.data.result['refresh_gon_of']);
            cb(null);
        })
        .catch((error) => {
            dispatch(verifyAccountError(
                error.response &&
                error.response.data &&
                error.response.data.message &&
                error.response.data.message.message
                    ? error.response.data.message.message
                    : error.response.data.message
                        ? error.response.data.message
                        : 'Failed!',
            ));
            cb(error);
        });
};

const fetchAccessTokenInProgress = () => {
    return {
        type: ACCESS_TOKEN_FETCH_IN_PROGRESS,
    };
};

const fetchAccessTokenSuccess = (message, value) => {
    return {
        type: ACCESS_TOKEN_FETCH_SUCCESS,
        message,
        value,
    };
};

const fetchAccessTokenError = (message) => {
    return {
        type: ACCESS_TOKEN_FETCH_ERROR,
        message,
    };
};

export const fetchAccessToken = (cb) => (dispatch) => {
    dispatch(fetchAccessTokenInProgress());

    const data = {
        refreshToken: localStorage.getItem('rfToken_of_studio'),
    };

    Axios.post(ACCESS_TOKEN_URL, data, {
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    })
        .then((res) => {
            localStorage.setItem('acToken_of_studio', res.data && res.data.result['acToken_gon_of']);
            localStorage.setItem('rfToken_of_studio', res.data && res.data.result['refresh_gon_of']);
            dispatch(fetchAccessTokenSuccess('Success', res.data && res.data.result['acToken_gon_of']));
            cb(null);
        })
        .catch((error) => {
            dispatch(fetchAccessTokenError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
            cb(error);
        });
};

export const setEmptyValue = () => {
    return {
        type: EMPTY_VALUES_SET,
    };
};
