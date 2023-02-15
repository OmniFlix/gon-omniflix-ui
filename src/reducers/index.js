import { combineReducers } from 'redux';
import language from './language';
import snackbar from './snackbar';
import account from './account';
import nfts from './nfts';
import collections from './collections';
import home from './home';
import navBar from './navBar';

export default combineReducers({
    account,
    language,
    snackbar,
    nfts,
    collections,
    home,
    navBar,
});
