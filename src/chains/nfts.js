import { ChainsList } from './index';

export const urlFetchNFTS = (chain, address, skip, limit) => {
    let url = ChainsList[chain] && ChainsList[chain].NFT_S_OWNED_URL && (ChainsList[chain].REST_URL + ChainsList[chain].NFT_S_OWNED_URL);
    if (!url) {
        return;
    }

    url = url.replace(':address', address);

    const params = ['pagination.countTotal=true'];
    if (skip) {
        params.push(`pagination.offset=${skip}`);
    }
    if (limit) {
        params.push(`pagination.limit=${limit}`);
    }

    if (url.split('?').length) {
        return `${url}&${params.join('&')}`;
    }

    return `${url}?${params.join('&')}`;
};
