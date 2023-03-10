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
    txSignAndBroadCastAminoSign,
} from '../../../../actions/account/wallet';
import withRouter from '../../../../components/WithRouter';
import { showMessage } from '../../../../actions/snackbar';
// import { decodeFromBech32 } from '../../../../utils/address';
import { customTypes } from '../../../../registry';
// import { fetchAssetCards } from '../../../../actions/createAssets';
import { generateID } from '../../../../utils/generateID';
import {
    fetchMarketplaceNFTs,
    fetchMarketplaceNFTsInfo,
    setListNFTFail,
    setListNFTSuccess,
} from '../../../../actions/dashboard';
import { fetchMyNFTs } from '../../../../actions/nfts';
import { bech32 } from 'bech32';
import { fetchCollectionNFTS } from '../../../../actions/collection';
import { ChainsList } from '../../../../chains';

const ListButton = (props) => {
    const handleClick = () => {
        const price = {
            denom: 'uflix',
            amount: String(props.tokenPrice * (10 ** config.COIN_DECIMALS)),
        };

        const data = {
            id: 'list' + generateID(),
            owner: props.value && props.value.owner,
            denom_id: props.value && props.value.denom,
            nft_id: props.value && props.value.id,
            price: price,
            split_shares: [],
        };

        const valid = true;

        if (!valid) {
            props.showMessage(variables[props.lang]['invalid_address'], 'warning');

            return;
        }

        let balance = props.balance && props.balance.length && props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
        balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

        const msg = [{
            type: 'OmniFlix/marketplace/MsgListNFT',
            value: data,
        }];

        const Tx = {
            msgs: msg,
            msgType: 'ListNFT',
            fee: {
                amount: [{
                    amount: String(5000),
                    denom: config.COIN_MINIMAL_DENOM,
                }],
                gasLimit: String(300000),
            },
            memo: '',
        };

        const type = customTypes && customTypes.ListNFT && customTypes.ListNFT.typeUrl;
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

        const denomID = props.value && props.value.denom;
        const chainConfig = ChainsList && ChainsList[props.chain];

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
                                        props.setListNFTFail();
                                        clearInterval(time);

                                        return;
                                    }

                                    props.setListNFTSuccess(res1.txhash);
                                    if (props.router && props.router.params && props.router.params.id) {
                                        props.fetchCollectionNFTS(props.rpcClient, props.chainValue, denomID);
                                    } else {
                                        const address = props.address && bech32.decode(props.address);
                                        let convertedAddress = address && address.words && bech32.encode(chainConfig.PREFIX, address.words);
                                        if (props.chainValue === 'uptick') {
                                            convertedAddress = props.addressIBC && props.addressIBC.uptick;
                                        }
                                        props.fetchMyNFTs(props.rpcClient, props.chainValue, convertedAddress,
                                            DEFAULT_SKIP, DEFAULT_LIMIT, (result) => {
                                                if (result && props.chainID && (props.chainID === 'omniflix' ||
                                                    props.chainID === 'iris' || props.chainID === 'uptick')) {
                                                    props.fetchMyNFTs(props.rpcClient, props.chainID, convertedAddress, DEFAULT_SKIP, DEFAULT_LIMIT);
                                                }
                                            });
                                    }
                                    props.fetchMarketplaceNFTs(props.rpcClient, props.chainValue, props.address, DEFAULT_SKIP, DEFAULT_LIMIT, (result) => {
                                        if (result && result.length) {
                                            result.map((value) => {
                                                props.fetchMarketplaceNFTsInfo(props.rpcClient, props.chainValue, value.denomId, value.nftId);

                                                return null;
                                            });
                                        }
                                    });

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

    const disable = props.tokenPrice === '' || !(props.tokenValue && (props.tokenValue.value || props.tokenValue.ibc_denom_hash));

    const inProgress = props.signInProgress || props.broadCastInProgress ||
        // props.aminoBroadCastInProgress ||
        props.txHashInProgress || props.inProgress;
    return (
        <Button
            aria-label="confirm-listing"
            className="primary_button"
            disabled={disable || inProgress}
            variant="contained"
            onClick={handleClick}>
            {inProgress
                ? variables[props.lang]['approval_pending'] + '....'
                : variables[props.lang]['create_listing']}
        </Button>
    );
};

