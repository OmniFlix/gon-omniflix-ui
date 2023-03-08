import React, { Component } from 'react';
import './index.css';
import ChainPopover from './ChainPopover';
import Tabs from './Tabs';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCollections } from '../../actions/collections';
import withRouter from '../../components/WithRouter';
import { setTabValue } from '../../actions/dashboard';
import { setRpcClient } from '../../actions/query';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '../../config';
import { list } from '../../utils/defaultOptions';
import { fetchWasmAllCollections } from '../../actions/collections/wasm';
import { ChainsList } from '../../chains';
import { fetchMyNFTs, fetchMyNFTsInfo } from '../../actions/nfts';
import { bech32 } from 'bech32';
import TransferDialog from '../SingleCollection/TransferDialog';
import BurnDialog from '../SingleCollection/BurnDialog';
import MarketplaceTable from './Tables/MarketplaceTable';

class MarketPlace extends Component {
    constructor (props) {
        super(props);

        this.handleCreateCollection = this.handleCreateCollection.bind(this);
        this.handleFetch = this.handleFetch.bind(this);
        this.handleNFTFetch = this.handleNFTFetch.bind(this);
    }

    componentDidMount () {
        if (this.props.tabValue === 'marketplace' && !this.props.myNFTsInProgress && this.props.chainValue &&
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
        }

        if (this.props.contracts && this.props.contracts[this.props.chainValue] && this.props.contracts[this.props.chainValue].value &&
            !this.props.contractsInProgress && this.props.wasmAllCollections && !this.props.wasmAllCollections[this.props.chainValue]) {
            const config = ChainsList && ChainsList[this.props.chainValue];
            this.handleFetch(0, config, this.props.contracts[this.props.chainValue].value);
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
                    <TransferDialog/>
                    <BurnDialog/>
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
    fetchMyNFTs: PropTypes.func.isRequired,
    fetchMyNFTsInfo: PropTypes.func.isRequired,
    fetchWasmAllCollections: PropTypes.func.isRequired,
    keys: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
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
    };
};

const actionsToProps = {
    fetchCollections,
    fetchWasmAllCollections,
    fetchMyNFTs,
    fetchMyNFTsInfo,
    setTabValue,
    setRpcClient,
};

export default withRouter(connect(stateToProps, actionsToProps)(MarketPlace));
