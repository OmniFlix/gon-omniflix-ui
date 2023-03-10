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
import Axios from 'axios';
import { QueryClientImpl } from '../registry/omniflix_custom_ts_types/marketplace/v1beta1/query';
import { ChainsList } from '../chains';

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

export const setTokenValue = (value) => {
    return {
        type: TOKEN_VALUE_SET,
        value,
    };
};

export const setPriceValue = (value) => {
    return {
        type: PRICE_VALUE_SET,
        value,
    };
};

export const setListNFTSuccess = (hash) => {
    return {
        type: LIST_NFT_SUCCESS_SET,
        hash,
    };
};

export const setListNFTFail = () => {
    return {
        type: LIST_NFT_FAIL_SET,
    };
};

export const setDeListNFTSuccess = (hash) => {
    return {
        type: DE_LIST_NFT_SUCCESS_SET,
        hash,
    };
};

export const setDeListNFTFail = () => {
    return {
        type: DE_LIST_NFT_FAIL_SET,
    };
};

export const showListNFTDialog = (value) => {
    return {
        type: LIST_NFT_DIALOG_SHOW,
        value,
    };
};

export const hideListNFTDialog = () => {
    return {
        type: LIST_NFT_DIALOG_HIDE,
    };
};

export const showDeListNFTDialog = (value) => {
    return {
        type: DE_LIST_DIALOG_SHOW,
        value,
    };
};

export const hideDeListNFTDialog = () => {
    return {
        type: DE_LIST_DIALOG_HIDE,
    };
};

const fetchMarketplaceNFTsInProgress = () => {
    return {
        type: MARKETPLACE_NFT_S_FETCH_IN_PROGRESS,
    };
};

const fetchMarketplaceNFTsSuccess = (value, chain, skip, limit, total) => {
    return {
        type: MARKETPLACE_NFT_S_FETCH_SUCCESS,
        value,
        chain,
        skip,
        limit,
        total,
    };
};

const fetchMarketplaceNFTsError = (message) => {
    return {
        type: MARKETPLACE_NFT_S_FETCH_ERROR,
        message,
        variant: 'error',
    };
};

export const fetchMarketplaceNFTs = (rpcClient, chain, address, skip, limit, cb) => (dispatch) => {
    dispatch(fetchMarketplaceNFTsInProgress());

    const client = rpcClient && rpcClient[chain];
    if (!QueryClientImpl) {
        dispatch(fetchMarketplaceNFTsError('Failed!'));
        return;
    }

    (async () => {
        const queryService = new QueryClientImpl(client);

        const request = {
            owner: '',
            priceDenom: '',
            pagination: {
                key: new Uint8Array(),
                countTotal: true,
                limit: limit,
                offset: skip,
            },
        };

        queryService.Listings(request).then((queryResult) => {
            dispatch(fetchMarketplaceNFTsSuccess(queryResult && queryResult.listings, chain,
                skip, limit, (queryResult.pagination && queryResult.pagination.total)));
            if (cb) {
                cb(queryResult && queryResult.listings);
            }
        }).catch((error) => {
            dispatch(fetchMarketplaceNFTsError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
            if (cb) {
                cb(null);
            }
        });
    })();
};

const fetchMarketplaceNFTsInfoInProgress = () => {
    return {
        type: MARKETPLACE_NFT_S_INFO_FETCH_IN_PROGRESS,
    };
};

const fetchMarketplaceNFTsInfoSuccess = (value, chain, nft) => {
    return {
        type: MARKETPLACE_NFT_S_INFO_FETCH_SUCCESS,
        value,
        chain,
        nft,
    };
};

const fetchMarketplaceNFTsInfoError = (message) => {
    return {
        type: MARKETPLACE_NFT_S_INFO_FETCH_ERROR,
        message,
        variant: 'error',
    };
};

export const fetchMarketplaceNFTsInfo = (rpcClient, chain, denom, nft, cb) => (dispatch) => {
    dispatch(fetchMarketplaceNFTsInfoInProgress());

    const QueryClientImpl = ChainsList[chain] && ChainsList[chain].QueryClientImpl;
    const client = rpcClient && rpcClient[chain];
    if (!QueryClientImpl) {
        dispatch(fetchMarketplaceNFTsInfoError('Failed!'));
        return;
    }

    (async () => {
        let queryService = new QueryClientImpl(client);
        if (ChainsList[chain] && ChainsList[chain].service) {
            queryService = new QueryClientImpl(client, { service: ChainsList[chain].service });
        }
        const request = {
            denomId: denom,
            id: nft,
        };

        queryService.ONFT(request).then((queryResult) => {
            const data = {
                ...queryResult && queryResult.onft,
                denom,
            };

            dispatch(fetchMarketplaceNFTsInfoSuccess(data, chain, nft));
            if (cb) {
                cb(data);
            }
        }).catch((error) => {
            dispatch(fetchMarketplaceNFTsInfoError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
            if (cb) {
                cb(null);
            }
        });
    })();
};

const listNFTInProgress = () => {
    return {
        type: LIST_NFT_IN_PROGRESS,
    };
};

const listNFTSuccess = (value) => {
    return {
        type: LIST_NFT_SUCCESS,
        value,
    };
};

const listNFTError = (message) => {
    return {
        type: LIST_NFT_ERROR,
        message,
    };
};

export const listNFT = (data, cb) => (dispatch) => {
    dispatch(listNFTInProgress());

    Axios.post('', data, {
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    })
        .then((res) => {
            dispatch(listNFTSuccess(res.data && res.data.result));
            cb(res.data);
        })
        .catch((error) => {
            dispatch(listNFTError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
            cb(null);
        });
};

const deListInProgress = () => {
    return {
        type: DE_LISTED_IN_PROGRESS,
    };
};

const deListSuccess = (value) => {
    return {
        type: DE_LISTED_SUCCESS,
        value,
    };
};

const deListError = (message) => {
    return {
        type: DE_LISTED_ERROR,
        message,
    };
};

export const deList = (data, id, cb) => (dispatch) => {
    dispatch(deListInProgress());

    // const url = urlDeList(id);
    Axios.put('url', data, {
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    })
        .then((res) => {
            dispatch(deListSuccess(res.data && res.data.result));
            cb(res.data);
        })
        .catch((error) => {
            dispatch(deListError(
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : 'Failed!',
            ));
            cb(null);
        });
};
