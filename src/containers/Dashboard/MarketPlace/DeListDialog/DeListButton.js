import React from 'react';
import { Button } from '@mui/material';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import variables from '../../../../utils/variables';
import { config, DEFAULT_LIMIT, DEFAULT_SKIP } from '../../../../config';
import { fetchBalance } from '../../../../actions/account/BCDetails';
import {
    aminoSignTx,
    fetchTxHash,
    protoBufSigning,
    setTxHashInProgressFalse,
    txSignAndBroadCast,
} from '../../../../actions/account/wallet';
import { showMessage } from '../../../../actions/snackbar';
import { customTypes } from '../../../../registry';
import { fetchMarketplaceNFTs, setDeListNFTFail, setDeListNFTSuccess } from '../../../../actions/dashboard';
import withRouter from '../../../../components/WithRouter';

const DeListButton = (props) => {
    const handleClick = () => {
        const data = {
            id: props.value && props.value.listID,
            owner: props.address,
        };

        let balance = props.balance && props.balance.length && props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
        balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

        const msg = [{
            type: 'OmniFlix/marketplace/MsgDeListNFT',
            value: data,
        }];

        const Tx = {
            msgs: msg,
            msgType: 'DeListNFT',
            fee: {
                amount: [{
                    amount: String(5000),
                    denom: config.COIN_MINIMAL_DENOM,
                }],
                gasLimit: String(300000),
            },
            memo: '',
        };

        const type = customTypes && customTypes.DeListNFT && customTypes.DeListNFT.typeUrl;
        const granterInfo = {};
        if (props.allowances && props.allowances.length) {
            props.allowances.map((val) => {
                if (val && val.allowance && val.allowance.spend_limit && val.allowance.spend_limit.length) {
                    const amount = val.allowance.spend_limit.find((val1) => (val1.denom === config.COIN_MINIMAL_DENOM) &&
                        val1.amount && (val1.amount > 0.1 * (10 ** config.COIN_DECIMALS)));
                    if (amount && amount.amount) {
                        granterInfo.granter = val.granter;
                        granterInfo.amount = amount.amount / 10 ** config.COIN_DECIMALS;
                    }
                } else if (val && val.allowance && val.allowance.allowed_messages &&
                    type && val.allowance.allowed_messages.indexOf(type) > -1) {
                    if (val && val.allowance && val.allowance.allowance &&
                        val.allowance.allowance.spend_limit && val.allowance.allowance.spend_limit.length) {
                        const amount = val.allowance.allowance.spend_limit.find((val1) => (val1.denom === config.COIN_MINIMAL_DENOM) &&
                            val1.amount && (val1.amount > 0.1 * (10 ** config.COIN_DECIMALS)));
                        if (amount && amount.amount) {
                            granterInfo.granter = val.granter;
                            granterInfo.amount = amount.amount / 10 ** config.COIN_DECIMALS;
                        }
                    }
                }

                return null;
            });
        }

        if ((granterInfo && granterInfo.granter && !balance) ||
            (granterInfo && granterInfo.granter && balance && (balance < 0.1))) {
            Tx.fee.granter = granterInfo.granter;
        }

        console.log('55555555', Tx);
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
                                        props.setDeListNFTFail();
                                        clearInterval(time);

                                        return;
                                    }

                                    props.setDeListNFTSuccess(res1.txhash);
                                    this.props.fetchMarketplaceNFTs(this.props.rpcClient, this.props.chainValue, this.props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
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

    const inProgress = props.signInProgress || props.broadCastInProgress || props.txHashInProgress || props.inProgress;
    return (
        <Button
            aria-label="de-list"
            className="primary_button"
            disabled={inProgress}
            onClick={handleClick}>
            {inProgress
                ? variables[props.lang]['approval_pending'] + '....'
                : variables[props.lang]['delist_nft_header']}
        </Button>
    );
};

DeListButton.propTypes = {
    address: PropTypes.string.isRequired,
    allowances: PropTypes.array.isRequired,
    aminoSignTx: PropTypes.func.isRequired,
    balance: PropTypes.array.isRequired,
    broadCastInProgress: PropTypes.bool.isRequired,
    denomValue: PropTypes.object.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchTxHash: PropTypes.func.isRequired,
    hideListQuickView: PropTypes.func.isRequired,
    hideMenuPopover: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    info: PropTypes.object.isRequired,
    keys: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    priceRange: PropTypes.array.isRequired,
    priceRangeValue: PropTypes.object.isRequired,
    setDeListNFTFail: PropTypes.func.isRequired,
    setDeListNFTSuccess: PropTypes.func.isRequired,
    setTxHashInProgressFalse: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    sign: PropTypes.func.isRequired,
    signInProgress: PropTypes.bool.isRequired,
    tokenPrice: PropTypes.string.isRequired,
    txHashInProgress: PropTypes.bool.isRequired,
    txSignAndBroadCast: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            collectionID: PropTypes.string,
        }),
    }),
    primaryButton: PropTypes.bool,
    tokenValue: PropTypes.object,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        addressIBC: state.account.wallet.connectionIBC.address,
        allowances: state.account.bc.allowances.value,
        balance: state.account.bc.balance.value,
        broadCastInProgress: state.account.wallet.broadCast.inProgress,
        lang: state.language,

        value: state.dashboard.deListNFTDialog.value,
        inProgress: state.dashboard.deList.inProgress,
        signInProgress: state.account.bc.protoBufSign.inProgress,
        txHashInProgress: state.account.bc.txHash.inProgress,
    };
};

const actionToProps = {
    aminoSignTx,
    fetchBalance,
    fetchTxHash,
    setTxHashInProgressFalse,
    showMessage,
    sign: protoBufSigning,
    txSignAndBroadCast,

    setDeListNFTSuccess,
    setDeListNFTFail,
    fetchMarketplaceNFTs,
};

export default withRouter(connect(stateToProps, actionToProps)(DeListButton));
