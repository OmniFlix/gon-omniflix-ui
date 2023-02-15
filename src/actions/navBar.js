import { NAV_TABS_SET } from '../constants/navBar';

export const setNavTabs = (value) => {
    return {
        type: NAV_TABS_SET,
        value,
    };
};
