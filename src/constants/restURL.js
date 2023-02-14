import { config } from '../config';

const URL = config.REST_URL;

export const urlFetchBalance = (address) => `${URL}/bank/balances/${address}`;
