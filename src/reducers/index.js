import { combineReducers } from 'redux';
import language from './language';
import snackbar from './snackbar';
import account from './account';
import nfts from './nfts';
import collections from './collections';
import dashboard from './dashboard';
import navBar from './navBar';

export default combineReducers({
    account,
    language,
    snackbar,
    nfts,
    collections,
    dashboard,
    navBar,
});
