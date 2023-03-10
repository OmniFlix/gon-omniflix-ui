import React, { Component } from 'react';
import './index.css';
import ChainPopover from './ChainPopover';
import Tabs from './Tabs';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CollectionsTable from './Tables/CollectionsTable';
import NFTsTable from './Tables/NFTsTable';
import IBCNFTsTable from './Tables/IBCNFTsTable';
import { fetchAllCollections, fetchCollections } from '../../actions/collections';
import withRouter from '../../components/WithRouter';
import { fetchMarketplaceNFTs, fetchMarketplaceNFTsInfo, setTabValue } from '../../actions/dashboard';
import { setRpcClient } from '../../actions/query';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '../../config';
import { list } from '../../utils/defaultOptions';
import AllCollectionsTable from './Tables/AllCollectionsTable';
import WasmAllCollectionsTable from './Tables/WasmAllCollectionsTable';
import { fetchWasmAllCollections } from '../../actions/collections/wasm';
import { ChainsList } from '../../chains';
import { fetchMyNFTs, fetchMyNFTsInfo } from '../../actions/nfts';
import { bech32 } from 'bech32';
import MyNFTsTable from './Tables/MyNFTsTable';
import TransferDialog from '../SingleCollection/TransferDialog';
import BurnDialog from '../SingleCollection/BurnDialog';
import { fetchCollectionHash } from '../../actions/collection';
import { fetchWasmCollectionHash } from '../../actions/collection/wasm';
import ListNFTDialog from './MarketPlace/ListNFTDialog';
import DeListDialog from './MarketPlace/DeListDialog';
import MarketplaceTable from './Tables/MarketplaceTable';

class Dashboard extends Component {
    constructor (props) {
        super(props);

        this.handleCreateCollection = this.handleCreateCollection.bind(this);
        this.handleFetch = this.handleFetch.bind(this);
        this.handleNFTFetch = this.handleNFTFetch.bind(this);
        this.handleFetchHash = this.handleFetchHash.bind(this);
    }

