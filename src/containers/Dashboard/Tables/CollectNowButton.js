import React from 'react';
import { Button } from '@mui/material';
import { config, DEFAULT_LIMIT, DEFAULT_SKIP } from '../../../config';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchTxHash,
    protoBufSigning,
    setTxHashInProgressFalse,
    txSignAndBroadCast,
} from '../../../actions/account/wallet';
import { fetchBalance } from '../../../actions/account/BCDetails';
import { showMessage } from '../../../actions/snackbar';
import variables from '../../../utils/variables';
import { fetchMarketplaceNFTs } from '../../../actions/dashboard';

const CollectNowButton = (props) => {
    const handleClick = () => {
        const price = {
            denom: 'uflix',
            amount: String(props.price * (10 ** config.COIN_DECIMALS)),
        };

        const data = {
            buyer: props.address,
            id: props.value && props.value.listID,
            price: price,
        };

        const msg = [{
            type: 'OmniFlix/marketplace/MsgBuyNFT',
            value: data,
        }];

        const Tx = {
            msgs: msg,
            msgType: 'BuyNFT',
            fee: {
                amount: [{
                    amount: String(5000),
                    denom: config.COIN_MINIMAL_DENOM,
                }],
                gasLimit: String(300000),
            },
            memo: '',
        };

        props.sign(Tx, props.address, (result, txBytes) => {
            if (result) {
                const data = {
                    tx_bytes: txBytes,
                    mode: 'BROADCAST_MODE_SYNC',
                };
                props.txSignAndBroadCast(data, (res1) => {
                    if (res1 && res1.txhash) {
                        let counter = 0;
                        const time = setInterval(() => {
                            props.fetchTxHash(res1.txhash, (hashResult) => {
                                if (hashResult) {
                                    if (hashResult && hashResult.code !== undefined && hashResult.code !== 0) {
                                        props.showMessage(hashResult.logs || hashResult.raw_log, 'error', hashResult && hashResult.hash);
                                        props.setTxHashInProgressFalse();
                                        clearInterval(time);

                                        return;
                                    }

                                    props.fetchMarketplaceNFTs(props.rpcClient, props.chainValue, props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
                                    props.fetchBalance(props.address);
                                    props.setTxHashInProgressFalse();
                                    clearInterval(time);
                                }

                                counter++;
                                if (counter === 3) {
                                    if (hashResult && hashResult.code !== undefined && hashResult.code !== 0) {
                                        props.showMessage(hashResult.logs || hashResult.raw_log, 'error', hashResult && hashResult.hash);
                                        props.setTxHashInProgressFalse();
                                        clearInterval(time);

                                        return;
                                    }

                                    props.showMessage(variables[props.lang]['check_later']);
                                    props.setTxHashInProgressFalse();
                                    clearInterval(time);
                                }
                            });
                        }, 5000);
                    }
                });
            }
        });
    };

    return (
        <Button onClick={handleClick}>Collect Now</Button>
    );
};

CollectNowButton.propTypes = {
    address: PropTypes.string.isRequired,
    allowances: PropTypes.array.isRequired,
    aminoSignTx: PropTypes.func.isRequired,
    balance: PropTypes.array.isRequired,
    broadCastInProgress: PropTypes.bool.isRequired,
    chainValue: PropTypes.string.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchMarketplaceNFTs: PropTypes.func.isRequired,
    fetchTxHash: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    price: PropTypes.any.isRequired,
    rpcClient: PropTypes.any.isRequired,
    setTxHashInProgressFalse: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    sign: PropTypes.func.isRequired,
    signInProgress: PropTypes.bool.isRequired,
    txHashInProgress: PropTypes.bool.isRequired,
    txSignAndBroadCast: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        allowances: state.account.bc.allowances.value,
        balance: state.account.bc.balance.value,
        broadCastInProgress: state.account.wallet.broadCast.inProgress,
        lang: state.language,
        inProgress: state.dashboard.deList.inProgress,
        signInProgress: state.account.bc.protoBufSign.inProgress,
        txHashInProgress: state.account.bc.txHash.inProgress,
        rpcClient: state.query.rpcClient.value,
        chainValue: state.dashboard.chainValue.value,
    };
};

const actionToProps = {
    fetchBalance,
    fetchTxHash,
    fetchMarketplaceNFTs,
    setTxHashInProgressFalse,
    showMessage,
    sign: protoBufSigning,
    txSignAndBroadCast,
};

export default connect(stateToProps, actionToProps)(CollectNowButton);
