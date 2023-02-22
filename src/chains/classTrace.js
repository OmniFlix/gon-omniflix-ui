import { ChainsList } from './index';

export const urlFetchClassTrace = (chain, hash) => `${chain && ChainsList[chain] && ChainsList[chain].REST_URL}/ibc/apps/nft_transfer/v1/class_traces/${hash}`;
