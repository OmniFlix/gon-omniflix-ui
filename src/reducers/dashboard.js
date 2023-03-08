import { combineReducers } from 'redux';
import {
    CHAIN_VALUE_SET,
    MARKETPLACE_NFT_S_FETCH_ERROR,
    MARKETPLACE_NFT_S_FETCH_IN_PROGRESS,
    MARKETPLACE_NFT_S_FETCH_SUCCESS,
    TAB_VALUE_SET,
} from '../constants/dashboard';

const chainValue = (state = {
    value: 'omniflix',
}, action) => {
    switch (action.type) {
    case CHAIN_VALUE_SET:
        return {
            ...state,
            value: action.value,
        };

    default:
        return state;
    }
};

const tabValue = (state = {
    value: 'all_collections',
}, action) => {
    switch (action.type) {
    case TAB_VALUE_SET:
        return {
            ...state,
            value: action.value,
        };

    default:
        return state;
    }
};

const marketplaceNFTs = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case MARKETPLACE_NFT_S_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case MARKETPLACE_NFT_S_FETCH_SUCCESS: {
        if (action.chain) {
            return {
                ...state,
                inProgress: false,
                value: {
                    ...state.value,
                    [action.chain]: {
                        value: action.value,
                        skip: action.skip,
                        limit: action.limit,
                        total: action.total,
                    },
                },
            };
        }

        return {
            ...state,
            inProgress: false,
        };
    }
    case MARKETPLACE_NFT_S_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

export default combineReducers({
    chainValue,
    tabValue,
    marketplaceNFTs,
});
