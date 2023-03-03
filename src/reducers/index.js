import { combineReducers } from 'redux';
import language from './language';
import snackbar from './snackbar';
import account from './account';
import collections from './collections';
import dashboard from './dashboard';
import navBar from './navBar';
import collection from './collection';
import mintNFT from './mintNFT';
import query from './query';
import cosmwasm from './cosmwasm';
import nfts from './nfts';

export default combineReducers({
    account,
    language,
    snackbar,
    collections,
    dashboard,
    navBar,
    collection,
    mintNFT,
    query,
    cosmwasm,
    nfts,
});
