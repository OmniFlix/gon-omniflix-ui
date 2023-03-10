import React, { Component } from 'react';
import '../index.css';
import './index.css';
import ChainPopover from '../ChainPopover';
import Tabs from '../Tabs';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCollections } from '../../../actions/collections';
import withRouter from '../../../components/WithRouter';
import { fetchMarketplaceNFTs, fetchMarketplaceNFTsInfo, setTabValue } from '../../../actions/dashboard';
import { setRpcClient } from '../../../actions/query';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '../../../config';
import { list } from '../../../utils/defaultOptions';
import { fetchMyNFTsInfo } from '../../../actions/nfts';
import MarketplaceTable from '../Tables/MarketplaceTable';
import DeListDialog from './DeListDialog';

class MarketPlace extends Component {
    componentDidMount () {
        if (this.props.tabValue === 'marketplace' && !this.props.marketplaceNFTsInProgress && this.props.chainValue &&
            !this.props.marketplaceNFTs[this.props.chainValue] && this.props.rpcClient && this.props.rpcClient[this.props.chainValue]) {
            this.props.fetchMarketplaceNFTs(this.props.rpcClient, this.props.chainValue, this.props.address,
                DEFAULT_SKIP, DEFAULT_LIMIT, (result) => {
                    if (result && result.length) {
                        result.map((value) => {
                            this.props.fetchMarketplaceNFTsInfo(this.props.rpcClient, this.props.chainValue, value.denomId, value.nftId);

                            return null;
                        });
                    }
                });
        }
    }

    componentDidUpdate (pp, ps, ss) {
        if (this.props.address !== '' && pp.address !== this.props.address && this.props.rpcClient &&
            this.props.rpcClient[this.props.chainValue] && this.props.chainValue === 'omniflix') {
            this.props.fetchCollections(this.props.rpcClient, this.props.chainValue, this.props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
        }
        if (this.props.rpcClient && pp.rpcClient && !pp.rpcClient[this.props.chainValue] &&
            this.props.rpcClient[this.props.chainValue] && !this.props.rpcClientInProgress) {
            if (this.props.tabValue === 'marketplace' && this.props.chainValue) {
                this.props.fetchMarketplaceNFTs(this.props.rpcClient, this.props.chainValue, this.props.address,
                    DEFAULT_SKIP, DEFAULT_LIMIT, (result) => {
                        if (result && result.length) {
                            result.map((value) => {
                                this.props.fetchMarketplaceNFTsInfo(this.props.rpcClient, this.props.chainValue, value.denomId, value.nftId);

                                return null;
                            });
                        }
                    });
            }
        }

        if ((this.props.chainValue && this.props.marketplaceNFTs && pp.marketplaceNFTs &&
                !pp.marketplaceNFTs[this.props.chainValue] && this.props.marketplaceNFTs[this.props.chainValue]) ||
            (this.props.chainValue && this.props.marketplaceNFTs && pp.marketplaceNFTs &&
                pp.marketplaceNFTs[this.props.chainValue])) {
            if (this.props.marketplaceNFTs[this.props.chainValue].value && this.props.marketplaceNFTs[this.props.chainValue].value.length) {
                this.props.marketplaceNFTs[this.props.chainValue].value.map((value, index) => {
                    this.handleNFTFetch(index, value.nftId, value.denomId, value.id);

                    return null;
                });
            }
        }
    }

    handleNFTFetch (index, data, denom, listID) {
        this.props.fetchMarketplaceNFTsInfo(this.props.rpcClient, this.props.chainValue, denom, data, listID);
    }

    render () {
        return (
            <div className="home scroll_bar">
                <ChainPopover/>
                <p className="border"/>
                <div className="header">
                    <div className="left_section">
                        <Tabs/>
                    </div>
                </div>
                <div className="page_section">
                    {this.props.tabValue === 'marketplace' &&
                        <div className="data_table">
                            {list.map((item, index) => {
                                return (
                                    item && item.value && (item.value === this.props.chainValue) &&
                                    <MarketplaceTable key={index}/>
                                );
                            })}
                        </div>}
                    <DeListDialog/>
                </div>
            </div>
        );
    }
}

MarketPlace.propTypes = {
    address: PropTypes.string.isRequired,
    addressIBC: PropTypes.object.isRequired,
    allCollections: PropTypes.object.isRequired,
    allCollectionsInProgress: PropTypes.bool.isRequired,
    chainValue: PropTypes.string.isRequired,
    collections: PropTypes.object.isRequired,
    collectionsInProgress: PropTypes.bool.isRequired,
    contracts: PropTypes.object.isRequired,
    contractsInProgress: PropTypes.bool.isRequired,
    fetchCollections: PropTypes.func.isRequired,
    fetchMarketplaceNFTs: PropTypes.func.isRequired,
    fetchMarketplaceNFTsInfo: PropTypes.func.isRequired,
    fetchMyNFTsInfo: PropTypes.func.isRequired,
    keys: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    marketplaceNFTs: PropTypes.object.isRequired,
    marketplaceNFTsInProgress: PropTypes.bool.isRequired,
    rpcClient: PropTypes.any.isRequired,
    rpcClientInProgress: PropTypes.bool.isRequired,
    setRpcClient: PropTypes.func.isRequired,
    setTabValue: PropTypes.func.isRequired,
    tabValue: PropTypes.string.isRequired,
    wasmAllCollections: PropTypes.object.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }),
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        addressIBC: state.account.wallet.connectionIBC.address,
        allCollections: state.collections.allCollectionSList.value,
        allCollectionsInProgress: state.collections.allCollectionSList.inProgress,
        chainValue: state.dashboard.chainValue.value,
        collections: state.collections.collectionSList.value,
        collectionsInProgress: state.collections.collectionSList.inProgress,
        contracts: state.cosmwasm.contracts.value,
        contractsInProgress: state.cosmwasm.contracts.inProgress,
        keys: state.account.wallet.connection.keys,
        lang: state.language,
        rpcClient: state.query.rpcClient.value,
        rpcClientInProgress: state.query.rpcClient.inProgress,
        tabValue: state.dashboard.tabValue.value,
        wasmAllCollections: state.collections._wasm.allCollectionSList.value,
        marketplaceNFTs: state.dashboard.marketplaceNFTs.value,
        marketplaceNFTsInProgress: state.dashboard.marketplaceNFTs.inProgress,
    };
};

const actionsToProps = {
    fetchCollections,
    fetchMarketplaceNFTs,
    fetchMyNFTsInfo,
    setTabValue,
    setRpcClient,
    fetchMarketplaceNFTsInfo,
};

export default withRouter(connect(stateToProps, actionsToProps)(MarketPlace));
