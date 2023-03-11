import React from 'react';
import DataTable from '../../../components/DataTable';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { Button, IconButton } from '@mui/material';
import CircularProgress from '../../../components/CircularProgress';
import variables from '../../../utils/variables';
import ImageOnLoad from '../../../components/ImageOnLoad';
import './index.css';
import withRouter from '../../../components/WithRouter';
import { setClearCollection } from '../../../actions/collections';
import CopyButton from '../../../components/CopyButton';
import { ibcName, ibcPreview } from '../../../utils/ibcData';
import { mediaReference } from '../../../utils/ipfs';
import { ListObject as DefaultList } from '../../../utils/defaultOptions';
import { ChainsList } from '../../../chains';
import { fetchCollectionNFTS, setCollectionClear } from '../../../actions/collection';
import { setChainValue } from '../../../actions/dashboard';
import { fetchContracts } from '../../../actions/cosmwasm';
import { fetchWasmCollection, fetchWasmCollectionNFTS, fetchWasmNFTInfo } from '../../../actions/collection/wasm';
import { setRpcClient } from '../../../actions/query';

const CollectionsTable = (props) => {
    const handleExport = (chain, hash, denom, list) => {
        props.setChainValue(chain);
        props.router.navigate(hash);
        props.setCollectionClear();
        if (list && list.cosmwasm) {
            const config = ChainsList && ChainsList[chain];
            if (props.contracts && props.contracts[chain]) {
                props.fetchWasmCollection(config, chain, denom);
                props.fetchWasmCollectionNFTS(config, denom, (result) => {
                    if (result && result.tokens && result.tokens.length) {
                        handleFetch(0, config, result.tokens, denom);
                    }
                });
            } else {
                props.fetchContracts(config, chain, (res) => {
                    if (res) {
                        props.fetchWasmCollection(config, chain, denom);
                        props.fetchWasmCollectionNFTS(config, denom, (result) => {
                            if (result && result.tokens && result.tokens.length) {
                                handleFetch(0, config, result.tokens, denom);
                            }
                        });
                    }
                });
            }

            return null;
        }

        if (props.rpcClient && props.rpcClient[chain]) {
            props.fetchCollectionNFTS(props.rpcClient, chain, `ibc/${denom}`);
        } else {
            props.setRpcClient(chain, (client) => {
                if (client) {
                    const obj = {};
                    obj[chain] = client;
                    props.fetchCollectionNFTS(obj, chain, `ibc/${denom}`);
                }
            });
        }
    };

    const handleFetch = (index, config, data, denom) => {
        const array = [];
        for (let i = 0; i < 3; i++) {
            if (data[index + i]) {
                const value = data[index + i];
                if (value) {
                    array.push(props.fetchWasmNFTInfo(config, denom, value));
                }
            } else {
                break;
            }
        }

        Promise.all(array).then(() => {
            if (index + 3 < data.length) {
                handleFetch(index + 3, config, data, denom);
            }
        });
    };

    const options = {
        textLabels: {
            body: {
                noMatch: props.inProgress
                    ? <CircularProgress/>
                    : <div className="no_data_table"> No data found </div>,
                toolTip: 'Sort',
            },
            viewColumns: {
                title: 'Show Columns',
                titleAria: 'Show/Hide Table Columns',
            },
        },
        onCellClick: (colData, cellMeta) => {
            if (cellMeta && cellMeta.colIndex === 3) {
                return;
            }

            const rowIndex = cellMeta.rowIndex;
            const id = list && list.value[rowIndex] &&
                list.value[rowIndex].id;
            handleRedirect('', id);
        },
        responsive: 'standard',
        serverSide: false,
        pagination: true,
        selectableRows: 'none',
        download: false,
        filter: false,
        print: false,
        viewColumns: false,
        search: false,
    };

    const handleRedirect = (event, id) => {
        props.setClearCollection();
        const updatedID = id.replace('/', '_');
        props.router.navigate(`/${props.chainValue}/collection/${updatedID}`);
    };

    const columns = [{
        name: 'collection_title',
        label: 'Collection Title',
        options: {
            sort: false,
            customBodyRender: function (value) {
                const data = value && value.data && JSON.parse(value.data);
                return (
                    <div className="collection_info">
                        <ImageOnLoad
                            alt="thumbnail"
                            src={(value.previewUri && mediaReference(value.previewUri)) ||
                                (value.uri && mediaReference(value.uri)) ||
                                (value.uriHash && mediaReference(value.uriHash)) ||
                                (data && ibcPreview(data))}/>
                        <div className="table_value collection_name">
                            {(value.name) || (data && ibcName(data))}
                        </div>
                    </div>
                );
            },
        },
    }, {
        name: 'id',
        label: 'Collection ID',
        options: {
            sort: false,
            customBodyRender: function (address) {
                return (
                    <div className="nft_id">
                        <div className="hash_text">
                            <p>{address}</p>
                            <span>{address && address.slice(address.length - 6, address.length)}</span>
                        </div>
                        <CopyButton data={address}/>
                    </div>
                );
            },
        },
    }, {
        name: 'chain_type',
        label: 'Collection Type',
        options: {
            sort: false,
            customBodyRender: function (id) {
                const ID = id && id.split('ibc/');
                return (
                    ID && ID.length > 1
                        ? <div className="chain_type ibc_chain_type">
                            {variables[props.lang].ibc}
                        </div>
                        : <div className="chain_type native_chain_type">
                            {variables[props.lang].native}
                        </div>
                );
            },
        },
    }, {
        name: 'actions',
        label: 'Actions',
        options: {
            sort: false,
            customBodyRender: function (value) {
                const hashList = value && value.id && props.collectionListHash && props.collectionListHash[value.id];
                return (
                    <div className="table_actions ibc_actions">
                        <Button
                            className="primary_button"
                            onClick={(e) => handleRedirect(e, value.id)}>
                            {variables[props.lang].view}
                        </Button>
                        <div className="ibc">
                            {hashList && Object.keys(hashList).length &&
                                Object.keys(hashList).map((value) => {
                                    const config = DefaultList && DefaultList[value];
                                    if (config && config.cosmwasm && hashList && hashList[value]) {
                                        const hash = `/${value}/collection/${hashList[value]}`;
                                        return (
                                            <IconButton
                                                key={value}
                                                className="export_button"
                                                onClick={() => handleExport(value, hash, hashList[value], config)}>
                                                <img alt="logo" src={config.icon}/>
                                            </IconButton>
                                        );
                                    }

                                    if (hashList && hashList[value]) {
                                        const hash = `/${value}/collection/ibc_${hashList[value]}`;
                                        return (
                                            <IconButton
                                                key={value}
                                                className="export_button"
                                                onClick={() => handleExport(value, hash, hashList[value])}>
                                                <img alt="logo" src={config.icon}/>
                                            </IconButton>
                                        );
                                    }

                                    return null;
                                })}
                        </div>
                        {/* <Button */}
                        {/*     className="burn_button" */}
                        {/*     onClick={() => props.router.navigate(`/create-collection/${value.id}`)}> */}
                        {/*     {variables[props.lang].edit} */}
                        {/* </Button> */}
                    </div>
                );
            },
        },
    }];

    const list = props.list && props.list[props.chainValue];
    const tableData = list && list.value && list.value.length
        ? list.value.map((item, index) => [
            item,
            item.id,
            item.id,
            item,
        ]) : [];

    return (
        <>
            <DataTable
                columns={columns}
                data={tableData}
                name=""
                options={options}/>
        </>
    );
};

