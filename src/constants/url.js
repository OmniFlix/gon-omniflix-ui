import { config } from '../config';

const URL = config.REST_URL;
const API_URL = config.API_URL;
export const DEFAULT_TOTAL = 5;
export const DEFAULT_SORT_BY = 'created_at';
export const DEFAULT_ORDER = 'desc';
export const DEFAULT_SKIP = 0;
export const DEFAULT_LIMIT = 5;
export const DEFAULT_SEARCH = null;

export const CONNECT_ACCOUNT_URL = `${API_URL}/users/connect-bc-account`;
export const ACCESS_TOKEN_URL = `${API_URL}/user/auth/refresh-token`;

export const urlVerifyAccount = (userId) => `${API_URL}/users/${userId}/verify-bc-account`;
export const urlFetchBalance = (address) => `${URL}/cosmos/bank/v1beta1/balances/${address}`;
export const urlFetchTimeoutHeight = (url, channel) => {
    return `${url}/ibc/core/channel/v1/channels/${channel}/ports/transfer`;
};
