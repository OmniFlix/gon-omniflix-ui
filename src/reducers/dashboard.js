import { combineReducers } from 'redux';
import {
    CHAIN_VALUE_SET,
    DE_LIST_DIALOG_HIDE,
    DE_LIST_DIALOG_SHOW,
    DE_LIST_NFT_FAIL_SET,
    DE_LIST_NFT_SUCCESS_SET,
    DE_LISTED_ERROR,
    DE_LISTED_IN_PROGRESS,
    DE_LISTED_SUCCESS,
    LIST_NFT_DIALOG_HIDE,
    LIST_NFT_DIALOG_SHOW,
    LIST_NFT_ERROR,
    LIST_NFT_FAIL_SET,
    LIST_NFT_IN_PROGRESS,
    LIST_NFT_SUCCESS,
    LIST_NFT_SUCCESS_SET,
    MARKETPLACE_NFT_S_FETCH_ERROR,
    MARKETPLACE_NFT_S_FETCH_IN_PROGRESS,
    MARKETPLACE_NFT_S_FETCH_SUCCESS,
    MARKETPLACE_NFT_S_INFO_FETCH_ERROR,
    MARKETPLACE_NFT_S_INFO_FETCH_IN_PROGRESS,
    MARKETPLACE_NFT_S_INFO_FETCH_SUCCESS,
    PRICE_VALUE_SET,
    TAB_VALUE_SET,
    TOKEN_VALUE_SET,
} from '../constants/dashboard';
import { tokensList } from '../utils/defaultOptions';

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

const marketplaceNFTsInfo = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case MARKETPLACE_NFT_S_INFO_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case MARKETPLACE_NFT_S_INFO_FETCH_SUCCESS: {
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
    case MARKETPLACE_NFT_S_FETCH_SUCCESS: {
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
    case MARKETPLACE_NFT_S_INFO_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const listNFTDialog = (state = {
    open: false,
    value: {},
    chain: 'omniflix',
    success: false,
    fail: false,
    hash: '',
}, action) => {
    switch (action.type) {
    case LIST_NFT_DIALOG_SHOW:
        return {
            open: true,
            value: action.value,
            chain: action.chain,
        };
    case LIST_NFT_SUCCESS_SET:
        return {
            ...state,
            success: true,
            hash: action.hash,
        };
    case LIST_NFT_FAIL_SET:
        return {
            ...state,
            fail: true,
        };
    case LIST_NFT_DIALOG_HIDE:
        return {
            open: false,
            value: {},
            chain: 'omniflix',
            success: false,
            fail: false,
            hash: '',
        };

    default:
        return state;
    }
};

const deListNFTDialog = (state = {
    open: false,
    value: {},
    success: false,
    fail: false,
    hash: '',
}, action) => {
    switch (action.type) {
    case DE_LIST_DIALOG_SHOW:
        return {
            open: true,
            value: action.value,
        };
    case DE_LIST_NFT_SUCCESS_SET:
        return {
            ...state,
            success: true,
            hash: action.hash,
        };
    case DE_LIST_NFT_FAIL_SET:
        return {
            ...state,
            fail: true,
        };
    case DE_LIST_DIALOG_HIDE:
        return {
            open: false,
            value: {},
            success: false,
            fail: false,
            hash: '',
        };

    default:
        return state;
    }
};

const tokenValue = (state = {
    value: tokensList[0],
    default: tokensList[0],
}, action) => {
    if (action.type === TOKEN_VALUE_SET) {
        return {
            ...state,
            value: action.value,
        };
    } else if (action.type === LIST_NFT_DIALOG_HIDE) {
        return {
            ...state,
            value: state.default || {},
        };
    }

    return state;
};

const priceValue = (state = '', action) => {
    switch (action.type) {
    case PRICE_VALUE_SET:
        return action.value;
    case LIST_NFT_DIALOG_HIDE:
        return '';

    default:
        return state;
    }
};

const newListNFT = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case LIST_NFT_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case LIST_NFT_SUCCESS:
        return {
            inProgress: false,
            value: action.value,
        };
    case LIST_NFT_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const deList = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case DE_LISTED_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case DE_LISTED_SUCCESS:
        return {
            inProgress: false,
            value: action.value,
        };
    case DE_LISTED_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const marketplaceInfo = (state = {
    inProgress: false,
    value: {},
}, action) => {
    switch (action.type) {
    case MARKETPLACE_NFT_S_INFO_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case MARKETPLACE_NFT_S_INFO_FETCH_SUCCESS: {
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
    case MARKETPLACE_NFT_S_FETCH_SUCCESS: {
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
    case MARKETPLACE_NFT_S_INFO_FETCH_ERROR:
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
    marketplaceNFTsInfo,
    listNFTDialog,
    deListNFTDialog,
    tokenValue,
    priceValue,
    newListNFT,
    deList,
    marketplaceInfo,
});
