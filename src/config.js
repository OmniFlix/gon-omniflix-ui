export const config = {
    API_URL: 'https://dev-api-gon.omniflix.studio',
    RPC_URL: 'https://rpc.gon-flixnet.omniflix.io',
    REST_URL: 'https://rest.gon-flixnet.omniflix.io',
    DATA_LAYER: 'https://data-layer-gon.omniflix.studio',
    CHAIN_ID: 'gon-flixnet-1',
    CHAIN_NAME: 'OmniFlix GON',
    COIN_DENOM: 'FLIX',
    COIN_MINIMAL_DENOM: 'uflix',
    COIN_DECIMALS: 6,
    PREFIX: 'omniflix',
};

export const IPFS_URL = 'https://ipfs.omniflix.studio/ipfs';
export const IPFS_REFERENCE_PATH = 'ipfs://';
export const EXPLORER_URL = 'https://www.mintscan.io/omniflix';

export const DEFAULT_TOTAL = 10;
export const DEFAULT_SORT_BY = 'created_at';
export const DEFAULT_ORDER = 'desc';
export const DEFAULT_SKIP = 0;
export const DEFAULT_LIMIT = 10;
export const DEFAULT_SEARCH = null;
export const DEFAULT_LAZY_FETCH_HEIGHT = 256;
export const TRANSACTION_SET_TIME_OUT = 3000;
export const GAS_PRICE_STEP_LOW = 0.001;
export const GAS_PRICE_STEP_AVERAGE = 0.0025;
export const GAS_PRICE_STEP_HIGH = 0.025;

export const gas = {
    LIST_NFT: 200000,
    MINT_NFT: 300000,
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
                low: 0.001,
                average: 0.0025,
                high: 0.025,
            },
        },
    ],
    coinType: 118,
};
