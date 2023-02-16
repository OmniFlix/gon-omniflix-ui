import {
    TIMEOUT_HEIGHT_FETCH_ERROR,
    TIMEOUT_HEIGHT_FETCH_IN_PROGRESS,
    TIMEOUT_HEIGHT_FETCH_SUCCESS,
} from '../../constants/IBCTokens';
import { combineReducers } from 'redux';

const timeoutHeight = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case TIMEOUT_HEIGHT_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case TIMEOUT_HEIGHT_FETCH_SUCCESS:
        return {
            inProgress: false,
            value: action.value,
        };
    case TIMEOUT_HEIGHT_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

export default combineReducers({
    timeoutHeight,
});
