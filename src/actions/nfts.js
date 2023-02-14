import { NFT_S_FETCH_ERROR, NFT_S_FETCH_IN_PROGRESS, NFT_S_FETCH_SUCCESS } from '../constants/nfts';
import { Axios } from 'axios';
import { urlFetchNFTS } from '../chains/nfts';

const fetchNftSInProgress = () => {
    return {
        type: NFT_S_FETCH_IN_PROGRESS,
    };
};

const fetchNftSSuccess = (value, chain, skip, limit, search, total) => {
    return {
        type: NFT_S_FETCH_SUCCESS,
        value,
        chain,
        skip,
        limit,
        search,
        total,
    };
};

const fetchNftSError = (message) => {
    return {
        type: NFT_S_FETCH_ERROR,
        message,
    };
};

export const fetchNftS = (address, chain, skip, limit, search, cb) => (dispatch) => {
    dispatch(fetchNftSInProgress());

    const url = urlFetchNFTS(address, chain, skip, limit, search);
    Axios.get(url, {
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    })
        .then((res) => {
            dispatch(fetchNftSSuccess(res.data && res.data.result && res.data.result.list,
                chain, skip, limit, search, res && res.data && res.data.result && res.data.result.count));
            if (cb) {
                cb(res.data && res.data.result && res.data.result.list, res && res.data && res.data.result && res.data.result.count);
            }
        })
        .catch((error) => {
            dispatch(fetchNftSError(
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
};
