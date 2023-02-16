import {
    TIMEOUT_HEIGHT_FETCH_ERROR,
    TIMEOUT_HEIGHT_FETCH_IN_PROGRESS,
    TIMEOUT_HEIGHT_FETCH_SUCCESS,
} from '../../constants/IBCTokens';
import Axios from 'axios';
import { urlFetchTimeoutHeight } from '../../constants/url';

const fetchTimeoutHeightInProgress = () => {
    return {
        type: TIMEOUT_HEIGHT_FETCH_IN_PROGRESS,
    };
};

const fetchTimeoutHeightSuccess = (value) => {
    return {
        type: TIMEOUT_HEIGHT_FETCH_SUCCESS,
        value,
    };
};

const fetchTimeoutHeightError = (message) => {
    return {
        type: TIMEOUT_HEIGHT_FETCH_ERROR,
        message,
    };
};

export const fetchTimeoutHeight = (URL, channel, cb) => (dispatch) => {
    dispatch(fetchTimeoutHeightInProgress());

    const url = urlFetchTimeoutHeight(URL, channel);
    Axios.get(url, {
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    })
        .then((res) => {
            dispatch(fetchTimeoutHeightSuccess(res.data));
            cb(res.data);
        })
        .catch((error) => {
            dispatch(fetchTimeoutHeightError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
            cb(null);
        });
};
