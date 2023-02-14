import { combineReducers } from 'redux';
import language from './language';
import snackbar from './snackbar';
import account from './account';
import home from './home';

export default combineReducers({
    account,
    language,
    snackbar,
    home,
});
