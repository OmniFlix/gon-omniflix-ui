import { config } from '../config';

const UPLOAD_URL = 'https://ipfs-node.omniflix.studio';
const URL = config.REST_URL;
export const AVATAR_UPLOAD_URL = `${UPLOAD_URL}/api/v0/add?pin=true&rap-with-directory=false&progress=false`;

export const urlFetchAllowances = (address) => `${URL}/cosmos/feegrant/v1beta1/allowances/${address}`;
export const urlFetchBalance = (address) => `${URL}/cosmos/bank/v1beta1/balances/${address}`;
export const urlFetchClassTrace = (hash) => `${URL}/ibc/apps/nft_transfer/v1/class_traces/${hash}`;
export const urlFetchTimeoutHeight = (url, channel) => {
    return `${url}/ibc/core/channel/v1/channels/${channel}/ports/nft-transfer`;
};
export const urlFetchCollectionInfo = (ID) => {
    return `${URL}/omniflix/onft/v1beta1/denoms/${ID}`;
};
export const urlFetchCollectionNFTS = (ID, skip, limit) => {
    const params = ['pagination.countTotal=true'];
    if (skip) {
        params.push(`pagination.offset=${skip}`);
    }
    if (limit) {
        params.push(`pagination.limit=${limit}`);
    }

    return `${URL}/omniflix/onft/v1beta1/collections/${ID}?${params.join('&')}`;
};

export const urlClaimFaucet = (address) => `${URL}/claim-status/${address}`;
export const urlAddFaucet = (address) => `https://faucet.gon-flixnet.omniflix.io?address=${address}`;
