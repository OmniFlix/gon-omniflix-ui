import { CHAIN_VALUE_SET, SEARCH_VALUE_SET, TAB_VALUE_SET } from '../constants/home';

export const setChainValue = (value) => {
    return {
        type: CHAIN_VALUE_SET,
        value,
    };
};

export const setTabValue = (value) => {
    return {
        type: TAB_VALUE_SET,
        value,
    };
};

export const setSearchValue = (value) => {
    return {
        type: SEARCH_VALUE_SET,
        value,
    };
};
