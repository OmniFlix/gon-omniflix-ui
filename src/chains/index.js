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
        NFT_S_OWNED_URL: '/omniflix/onft/v1beta1/onfts/:denomId/:address',
        COLLECTIONS_OWNED_URL: '/omniflix/onft/v1beta1/denoms?owner=:address',
        COLLECTIONS_URL: '/omniflix/onft/v1beta1/denoms?',
    },
    iris: {
        PREFIX: 'iaa',
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
    iris: 'channel-19',
    uptick: 'channel-20',
    stargaze: 'channel-17',
    juno: 'channel-18',
};
