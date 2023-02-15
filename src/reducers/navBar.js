import { combineReducers } from 'redux';
import { NAV_TABS_SET } from '../constants/navBar';

const tabValue = (state = {
    value: 'about',
}, action) => {
    switch (action.type) {
    case NAV_TABS_SET:
        return {
            ...state,
            value: action.value,
        };

    default:
        return state;
    }
};

export default combineReducers({
    tabValue,
});
