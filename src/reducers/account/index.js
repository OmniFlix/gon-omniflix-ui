import { combineReducers } from 'redux';
import BCDetails from './BCDetails';
import wallet from './wallet';

export default combineReducers({
    wallet,
    bc: BCDetails,
});
