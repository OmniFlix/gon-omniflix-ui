import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import Info from './Info';
import NFTsTable from '../Dashboard/Tables/NFTsTable';
import variables from '../../utils/variables';
import '../Dashboard/index.css';
import { fetchCollectionNFTS, fetchCollectionTrace, setTraceCollection } from '../../actions/collection';
import withRouter from '../../components/WithRouter';
import CircularProgress from '../../components/CircularProgress';
import NoData from '../../components/NoData';
import DotsLoading from '../../components/DotsLoading';
import { setTabValue } from '../../actions/dashboard';
import TransferDialog from './TransferDialog';
import BurnDialog from './BurnDialog';
import { ibcName, ibcSymbol } from '../../utils/ibcData';
import { setRpcClient } from '../../actions/query';
import { fetchWasmCollection, fetchWasmCollectionNFTS, fetchWasmNFTInfo } from '../../actions/collection/wasm';
import { ChainsList } from '../../chains';
import WasmInfo from './WasmInfo';
import WasmNFTsTable from '../Dashboard/Tables/WasmNFTsTable';

class SingleCollection extends Component {
    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleExport = this.handleExport.bind(this);
        this.handleFetch = this.handleFetch.bind(this);
    }

    componentDidMount () {
        if (this.props.router && this.props.router.params && this.props.router.params.id && !this.props.inProgress &&
            this.props.rpcClient && this.props.rpcClient[this.props.chainValue] && !this.props.rpcClientInProgress) {
            const updatedID = this.props.router.params.id.replaceAll('_', '/');
            this.props.fetchCollectionNFTS(this.props.rpcClient, this.props.chainValue, updatedID);
        } else if (this.props.router && this.props.router.params && this.props.router.params.id && !this.props.contractsInProgress &&
            this.props.contracts && this.props.contracts[this.props.chainValue] && !this.props.nftsInProgress) {
            const config = ChainsList && ChainsList[this.props.router.params.chain];
            this.props.fetchWasmCollection(config, this.props.router.params.chain, this.props.router.params.id);
            this.props.fetchWasmCollectionNFTS(config, this.props.router.params.id, (result) => {
                if (result && result.tokens && result.tokens.length) {
                    this.handleFetch(0, config, result.tokens);
                }
            });
        }
        if (this.props.router && this.props.router.params && this.props.router.params.id &&
            this.props.rpcClient && this.props.rpcClient[this.props.chainValue] && !this.props.rpcClientInProgress) {
            const hash = this.props.router.params.id.replace('ibc_', '');
            this.props.fetchCollectionTrace(this.props.rpcClient, this.props.chainValue, hash, (result) => {
                const text = (result && result.baseClassId).includes('onftdenom');
                if (text) {
                    this.props.setTraceCollection(text, result);
                }
            });
        }
    }

    componentDidUpdate (pp, ps, ss) {
        if (this.props.chainValue && this.props.rpcClient && pp.rpcClient &&
            !pp.rpcClient[this.props.chainValue] && this.props.rpcClient[this.props.chainValue]) {
            const updatedID = this.props.router.params.id.replaceAll('_', '/');
            this.props.fetchCollectionNFTS(this.props.rpcClient, this.props.chainValue, updatedID);
        }
        if ((this.props.router && this.props.router.params && this.props.router.params.id) &&
            (this.props.chainValue && this.props.rpcClient && pp.rpcClient &&
                !pp.rpcClient[this.props.chainValue] && this.props.rpcClient[this.props.chainValue])) {
            const hash = this.props.router.params.id.replace('ibc_', '');
            this.props.fetchCollectionTrace(this.props.rpcClient, this.props.chainValue, hash, (result) => {
                const text = (result && result.baseClassId).includes('onftdenom');
                if (text) {
                    this.props.setTraceCollection(text, result);
                }
            });
        }
        if (this.props.chainValue && this.props.contracts && pp.contracts && !pp.contracts[this.props.chainValue] &&
            this.props.contracts[this.props.chainValue] && this.props.contracts[this.props.chainValue].value &&
            this.props.router && this.props.router.params && this.props.router.params.id && !this.props.contractsInProgress &&
            !this.props.nftsInProgress) {
            const config = ChainsList && ChainsList[this.props.router.params.chain];
            this.props.fetchWasmCollection(config, this.props.router.params.chain, this.props.router.params.id);
            this.props.fetchWasmCollectionNFTS(config, this.props.router.params.id, (result) => {
                if (result && result.tokens && result.tokens.length) {
                    this.handleFetch(0, config, result.tokens);
                }
            });
        }
    }

    handleClick () {
        this.props.setTabValue(this.props.tabValue);
        this.props.router.navigate('/' + this.props.chainValue + '/dashboard');
    }

    handleExport (data) {
        if (data && data.baseClassId) {
            this.props.router.navigate(`/omniflix/collection/${data.baseClassId}`);
            this.props.fetchCollectionNFTS(this.props.rpcClient, this.props.chainValue, data.baseClassId);
        }
    }

    handleFetch (index, config, data) {
        const array = [];
        for (let i = 0; i < 3; i++) {
            if (data[index + i]) {
                const value = data[index + i];
                if (value) {
                    array.push(this.props.fetchWasmNFTInfo(config, this.props.router.params.id, value));
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
        const config = ChainsList && ChainsList[this.props.router.params.chain];
        let data = this.props.collection && this.props.collection.denom && this.props.collection.denom.data;
        data = data && JSON.parse(data);

        return (
            <div className="home single_collection scroll_bar">
                <div className="breadcrumb">
                    <p onClick={this.handleClick}>{variables[this.props.lang].collections}{' '}</p>
                    <span>/</span>
                    {this.props.inProgress
                        ? <DotsLoading/>
                        : config && config.cosmwasm && this.props.wasmCollections &&
                        this.props.router && this.props.router.params && this.props.router.params.id
                            ? <div>{this.props.wasmCollections.name || this.props.wasmCollections.symbol}</div>
                            : this.props.collection && this.props.collection.denom
                                ? <div>{this.props.collection.denom.symbol ||
                                    this.props.collection.denom.name ||
                                    (data && ibcSymbol(data)) ||
                                    (data && ibcName(data))}</div>
                                : null}
                </div>
                {this.props.inProgress
                    ? <CircularProgress/>
                    : config && config.cosmwasm && this.props.wasmCollections &&
                    this.props.router && this.props.router.params && this.props.router.params.id
                        ? <div className="coll_page">
                            <WasmInfo handleExport={this.handleExport} value={this.props.wasmCollections}/>
                            <div className="data_table nfts_table">
                                <WasmNFTsTable/>
                            </div>
                        </div>
                        : this.props.collection && this.props.collection.denom
                            ? <div className="coll_page">
                                <Info handleExport={this.handleExport}/>
                                <div className="data_table nfts_table">
                                    <NFTsTable/>
                                </div>
                            </div> : <NoData/>}
                <TransferDialog/>
                <BurnDialog/>
            </div>
        );
    }
}

SingleCollection.propTypes = {
    address: PropTypes.string.isRequired,
    chainValue: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    contracts: PropTypes.object.isRequired,
    contractsInProgress: PropTypes.bool.isRequired,
    fetchCollectionNFTS: PropTypes.func.isRequired,
    fetchCollectionTrace: PropTypes.func.isRequired,
    fetchWasmCollection: PropTypes.func.isRequired,
    fetchWasmCollectionNFTS: PropTypes.func.isRequired,
    fetchWasmNFTInfo: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    inProgressTrace: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    nfts: PropTypes.object.isRequired,
    nftsInProgress: PropTypes.bool.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        params: PropTypes.shape({
            chain: PropTypes.string,
            id: PropTypes.string,
        }).isRequired,
    }).isRequired,
    rpcClient: PropTypes.any.isRequired,
    rpcClientInProgress: PropTypes.bool.isRequired,
    setRpcClient: PropTypes.func.isRequired,
    setTabValue: PropTypes.func.isRequired,
    setTraceCollection: PropTypes.func.isRequired,
    tabValue: PropTypes.string.isRequired,
    wasmCollections: PropTypes.object.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        chainValue: state.dashboard.chainValue.value,
        collection: state.collection.collection.value,
        contracts: state.cosmwasm.contracts.value,
        contractsInProgress: state.cosmwasm.contracts.inProgress,
        inProgress: state.collection.collection.inProgress,
        lang: state.language,
        rpcClient: state.query.rpcClient.value,
        rpcClientInProgress: state.query.rpcClient.inProgress,
        tabValue: state.dashboard.tabValue.value,
        inProgressTrace: state.collection.collectionTrace.inProgress,
        nfts: state.collection._wasm.nfts.value,
        nftsInProgress: state.collection._wasm.nfts.inProgress,
        wasmCollections: state.collection._wasm.collection.value,
    };
};

const actionToProps = {
    fetchCollectionNFTS,
    fetchWasmCollection,
    fetchWasmCollectionNFTS,
    fetchWasmNFTInfo,
    setTabValue,
    setRpcClient,
    fetchCollectionTrace,
    setTraceCollection,
};

export default withRouter(connect(stateToProps, actionToProps)(SingleCollection));
