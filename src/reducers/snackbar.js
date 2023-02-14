import { MESSAGE_SHOW, SNACKBAR_HIDE } from '../constants/snackbar';

const snackbar = (state = {
    open: false,
    message: '',
}, action) => {
    switch (action.type) {
    case MESSAGE_SHOW:
        return {
            open: true,
            message: action.message,
        };
    case SNACKBAR_HIDE:
        return {
            open: false,
            message: '',
        };
    default:
        return state;
    }
};

export default snackbar;
