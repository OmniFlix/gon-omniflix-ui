export const config = {
    API_URL: 'https://staging-api.omniflix.studio',
    RPC_URL: 'https://rpc.flixnet-4.omniflix.network',
    REST_URL: 'https://rest.flixnet-4.omniflix.network',
    DATA_LAYER: 'https://data-layer-f4.omniflix.studio',
    CHAIN_ID: 'flixnet-4',
    CHAIN_NAME: 'OmniFlix FlixNet-4',
    COIN_DENOM: 'FLIX',
    COIN_MINIMAL_DENOM: 'uflix',
    COIN_DECIMALS: 6,
    PREFIX: 'omniflix',
};

export const chainId = config.CHAIN_ID;
export const chainName = config.CHAIN_NAME;
export const coinDenom = config.COIN_DENOM;
export const coinMinimalDenom = config.COIN_MINIMAL_DENOM;
export const coinDecimals = config.COIN_DECIMALS;
export const prefix = config.PREFIX;

export const chainConfig = {
    chainId: chainId,
    chainName,
    rpc: config.RPC_URL,
    rest: config.REST_URL,
    stakeCurrency: {
        coinDenom,
        coinMinimalDenom,
        coinDecimals,
    },
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: `${prefix}`,
        bech32PrefixAccPub: `${prefix}pub`,
        bech32PrefixValAddr: `${prefix}valoper`,
        bech32PrefixValPub: `${prefix}valoperpub`,
        bech32PrefixConsAddr: `${prefix}valcons`,
        bech32PrefixConsPub: `${prefix}valconspub`,
    },
    currencies: [
        {
            coinDenom,
            coinMinimalDenom,
            coinDecimals,
        },
    ],
    feeCurrencies: [
        {
            coinDenom,
            coinMinimalDenom,
            coinDecimals,
            gasPriceStep: {
                low: 0.01,
                average: 0.025,
                high: 0.04,
            },
        },
    ],
    coinType: 118,
};