    componentDidMount () {
        if (this.props.tabValue === 'my_collections' && !this.props.collectionsInProgress && this.props.chainValue &&
            !this.props.collections[this.props.chainValue] && this.props.address !== '' && this.props.rpcClient &&
            this.props.rpcClient[this.props.chainValue] && this.props.chainValue === 'omniflix') {
            this.props.fetchCollections(this.props.rpcClient, this.props.chainValue, this.props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
        } else if (this.props.tabValue === 'all_collections' && !this.props.allCollectionsInProgress && this.props.chainValue &&
            !this.props.allCollections[this.props.chainValue] && this.props.rpcClient && this.props.rpcClient[this.props.chainValue]) {
            this.props.fetchAllCollections(this.props.rpcClient, this.props.chainValue, DEFAULT_SKIP, DEFAULT_LIMIT);
        } else if (this.props.tabValue === 'my_nfts' && !this.props.myNFTsInProgress && this.props.chainValue &&
            !this.props.myNFTs[this.props.chainValue] && this.props.rpcClient && this.props.rpcClient[this.props.chainValue]) {
            const prefix = this.props.chainValue && ChainsList[this.props.chainValue] && ChainsList[this.props.chainValue].PREFIX;
            let convertedAddress = this.props.address;
            if (prefix && prefix !== 'omniflix') {
                const address = this.props.address && bech32.decode(this.props.address);
                convertedAddress = address && address.words && bech32.encode(prefix, address.words);
            }
            if (prefix === 'uptick') {
                convertedAddress = this.props.addressIBC && this.props.addressIBC.uptick;
            }

            this.props.fetchMyNFTs(this.props.rpcClient, this.props.chainValue, convertedAddress, DEFAULT_SKIP, DEFAULT_LIMIT);
        } else if (this.props.tabValue === 'marketplace' && !this.props.marketplaceNFTsInProgress && this.props.chainValue &&
            !this.props.marketplaceNFTs[this.props.chainValue] && this.props.rpcClient && this.props.rpcClient[this.props.chainValue]) {
            this.props.fetchMarketplaceNFTs(this.props.rpcClient, this.props.chainValue, this.props.address,
                DEFAULT_SKIP, DEFAULT_LIMIT, (result) => {
                    if (result && result.length) {
                        result.map((value) => {
                            this.props.fetchMarketplaceNFTsInfo(this.props.rpcClient, this.props.chainValue, value.denomId, value.nftId, value.id);

                            return null;
                        });
                    }
                });
        }

        if (this.props.contracts && this.props.contracts[this.props.chainValue] && this.props.contracts[this.props.chainValue].value &&
            !this.props.contractsInProgress && this.props.wasmAllCollections && !this.props.wasmAllCollections[this.props.chainValue]) {
            const config = ChainsList && ChainsList[this.props.chainValue];
            this.handleFetch(0, config, this.props.contracts[this.props.chainValue].value);
        }
    }

    componentDidUpdate (pp, ps, ss) {
        if (this.props.address !== '' && pp.address !== this.props.address && this.props.rpcClient &&
            this.props.rpcClient[this.props.chainValue]) {
            if (this.props.chainValue === 'omniflix') {
                this.props.fetchCollections(this.props.rpcClient, this.props.chainValue, this.props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
            }
            if (!this.props.rpcClientInProgress) {
                if (this.props.tabValue === 'all_collections') {
                    this.props.fetchAllCollections(this.props.rpcClient, this.props.chainValue, DEFAULT_SKIP, DEFAULT_LIMIT);
                } else if (this.props.tabValue === 'my_collections' && this.props.address !== '' && this.props.chainValue === 'omniflix') {
                    this.props.fetchCollections(this.props.rpcClient, this.props.chainValue, this.props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
                } else if (this.props.tabValue === 'my_nfts' && this.props.chainValue) {
                    const prefix = this.props.chainValue && ChainsList[this.props.chainValue] && ChainsList[this.props.chainValue].PREFIX;
                    let convertedAddress = this.props.address;
                    if (prefix && prefix !== 'omniflix') {
                        const address = this.props.address && bech32.decode(this.props.address);
                        convertedAddress = address && address.words && bech32.encode(prefix, address.words);
                    }
                    if (prefix === 'uptick') {
                        convertedAddress = this.props.addressIBC && this.props.addressIBC.uptick;
                    }

                    this.props.fetchMyNFTs(this.props.rpcClient, this.props.chainValue, convertedAddress, DEFAULT_SKIP, DEFAULT_LIMIT);
                }
            }
        }
        if (this.props.rpcClient && pp.rpcClient && !pp.rpcClient[this.props.chainValue] &&
            this.props.rpcClient[this.props.chainValue] && !this.props.rpcClientInProgress) {
            if (this.props.tabValue === 'all_collections') {
                this.props.fetchAllCollections(this.props.rpcClient, this.props.chainValue, DEFAULT_SKIP, DEFAULT_LIMIT);
            } else if (this.props.tabValue === 'my_collections' && this.props.address !== '' && this.props.chainValue === 'omniflix') {
                this.props.fetchCollections(this.props.rpcClient, this.props.chainValue, this.props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
            } else if (this.props.tabValue === 'my_nfts' && this.props.address !== '' && this.props.chainValue) {
                const prefix = this.props.chainValue && ChainsList[this.props.chainValue] && ChainsList[this.props.chainValue].PREFIX;
                let convertedAddress = this.props.address;
                if (prefix && prefix !== 'omniflix') {
                    const address = this.props.address && bech32.decode(this.props.address);
                    convertedAddress = address && address.words && bech32.encode(prefix, address.words);
                }
                if (prefix === 'uptick') {
                    convertedAddress = this.props.addressIBC && this.props.addressIBC.uptick;
                }

                this.props.fetchMyNFTs(this.props.rpcClient, this.props.chainValue, convertedAddress, DEFAULT_SKIP, DEFAULT_LIMIT);
            }
        }
        if (this.props.chainValue && this.props.contracts && pp.contracts && !pp.contracts[this.props.chainValue] &&
            this.props.contracts[this.props.chainValue] && this.props.contracts[this.props.chainValue].value) {
            const config = ChainsList && ChainsList[this.props.chainValue];
            this.handleFetch(0, config, this.props.contracts[this.props.chainValue].value);
        }
        if ((this.props.chainValue && this.props.myNFTs && pp.myNFTs &&
                !pp.myNFTs[this.props.chainValue] && this.props.myNFTs[this.props.chainValue]) ||
            (this.props.chainValue && this.props.myNFTs && pp.myNFTs &&
                pp.myNFTs[this.props.chainValue] && !this.props.myNFTsInfo[this.props.chainValue])) {
            if (this.props.myNFTs[this.props.chainValue].value && this.props.myNFTs[this.props.chainValue].value.length) {
                this.props.myNFTs[this.props.chainValue].value.map((value) => {
                    if (this.props.chainValue === 'omniflix') {
                        this.handleNFTFetch(0, value.onftIds, value.denomId);
                    } else {
                        this.handleNFTFetch(0, value.tokenIds, value.denomId);
                    }

                    return null;
                });
            }
        }
        if (this.props.collections && this.props.chainValue && this.props.collections[this.props.chainValue] &&
            pp.collections && pp.collections[this.props.chainValue] && pp.collections[this.props.chainValue].value &&
            this.props.collections[this.props.chainValue].value && this.props.collections[this.props.chainValue].value.length &&
            this.props.rpcClient && Object.keys(this.props.rpcClient).length === 5 &&
            (Object.keys(pp.rpcClient).length === 4 || !pp.collections[this.props.chainValue].value)) {
            this.handleFetchHash(0, this.props.collections[this.props.chainValue].value);
        }
        if (this.props.rpcClient && pp.rpcClient && !pp.rpcClient[this.props.chainValue] &&
            this.props.rpcClient[this.props.chainValue] && !this.props.rpcClientInProgress) {
            if (this.props.tabValue === 'marketplace' && this.props.chainValue) {
                this.props.fetchMarketplaceNFTs(this.props.rpcClient, this.props.chainValue, this.props.address,
                    DEFAULT_SKIP, DEFAULT_LIMIT, (result) => {
                        if (result && result.length) {
                            result.map((value) => {
                                this.props.fetchMarketplaceNFTsInfo(this.props.rpcClient, this.props.chainValue, value.denomId, value.nftId, value.id);

                                return null;
                            });
                        }
                    });
            }
        }
    }

    handleCreateCollection () {
        this.props.router.navigate('/' + this.props.chainValue + '/create-collection');
    }

    handleNFTFetch (index, data, denom) {
        const array = [];
        for (let i = 0; i < 3; i++) {
            if (data[index + i]) {
                const value = data[index + i];
                if (value) {
                    array.push(this.props.fetchMyNFTsInfo(this.props.rpcClient, this.props.chainValue, denom, value));
                }
            } else {
                break;
            }
        }

        Promise.all(array).then(() => {
            if (index + 3 < data.length) {
                this.handleNFTFetch(index + 3, data, denom);
            }
        });
    }

    handleFetch (index, config, data) {
        const array = [];
        for (let i = 0; i < 3; i++) {
            if (data[index + i]) {
                const value = data[index + i];
                if (value) {
                    array.push(this.props.fetchWasmAllCollections(config, this.props.chainValue, value));
                }
            } else {
                break;
            }
        }

        Promise.all(array).then(() => {
            if (index + 3 < data.length) {
                this.handleFetch(index + 3, config, data);
            }
        });
    }

    handleFetchHash (index, data) {
        const array = [];
        if (data[index]) {
            const value = data[index];
            if (value) {
                Object.keys(ChainsList).map((item, index) => {
                    if (item === 'omniflix') {
                        return null;
                    }

                    const config = ChainsList && ChainsList[item];
                    if (item === 'stargaze' || item === 'juno') {
                        const hash = `wasm.${config.CONTRACT_ADDRESS}/${config.CHANNELS && config.CHANNELS[this.props.chainValue] &&
                        config.CHANNELS[this.props.chainValue][0]}/${value && value.id}`;
                        this.props.fetchWasmCollectionHash(config, item, hash, value.id);

                        return null;
                    }

                    const hash = `nft-transfer/${config.CHANNELS && config.CHANNELS[this.props.chainValue] &&
                    config.CHANNELS[this.props.chainValue][0]}/${value && value.id}`;
                    array.push(this.props.fetchCollectionHash(this.props.rpcClient, item, hash, value.id));

                    return null;
                });
            }
        }

        Promise.all(array).then(() => {
            if (index + 1 < data.length) {
                this.handleFetchHash(index + 1, data);
            }
        });
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
                    {this.props.tabValue === 'my_collections' &&
                        <div className="data_table collection_data_table"><CollectionsTable/></div>}
                    {this.props.tabValue === 'all_collections' &&
                        <div className="data_table">
                            {list.map((item, index) => {
                                return (
                                    item && item.value && item.cosmwasm && (item.value === this.props.chainValue)
                                        ? <WasmAllCollectionsTable key={index}/>
                                        : item && item.value && (item.value === this.props.chainValue) &&
                                        <AllCollectionsTable key={index}/>
                                );
                            })}
                        </div>}
                    {this.props.tabValue === 'my_nfts' &&
                        <div className="data_table">
                            {list.map((item, index) => {
                                return (
                                    item && item.value && (item.value === this.props.chainValue) &&
                                    <MyNFTsTable key={index}/>
                                );
                            })}
                        </div>}
                    {this.props.tabValue === 'marketplace' &&
                        <div className="data_table">
                            {list.map((item, index) => {
                                return (
                                    item && item.value && (item.value === this.props.chainValue) &&
                                    <MarketplaceTable key={index}/>
                                );
                            })}
                        </div>}
                    {this.props.tabValue === 'nfts' &&
                        <div className="data_table nfts_table"><NFTsTable/></div>}
                    {this.props.tabValue === 'ibc_nfts' &&
                        <div className="data_table nfts_table"><IBCNFTsTable/></div>}
                    <TransferDialog/>
                    <BurnDialog/>
                    <ListNFTDialog/>
                    <DeListDialog/>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    address: PropTypes.string.isRequired,
    addressIBC: PropTypes.object.isRequired,
    allCollections: PropTypes.object.isRequired,
    allCollectionsInProgress: PropTypes.bool.isRequired,
    chainValue: PropTypes.string.isRequired,
    collections: PropTypes.object.isRequired,
    collectionsInProgress: PropTypes.bool.isRequired,
    contracts: PropTypes.object.isRequired,
    contractsInProgress: PropTypes.bool.isRequired,
    fetchAllCollections: PropTypes.func.isRequired,
    fetchCollectionHash: PropTypes.func.isRequired,
    fetchCollections: PropTypes.func.isRequired,
    fetchMarketplaceNFTs: PropTypes.func.isRequired,
    fetchMarketplaceNFTsInfo: PropTypes.func.isRequired,
    fetchMyNFTs: PropTypes.func.isRequired,
    fetchMyNFTsInfo: PropTypes.func.isRequired,
    fetchWasmAllCollections: PropTypes.func.isRequired,
    fetchWasmCollectionHash: PropTypes.func.isRequired,
    keys: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    marketplaceNFTs: PropTypes.object.isRequired,
    marketplaceNFTsInProgress: PropTypes.bool.isRequired,
    marketplaceNFTsInfo: PropTypes.object.isRequired,
    myNFTs: PropTypes.object.isRequired,
    myNFTsInProgress: PropTypes.bool.isRequired,
    myNFTsInfo: PropTypes.object.isRequired,
    rpcClient: PropTypes.any.isRequired,
    rpcClientInProgress: PropTypes.bool.isRequired,
    setRpcClient: PropTypes.func.isRequired,
    setTabValue: PropTypes.func.isRequired,
    tabValue: PropTypes.string.isRequired,
    wasmAllCollections: PropTypes.object.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
        }).isRequired,
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
        myNFTs: state.nfts.myNFTs.value,
        myNFTsInProgress: state.nfts.myNFTs.inProgress,
        myNFTsInfo: state.nfts.myNFTsInfo.value,
        marketplaceNFTs: state.dashboard.marketplaceNFTs.value,
        marketplaceNFTsInProgress: state.dashboard.marketplaceNFTs.inProgress,
        marketplaceNFTsInfo: state.dashboard.marketplaceNFTsInfo.value,
    };
};

const actionsToProps = {
    fetchCollectionHash,
    fetchCollections,
    fetchAllCollections,
    fetchWasmAllCollections,
    fetchWasmCollectionHash,
    fetchMarketplaceNFTs,
    fetchMarketplaceNFTsInfo,
    fetchMyNFTs,
    fetchMyNFTsInfo,
    setTabValue,
    setRpcClient,
};

export default withRouter(connect(stateToProps, actionsToProps)(Dashboard));
