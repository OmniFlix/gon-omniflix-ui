import { QueryClientImpl as IrisQueryClientImpl } from '../registry/irismod/nft/query';
import { QueryClientImpl } from '../registry/omniflix_custom_ts_types/onft/v1beta1/query';

export const ChainsList = {
    omniflix: {
        RPC_URL: 'https://rpc.gon-flixnet.omniflix.io',
        REST_URL: 'https://rest.gon-flixnet.omniflix.io',
        CHAIN_ID: 'gon-flixnet-1',
        CHAIN_NAME: 'OmniFlix GON',
        COIN_DENOM: 'FLIX',
        COIN_MINIMAL_DENOM: 'uflix',
        COIN_DECIMALS: 6,
        PREFIX: 'omniflix',
        CHANNELS: {
            iris: 'channel-24',
            uptick: 'channel-20',
            stargaze: 'channel-17',
            juno: 'channel-18',
        },
        QueryClientImpl: QueryClientImpl,
    },
    iris: {
        RPC_URL: 'https://rpc-gon-irishub.omniflix.io',
        REST_URL: 'https://api-gon-irishub.omniflix.io',
        CHAIN_ID: 'gon-irishub-1',
        CHAIN_NAME: 'Irishub GON',
        COIN_DENOM: 'IRIS',
        COIN_MINIMAL_DENOM: 'uiris',
        COIN_DECIMALS: 6,
        PREFIX: 'iaa',
        QueryClientImpl: IrisQueryClientImpl,
    },
    uptick: {
        PREFIX: 'uptick',
    },
    stargaze: {
        PREFIX: 'stars',
    },
    juno: {
        PREFIX: 'juno',
    },
};

export const sourceChannel = {
    iris: 'channel-24',
    uptick: 'channel-20',
    stargaze: 'channel-17',
    juno: 'channel-18',
};
