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
    // iris: {
    //     RPC_URL: 'http://34.145.1.166:26657',
    //     REST_URL: 'http://34.145.1.166:9090',
    //     CHAIN_ID: 'iris-1',
    //     CHAIN_NAME: 'IRISnet',
    //     COIN_DENOM: 'IRIS',
    //     COIN_MINIMAL_DENOM: 'uiris',
    //     COIN_DECIMALS: 6,
    //     PREFIX: 'iaa',
    //     NFT_S_OWNED_URL: `/onft/owners/:address`,
    //     COLLECTIONS_OWNED_URL: `/omniflix/onft/v1beta1/denoms?owner=:address`,
    // },
};

export const sourceChannel = {
    iris: 'channel-8',
    uptick: 'channel-9',
    stargaze: 'channel-7',
    juno: 'channel-6',
};