ListButton.propTypes = {
    address: PropTypes.string.isRequired,
    addressIBC: PropTypes.string.isRequired,
    allowances: PropTypes.array.isRequired,
    // aminoBroadCastInProgress: PropTypes.bool.isRequired,
    aminoSignTx: PropTypes.func.isRequired,
    balance: PropTypes.array.isRequired,
    broadCastInProgress: PropTypes.bool.isRequired,
    chain: PropTypes.string.isRequired,
    chainID: PropTypes.string.isRequired,
    chainValue: PropTypes.string.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchCollectionNFTS: PropTypes.func.isRequired,
    fetchMarketplaceNFTs: PropTypes.func.isRequired,
    fetchMarketplaceNFTsInfo: PropTypes.func.isRequired,
    fetchMyNFTs: PropTypes.func.isRequired,
    fetchTxHash: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        params: PropTypes.shape({
            id: PropTypes.string,
        }).isRequired,
    }).isRequired,
    rpcClient: PropTypes.any.isRequired,
    setListNFTFail: PropTypes.func.isRequired,
    setListNFTSuccess: PropTypes.func.isRequired,
    setTxHashInProgressFalse: PropTypes.func.isRequired,
    showListNFTSuccessDialog: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    sign: PropTypes.func.isRequired,
    signInProgress: PropTypes.bool.isRequired,
    tokenPrice: PropTypes.string.isRequired,
    txHashInProgress: PropTypes.bool.isRequired,
    txSignAndBroadCast: PropTypes.func.isRequired,
    txSignAndBroadCastAminoSign: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            collectionID: PropTypes.string,
        }),
    }),
    tokenValue: PropTypes.object,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        addressIBC: state.account.wallet.connectionIBC.address,
        allowances: state.account.bc.allowances.value,
        balance: state.account.bc.balance.value,
        broadCastInProgress: state.account.wallet.broadCast.inProgress,
        // aminoBroadCastInProgress: state.account.connection.inProgress,
        inProgress: state.dashboard.newListNFT.inProgress,
        lang: state.language,

        // nftListOwnedSearch: state.createAssets.nft.nftListOwned.search,
        // nftListOwnedSkip: state.createAssets.nft.nftListOwned.skip,
        // nftListOwnedTotal: state.createAssets.nft.nftListOwned.total,
        // nonListedNFTsTotal: state.createAssets.nft.nonListedCollectionNFTs.total,
        // nonListedNFTsSkip: state.createAssets.nft.nonListedCollectionNFTs.skip,
        // priceRangeValue: state.filters.priceRange.value,
        // priceRange: state.filters.priceRange.range,
        tokenValue: state.dashboard.tokenValue.value,
        tokenPrice: state.dashboard.priceValue,
        value: state.dashboard.listNFTDialog.value,
        // splitInfo: state.createAssets.listing.splitInfo.value,
        // splitInfoStatus: state.createAssets.listing.splitInfo.status,
        signInProgress: state.account.bc.protoBufSign.inProgress,
        txHashInProgress: state.account.bc.txHash.inProgress,

        chainID: state.collection.chainID,
        chainValue: state.dashboard.chainValue.value,
        chain: state.collection.transferDialog.chain,
        rpcClient: state.query.rpcClient.value,
    };
};

const actionToProps = {
    aminoSignTx,
    fetchBalance,
    fetchTxHash,
    fetchMarketplaceNFTs,
    fetchMarketplaceNFTsInfo,
    setTxHashInProgressFalse,
    showMessage,
    sign: protoBufSigning,
    txSignAndBroadCast,
    txSignAndBroadCastAminoSign,

    setListNFTSuccess,
    setListNFTFail,
    fetchMyNFTs,
    fetchCollectionNFTS,
};

export default withRouter(connect(stateToProps, actionToProps)(ListButton));
