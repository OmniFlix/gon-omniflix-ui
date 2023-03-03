import { ChainsList } from '../../chains';
import {
    MY_NFT_S_FETCH_ERROR,
    MY_NFT_S_FETCH_IN_PROGRESS,
    MY_NFT_S_FETCH_SUCCESS,
    MY_NFT_S_INFO_FETCH_ERROR,
    MY_NFT_S_INFO_FETCH_IN_PROGRESS,
    MY_NFT_S_INFO_FETCH_SUCCESS,
} from '../../constants/nfts';

const fetchMyNFTsInProgress = () => {
    return {
        type: MY_NFT_S_FETCH_IN_PROGRESS,
    };
};

const fetchMyNFTsSuccess = (value, chain, skip, limit, total) => {
    return {
        type: MY_NFT_S_FETCH_SUCCESS,
        value,
        chain,
        skip,
        limit,
        total,
    };
};

const fetchMyNFTsError = (message) => {
    return {
        type: MY_NFT_S_FETCH_ERROR,
        message,
        variant: 'error',
    };
};

export const fetchMyNFTs = (rpcClient, chain, address, skip, limit, cb) => (dispatch) => {
    dispatch(fetchMyNFTsInProgress());

    const QueryClientImpl = ChainsList[chain] && ChainsList[chain].QueryClientImpl;
    const client = rpcClient && rpcClient[chain];
    if (!QueryClientImpl) {
        dispatch(fetchMyNFTsError('Failed!'));
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
                dispatch(fetchMyNFTsSuccess(queryResult && queryResult.owner && queryResult.owner.idCollections, chain,
                    skip, limit, (queryResult.pagination && queryResult.pagination.total)));
                if (cb) {
                    cb(queryResult && queryResult.owner && queryResult.owner.idCollections);
                }
            }).catch((error) => {
                dispatch(fetchMyNFTsError(
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
                dispatch(fetchMyNFTsSuccess(queryResult && queryResult.owner && queryResult.owner.idCollections, chain,
                    skip, limit, (queryResult.pagination && queryResult.pagination.total)));
                if (cb) {
                    cb(queryResult && queryResult.owner && queryResult.owner.idCollections);
                }
            }).catch((error) => {
                dispatch(fetchMyNFTsError(
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

const fetchMyNFTsInfoInProgress = () => {
    return {
        type: MY_NFT_S_INFO_FETCH_IN_PROGRESS,
    };
};

const fetchMyNFTsInfoSuccess = (value, chain, nft) => {
    return {
        type: MY_NFT_S_INFO_FETCH_SUCCESS,
        value,
        chain,
        nft,
    };
};

const fetchMyNFTsInfoError = (message) => {
    return {
        type: MY_NFT_S_INFO_FETCH_ERROR,
        message,
        variant: 'error',
    };
};

export const fetchMyNFTsInfo = (rpcClient, chain, denom, nft, cb) => (dispatch) => {
    dispatch(fetchMyNFTsInfoInProgress());

    const QueryClientImpl = ChainsList[chain] && ChainsList[chain].QueryClientImpl;
    const client = rpcClient && rpcClient[chain];
    if (!QueryClientImpl) {
        dispatch(fetchMyNFTsInfoError('Failed!'));
        return;
    }

    (async () => {
        let queryService = new QueryClientImpl(client);
        if (ChainsList[chain] && ChainsList[chain].service) {
            queryService = new QueryClientImpl(client, { service: ChainsList[chain].service });
        }

        if (chain === 'iris' || chain === 'uptick') {
            const request = {
                denomId: denom,
                tokenId: nft,
            };

            queryService.NFT(request).then((queryResult) => {
                const data = {
                    ...queryResult && queryResult.nft,
                    denom,
                };

                dispatch(fetchMyNFTsInfoSuccess(data, chain, nft));
                if (cb) {
                    cb(data);
                }
            }).catch((error) => {
                dispatch(fetchMyNFTsInfoError(
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
                denomId: denom,
                id: nft,
            };

            queryService.ONFT(request).then((queryResult) => {
                const data = {
                    ...queryResult && queryResult.onft,
                    denom,
                };

                dispatch(fetchMyNFTsInfoSuccess(data, chain, nft));
                if (cb) {
                    cb(data);
                }
            }).catch((error) => {
                dispatch(fetchMyNFTsInfoError(
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
