import {
    CHAIN_VALUE_SET,
    MARKETPLACE_NFT_S_FETCH_ERROR,
    MARKETPLACE_NFT_S_FETCH_IN_PROGRESS,
    MARKETPLACE_NFT_S_FETCH_SUCCESS,
    TAB_VALUE_SET,
} from '../constants/dashboard';
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

    const QueryClientImpl = ChainsList[chain] && ChainsList[chain].QueryClientImpl;
    const client = rpcClient && rpcClient[chain];
    if (!QueryClientImpl) {
        dispatch(fetchMarketplaceNFTsError('Failed!'));
        return;
    }

    (async () => {
        let queryService = new QueryClientImpl(client);
        if (ChainsList[chain] && ChainsList[chain].service) {
            queryService = new QueryClientImpl(client, { service: ChainsList[chain].service });
        }

        if (chain === 'iris' || chain === 'uptick') {
            const request = {
                denomId: '',
                owner: address,
                pagination: undefined,
            };

            queryService.NFTsOfOwner(request).then((queryResult) => {
                dispatch(fetchMarketplaceNFTsSuccess(queryResult && queryResult.owner && queryResult.owner.idCollections, chain,
                    skip, limit, (queryResult.pagination && queryResult.pagination.total)));
                if (cb) {
                    cb(queryResult && queryResult.owner && queryResult.owner.idCollections);
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
        } else {
            const request = {
                denomId: '',
                owner: address,
                pagination: {
                    key: new Uint8Array(),
                    countTotal: true,
                    limit: limit,
                    offset: skip,
                },
            };

            queryService.OwnerONFTs(request).then((queryResult) => {
                dispatch(fetchMarketplaceNFTsSuccess(queryResult && queryResult.owner && queryResult.owner.idCollections, chain,
                    skip, limit, (queryResult.pagination && queryResult.pagination.total)));
                if (cb) {
                    cb(queryResult && queryResult.owner && queryResult.owner.idCollections);
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
        }
    })();
};
