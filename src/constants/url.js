import { config } from '../config';

const URL = config.REST_URL;
export const DEFAULT_TOTAL = 5;
export const DEFAULT_SORT_BY = 'created_at';
export const DEFAULT_ORDER = 'desc';
export const DEFAULT_SKIP = 0;
export const DEFAULT_LIMIT = 5;
export const DEFAULT_SEARCH = null;

export const urlFetchBalance = (address) => `${URL}/cosmos/bank/v1beta1/balances/${address}`;
export const urlFetchAllowances = (address) => `${URL}/cosmos/feegrant/v1beta1/allowances/${address}`;
