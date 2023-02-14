import { NFT_S_FETCH_ERROR, NFT_S_FETCH_IN_PROGRESS, NFT_S_FETCH_SUCCESS } from '../constants/nfts';
import { combineReducers } from 'redux';

const nftSList = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case NFT_S_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case NFT_S_FETCH_SUCCESS: {
        if (action.chain) {
            return {
                ...state,
                inProgress: false,
                value: {
                    [action.chain]: {
                        value: action.value,
                        skip: action.skip,
                        limit: action.limit,
                        search: action.search,
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
    case NFT_S_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

export default combineReducers({
    nftSList,
});