CollectionsTable.propTypes = {
    chainValue: PropTypes.string.isRequired,
    collectionListHash: PropTypes.object.isRequired,
    contracts: PropTypes.object.isRequired,
    fetchCollectionNFTS: PropTypes.func.isRequired,
    fetchContracts: PropTypes.func.isRequired,
    fetchWasmCollection: PropTypes.func.isRequired,
    fetchWasmCollectionNFTS: PropTypes.func.isRequired,
    fetchWasmNFTInfo: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    list: PropTypes.object.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
    rpcClient: PropTypes.any.isRequired,
    setChainValue: PropTypes.func.isRequired,
    setClearCollection: PropTypes.func.isRequired,
    setCollectionClear: PropTypes.func.isRequired,
    setRpcClient: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        chainValue: state.dashboard.chainValue.value,
        collectionListHash: state.collections.collectionListHash.value,
        contracts: state.cosmwasm.contracts.value,
        inProgress: state.collections.collectionSList.inProgress,
        lang: state.language,
        list: state.collections.collectionSList.value,
        rpcClient: state.query.rpcClient.value,
    };
};

const actionsToProps = {
    fetchCollectionNFTS,
    fetchContracts,
    fetchWasmCollection,
    fetchWasmCollectionNFTS,
    fetchWasmNFTInfo,
    setClearCollection,
    setCollectionClear,
    setChainValue,
    setRpcClient,
};

export default withRouter(connect(stateToProps, actionsToProps)(CollectionsTable));
