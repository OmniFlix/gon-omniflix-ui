import React from 'react';
import DataTable from '../../../components/DataTable';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { Button } from '@mui/material';
import CircularProgress from '../../../components/CircularProgress';
import variables from '../../../utils/variables';
import ImageOnLoad from '../../../components/ImageOnLoad';
import './index.css';
import withRouter from '../../../components/WithRouter';
import { fetchAllCollections, setClearCollection } from '../../../actions/collections';
import CopyButton from '../../../components/CopyButton';
import { ibcName, ibcPreview } from '../../../utils/ibcData';
import { mediaReference } from '../../../utils/ipfs';

const AllCollectionsTable = (props) => {
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
        onRowClick: (rowData, rowState) => {
            const rowIndex = rowState.dataIndex;
            const id = list && list.value[rowIndex] &&
                list.value[rowIndex].id;
            handleRedirect('', id);
        },
        onChangePage: (currentPage) => {
            if (props.chainValue && props.chainValue !== 'omniflix') {
                return;
            }

            if (props.chainValue && !props.list[props.chainValue] && props.rpcClient && props.rpcClient[props.chainValue]) {
                return;
            }

            if (props.list[props.chainValue] && props.list[props.chainValue].limit) {
                props.fetchAllCollections(props.rpcClient, props.chainValue, props.list[props.chainValue].limit * currentPage, props.list[props.chainValue].limit);
            }
        },
        onChangeRowsPerPage: (numberOfRows) => {
            if (props.chainValue && props.chainValue !== 'omniflix') {
                return;
            }

            if (props.chainValue && !props.list[props.chainValue] && props.rpcClient && props.rpcClient[props.chainValue]) {
                return;
            }

            if (props.list[props.chainValue] && props.list[props.chainValue].skip) {
                props.fetchAllCollections(props.rpcClient, props.chainValue, props.list[props.chainValue].skip, numberOfRows);
            }
        },
        responsive: 'standard',
        serverSide: props.chainValue && props.chainValue === 'omniflix',
        pagination: true,
        selectableRows: 'none',
        download: false,
        filter: false,
        print: false,
        viewColumns: false,
        search: false,
    };

    if (props.chainValue && props.chainValue === 'omniflix' && props.list && props.list[props.chainValue]) {
        options.page = (props.list[props.chainValue].skip / 10);
        options.count = props.list[props.chainValue].total;
    }

    const handleRedirect = (event, id) => {
        event && event.stopPropagation();
        props.setClearCollection();
        const updatedID = id.replaceAll('/', '_');
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
                            {(value.name) || ibcName(data)}
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
                    address && address.length > 15
                        ? <div className="nft_id">
                            <div className="hash_text">
                                <p>{address}</p>
                                <span>{address && address.slice(address.length - 6, address.length)}</span>
                            </div>
                            <CopyButton data={address}/>
                        </div>
                        : <div className="nft_id">
                            <div className="hash_text">
                                <p>{address}</p>
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
                return (
                    <div className="table_actions ct_actions">
                        <Button
                            className="primary_button"
                            onClick={(e) => handleRedirect(e, value.id)}>
                            {variables[props.lang].view}
                        </Button>
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

AllCollectionsTable.propTypes = {
    chainValue: PropTypes.string.isRequired,
    fetchAllCollections: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    list: PropTypes.object.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
    rpcClient: PropTypes.any.isRequired,
    rpcClientInProgress: PropTypes.bool.isRequired,
    setClearCollection: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        chainValue: state.dashboard.chainValue.value,
        inProgress: state.collections.allCollectionSList.inProgress,
        lang: state.language,
        list: state.collections.allCollectionSList.value,

        rpcClient: state.query.rpcClient.value,
        rpcClientInProgress: state.query.rpcClient.inProgress,
    };
};

const actionsToProps = {
    setClearCollection,
    fetchAllCollections,
};

export default withRouter(connect(stateToProps, actionsToProps)(AllCollectionsTable));
