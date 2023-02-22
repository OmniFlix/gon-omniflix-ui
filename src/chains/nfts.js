import { ChainsList } from './index';

export const urlFetchNFTS = (chain, address, denomId, skip, limit) => {
    let url = ChainsList[chain] && ChainsList[chain].NFT_S_OWNED_URL && (ChainsList[chain].REST_URL + ChainsList[chain].NFT_S_OWNED_URL);
    if (!url) {
        return;
    }

    url = url.replace(':denomId', denomId);
    url = url.replace(':address', address);

    const params = ['pagination.countTotal=true'];
    if (skip) {
        params.push(`pagination.offset=${skip}`);
    }
    if (limit) {
        params.push(`pagination.limit=${limit}`);
    }

    if (url.split('?').length > 1) {
        return `${url}&${params.join('&')}`;
    }

    return `${url}?${params.join('&')}`;
};

export const urlFetchCollectionNFTS = (chain, ID, skip, limit) => {
    let url = ChainsList[chain] && ChainsList[chain].NFT_S_OWNED_URL && (ChainsList[chain].REST_URL + ChainsList[chain].NFT_S_OWNED_URL);
    if (!url) {
        return;
    }

    url = url.replace(':denomId', ID);

    const params = ['pagination.countTotal=true'];
    if (skip) {
        params.push(`pagination.offset=${skip}`);
    }
    if (limit) {
        params.push(`pagination.limit=${limit}`);
    }

    if (url.split('?').length > 1) {
        return `${url}&${params.join('&')}`;
    }

    return `${url}?${params.join('&')}`;
};
