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
import { setTabValue } from '../../actions/dashboard';
import { setRpcClient } from '../../actions/query';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '../../config';
import { list } from '../../utils/defaultOptions';
import AllCollectionsTable from './Tables/AllCollectionsTable';
import WasmAllCollectionsTable from './Tables/WasmAllCollectionsTable';
import { fetchWasmAllCollections } from '../../actions/collections/wasm';
import { ChainsList } from '../../chains';

class Dashboard extends Component {
    constructor (props) {
        super(props);

        this.handleCreateCollection = this.handleCreateCollection.bind(this);
        this.handleFetch = this.handleFetch.bind(this);
    }

    componentDidMount () {
        if (this.props.tabValue === 'my_collections' && !this.props.collectionsInProgress && this.props.chainValue &&
            !this.props.collections[this.props.chainValue] && this.props.address !== '' && this.props.rpcClient &&
            this.props.rpcClient[this.props.chainValue]) {
            this.props.fetchCollections(this.props.rpcClient, this.props.chainValue, this.props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
        } else if (this.props.tabValue === 'all_collections' && !this.props.allCollectionsInProgress && this.props.chainValue &&
            !this.props.allCollections[this.props.chainValue] && this.props.rpcClient && this.props.rpcClient[this.props.chainValue]) {
            this.props.fetchAllCollections(this.props.rpcClient, this.props.chainValue, DEFAULT_SKIP, DEFAULT_LIMIT);
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
            this.props.fetchCollections(this.props.rpcClient, this.props.chainValue, this.props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
        }
        if (this.props.rpcClient && pp.rpcClient !== this.props.rpcClient &&
            this.props.rpcClient[this.props.chainValue]) {
            if (this.props.tabValue === 'all_collections') {
                this.props.fetchAllCollections(this.props.rpcClient, this.props.chainValue, DEFAULT_SKIP, DEFAULT_LIMIT);
            } else if (this.props.tabValue === 'my_collections' && this.props.address !== '') {
                this.props.fetchCollections(this.props.rpcClient, this.props.chainValue, this.props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
            }
        }
        if (this.props.chainValue && this.props.contracts && pp.contracts && !pp.contracts[this.props.chainValue] &&
            this.props.contracts[this.props.chainValue] && this.props.contracts[this.props.chainValue].value) {
            const config = ChainsList && ChainsList[this.props.chainValue];
            this.handleFetch(0, config, this.props.contracts[this.props.chainValue].value);
        }
    }

    handleCreateCollection () {
        this.props.router.navigate('/' + this.props.chainValue + '/create-collection');
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
            if (index + 3 < data.length - 1) {
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
                    {this.props.tabValue === 'my_collections' &&
                        <div className="data_table collection_data_table"><CollectionsTable/></div>}
                    {this.props.tabValue === 'all_collections' &&
                        <div className="data_table">
                            {list.map((item, index) => {
                                return (
                                    item && item.value && item.value === 'stargaze' && (item.value === this.props.chainValue)
                                        ? <WasmAllCollectionsTable key={index}/>
                                        : item && item.value && (item.value === this.props.chainValue) &&
                                        <AllCollectionsTable key={index}/>
                                );
                            })}
                        </div>}
                    {this.props.tabValue === 'nfts' &&
                        <div className="data_table nfts_table"><NFTsTable/></div>}
                    {this.props.tabValue === 'ibc_nfts' &&
                        <div className="data_table nfts_table"><IBCNFTsTable/></div>}
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    address: PropTypes.string.isRequired,
    allCollections: PropTypes.object.isRequired,
    allCollectionsInProgress: PropTypes.bool.isRequired,
    chainValue: PropTypes.string.isRequired,
    collections: PropTypes.object.isRequired,
    collectionsInProgress: PropTypes.bool.isRequired,
    contracts: PropTypes.object.isRequired,
    contractsInProgress: PropTypes.bool.isRequired,
    fetchAllCollections: PropTypes.func.isRequired,
    fetchCollections: PropTypes.func.isRequired,
    fetchWasmAllCollections: PropTypes.func.isRequired,
    keys: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
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
    };
};

const actionsToProps = {
    fetchCollections,
    fetchAllCollections,
    fetchWasmAllCollections,
    setTabValue,
    setRpcClient,
};

export default withRouter(connect(stateToProps, actionsToProps)(Dashboard));
