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
        NFT_S_OWNED_URL: '/omniflix/onft/v1beta1/collections/:denomId',
        COLLECTIONS_OWNED_URL: '/omniflix/onft/v1beta1/denoms?owner=:address',
        COLLECTIONS_URL: '/omniflix/onft/v1beta1/denoms',
        CHANNELS: {
            iris: 'channel-24',
            uptick: 'channel-20',
            stargaze: 'channel-17',
            juno: 'channel-18',
        },
    },
    iris: {
        RPC_URL: 'http://34.80.93.133:26657',
        REST_URL: 'http://34.80.93.133:1317',
        CHAIN_ID: 'gon-irishub-1',
        CHAIN_NAME: 'Irishub GON',
        COIN_DENOM: 'IRIS',
        COIN_MINIMAL_DENOM: 'uiris',
        COIN_DECIMALS: 6,
        PREFIX: 'iaa',
        NFT_S_OWNED_URL: '/irismod/nft/collections/:denomId',
        COLLECTIONS_OWNED_URL: '/irismod/nft/denoms?owner=:address',
        COLLECTIONS_URL: '/irismod/nft/denoms',
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
