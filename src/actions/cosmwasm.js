import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';
import { CONTRACTS_FETCH_ERROR, CONTRACTS_FETCH_IN_PROGRESS, CONTRACTS_FETCH_SUCCESS } from '../constants/cosmwasm';

const fetchContractsInProgress = () => {
    return {
        type: CONTRACTS_FETCH_IN_PROGRESS,
    };
};

const fetchContractsSuccess = (value, chain) => {
    return {
        type: CONTRACTS_FETCH_SUCCESS,
        value,
        chain,
    };
};

const fetchContractsError = (message) => {
    return {
        type: CONTRACTS_FETCH_ERROR,
        message,
        variant: 'error',
    };
};

export const fetchContracts = (config, chain) => (dispatch) => {
    dispatch(fetchContractsInProgress());
    (async () => {
        await window.keplr && window.keplr.enable(config.CHAIN_ID);
        const offlineSigner = window.getOfflineSigner && window.getOfflineSigner(config.CHAIN_ID);

        try {
            const client = await SigningCosmWasmClient.connectWithSigner(
                config.RPC_URL,
                offlineSigner,
                {
                    prefix: config.PREFIX,
                    gasPrice: GasPrice.fromString('0.025' + config.COIN_MINIMAL_DENOM),
                },
            );

            await client?.getContracts(
                config.CODE,
            ).then((resp) => {
                dispatch(fetchContractsSuccess(resp, chain));
            }).catch((e) => {
                dispatch(fetchContractsError(e && e.message));
            });
        } catch (e) {
            dispatch(fetchContractsError(e && e.message));
        }
    })();
};
