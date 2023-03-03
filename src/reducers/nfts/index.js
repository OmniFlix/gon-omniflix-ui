import { combineReducers } from 'redux';
import {
    MY_NFT_S_FETCH_ERROR,
    MY_NFT_S_FETCH_IN_PROGRESS,
    MY_NFT_S_FETCH_SUCCESS,
    MY_NFT_S_INFO_FETCH_ERROR,
    MY_NFT_S_INFO_FETCH_IN_PROGRESS,
    MY_NFT_S_INFO_FETCH_SUCCESS,
} from '../../constants/nfts';

const myNFTs = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case MY_NFT_S_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case MY_NFT_S_FETCH_SUCCESS: {
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
    case MY_NFT_S_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const myNFTsInfo = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case MY_NFT_S_INFO_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case MY_NFT_S_INFO_FETCH_SUCCESS: {
        if (action.chain) {
            return {
                ...state,
                inProgress: false,
                value: {
                    ...state.value,
                    [action.chain]: {
                        ...state.value && state.value[action.chain],
                        [action.nft]: action.value,
                    },
                },
            };
        }

        return {
            ...state,
            inProgress: false,
        };
    }
    case MY_NFT_S_FETCH_SUCCESS: {
        if (action.chain) {
            const obj = state.value;
            if (obj && obj[action.chain]) {
                delete obj[action.chain];
            }

            return {
                ...state,
                inProgress: false,
                value: obj,
            };
        }

        return {
            ...state,
            inProgress: false,
        };
    }
    case MY_NFT_S_INFO_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

export default combineReducers({
    myNFTs,
    myNFTsInfo,
});
