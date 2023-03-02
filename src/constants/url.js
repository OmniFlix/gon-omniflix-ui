import { config } from '../config';

const UPLOAD_URL = 'https://ipfs-node.omniflix.studio';
const URL = config.REST_URL;
export const AVATAR_UPLOAD_URL = `${UPLOAD_URL}/api/v0/add?pin=true&rap-with-directory=false&progress=false`;

export const urlFetchAllowances = (address) => `${URL}/cosmos/feegrant/v1beta1/allowances/${address}`;
export const urlFetchBalance = (address) => `${URL}/cosmos/bank/v1beta1/balances/${address}`;
export const urlFetchTimeoutHeight = (url, channel) => {
    return `${url}/ibc/core/channel/v1/channels/${channel}/ports/nft-transfer`;
};
export const urlFetchCollectionInfo = (ID) => {
    return `${URL}/omniflix/onft/v1beta1/denoms/${ID}`;
};
export const urlClaimFaucet = (address) => `${URL}/claim-status/${address}`;
export const urlAddFaucet = (address) => `https://faucet.gon-flixnet.omniflix.io?address=${address}`;
