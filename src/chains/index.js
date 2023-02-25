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
        EXPLORER: 'https://ping-pub-explorer.omniflix.io/omniflix-gon',
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
        CHANNELS: {
            omniflix: 'channel-0',
            uptick: 'channel-59',
            stargaze: 'channel-8',
            juno: 'channel-57',
        },
        QueryClientImpl: IrisQueryClientImpl,
    },
    uptick: {
        RPC_URL: 'https://rpc-gon-uptick.omniflix.io',
        REST_URL: 'https://api-gon-uptick.omniflix.io',
        CHAIN_ID: 'uptick_7000-1',
        CHAIN_NAME: 'Uptick GON',
        COIN_DENOM: 'UPTICK',
        COIN_MINIMAL_DENOM: 'auptick',
        COIN_DECIMALS: 18,
        PREFIX: 'uptick',
        EXPLORER: 'https://explorer.testnet.uptick.network/uptick-network-testnet',
        CHANNELS: {
            omniflix: 'channel-25',
            iris: 'channel-24',
            stargaze: 'channel-21',
            juno: 'channel-22',
        },
        QueryClientImpl: IrisQueryClientImpl,
        service: 'uptick.collection.v1.Query',
    },
    stargaze: {
        PREFIX: 'stars',
    },
    juno: {
        PREFIX: 'juno',
    },
};

export const chainConfigIBC = (chain) => {
    return {
        chainId: ChainsList[chain].CHAIN_ID,
        chainName: ChainsList[chain].CHAIN_NAME,
        rpc: ChainsList[chain].RPC_URL,
        rest: ChainsList[chain].REST_URL,
        stakeCurrency: {
            coinDenom: ChainsList[chain].COIN_DENOM,
            coinMinimalDenom: ChainsList[chain].COIN_MINIMAL_DENOM,
            coinDecimals: ChainsList[chain].COIN_DECIMALS,
        },
        bip44: {
            coinType: 118,
        },
        bech32Config: {
            bech32PrefixAccAddr: `${ChainsList[chain].PREFIX}`,
            bech32PrefixAccPub: `${ChainsList[chain].PREFIX}pub`,
            bech32PrefixValAddr: `${ChainsList[chain].PREFIX}valoper`,
            bech32PrefixValPub: `${ChainsList[chain].PREFIX}valoperpub`,
            bech32PrefixConsAddr: `${ChainsList[chain].PREFIX}valcons`,
            bech32PrefixConsPub: `${ChainsList[chain].PREFIX}valconspub`,
        },
        currencies: [{
            coinDenom: ChainsList[chain].COIN_DENOM,
            coinMinimalDenom: ChainsList[chain].COIN_MINIMAL_DENOM,
            coinDecimals: ChainsList[chain].COIN_DECIMALS,
        }],
        feeCurrencies: [{
            coinDenom: ChainsList[chain].COIN_DENOM,
            coinMinimalDenom: ChainsList[chain].COIN_MINIMAL_DENOM,
            coinDecimals: ChainsList[chain].COIN_DECIMALS,
            gasPriceStep: {
                low: 0.01,
                average: 0.025,
                high: 0.25,
            },
        }],
        coinType: 118,
    };
};
