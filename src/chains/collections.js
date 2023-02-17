import { ChainsList } from './index';

export const urlFetchCollections = (chain, address, skip, limit) => {
    let url = ChainsList[chain] && ChainsList[chain].COLLECTIONS_OWNED_URL && (ChainsList[chain].REST_URL + ChainsList[chain].COLLECTIONS_OWNED_URL);
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

export const urlFetchAllCollections = (chain, skip, limit) => {
    const url = ChainsList[chain] && ChainsList[chain].COLLECTIONS_URL && (ChainsList[chain].REST_URL + ChainsList[chain].COLLECTIONS_URL);
    if (!url) {
        return;
    }

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
