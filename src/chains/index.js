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
            iris: 'channel-54',
            uptick: 'channel-55',
            stargaze: 'channel-51',
            juno: 'channel-52',
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
            omniflix: 'channel-34',
            uptick: 'channel-35',
            stargaze: 'channel-31',
            juno: 'channel-32',
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
            omniflix: 'channel-22',
            iris: 'channel-21',
            stargaze: 'channel-18',
            juno: 'channel-19',
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
            omniflix: 'channel-226',
            iris: 'channel-225',
            uptick: 'channel-227',
            juno: 'channel-223',
        },
        CODE: 803,
        // CONTRACT: 'stars16teejyjpa4qpcha54eulxv9l3n5vv9ujw3wc263ctuqahxx5k3as52my82',
        // CONTRACT: 'stars1rl6e20n4cqy20w9azuctw00mpz0c2jm0zmyp2edfcy3u3yhrc0cqzs5x0p',
        cosmwasm: true,
        // QueryClientImpl: IrisQueryClientImpl,
        // service: 'uptick.collection.v1.Query',
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
