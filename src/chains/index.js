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
            iris: ['channel-24', 'channel-25'],
            uptick: ['channel-41', 'channel-42'],
            stargaze: ['channel-44', 'channel-45'],
            juno: ['channel-46', 'channel-47'],
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
            omniflix: ['channel-0', 'channel-1'],
            uptick: ['channel-17', 'channel-19'],
            stargaze: ['channel-22', 'channel-23'],
            juno: ['channel-24', 'channel-25'],
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
            omniflix: ['channel-5', 'channel-9'],
            iris: ['channel-3', 'channel-4'],
            stargaze: ['channel-6', 'channel-12'],
            juno: ['channel-7', 'channel-13'],
        },
        QueryClientImpl: IrisQueryClientImpl,
        service: 'uptick.collection.v1.Query',
    },
    stargaze: {
        RPC_URL: 'https://rpc.elgafar-1.stargaze-apis.com',
        REST_URL: 'https://rest.elgafar-1.stargaze-apis.com',
        CHAIN_ID: 'elgafar-1',
        CHAIN_NAME: 'elgafar-1',
        COIN_DENOM: 'STARS',
        COIN_MINIMAL_DENOM: 'ustars',
        COIN_DECIMALS: 6,
        PREFIX: 'stars',
        EXPLORER: 'https://testnet-explorer.publicawesome.dev/stargaze',
        CHANNELS: {
            omniflix: ['channel-209', 'channel-210'],
            iris: ['channel-207', 'channel-208'],
            uptick: ['channel-203', 'channel-206'],
            juno: ['channel-211', 'channel-213'],
        },
        CODE: 1660,
        ICS721_CODE: 1662,
        CONTRACT_ADDRESS: 'stars1ve46fjrhcrum94c7d8yc2wsdz8cpuw73503e8qn9r44spr6dw0lsvmvtqh',
        cosmwasm: true,
    },
    juno: {
        PREFIX: 'juno',
    },
};

export const chainConfigIBC = (chain) => {
    if (chain === 'uptick') {
        return {
            chainId: ChainsList[chain].CHAIN_ID,
            chainName: ChainsList[chain].CHAIN_NAME,
            rpc: ChainsList[chain].RPC_URL,
            rest: ChainsList[chain].REST_URL,
            stakeCurrency: {
                coinDenom: ChainsList[chain].COIN_DENOM,
                coinMinimalDenom: ChainsList[chain].COIN_MINIMAL_DENOM,
                coinDecimals: ChainsList[chain].COIN_DECIMALS,
                coinGeckoId: 'unknown',
            },
            bip44: {
                coinType: 60,
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
                coinGeckoId: 'unknown',
            }],
            feeCurrencies: [{
                coinDenom: ChainsList[chain].COIN_DENOM,
                coinMinimalDenom: ChainsList[chain].COIN_MINIMAL_DENOM,
                coinDecimals: ChainsList[chain].COIN_DECIMALS,
                coinGeckoId: 'unknown',
                gasPriceStep: {
                    low: 0.01,
                    average: 0.025,
                    high: 0.03,
                },
            }],
            coinType: 60,
            features: [
                'ibc-transfer',
                'ibc-go',
                'eth-address-gen',
                'eth-key-sign',
            ],
            beta: true,
        };
    }

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
