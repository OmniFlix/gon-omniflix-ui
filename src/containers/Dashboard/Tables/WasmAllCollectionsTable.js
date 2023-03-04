import React from 'react';
import DataTable from '../../../components/DataTable';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { Button } from '@mui/material';
import CircularProgress from '../../../components/CircularProgress';
import variables from '../../../utils/variables';
import './index.css';
import withRouter from '../../../components/WithRouter';
import { setClearCollection } from '../../../actions/collections';
import CopyButton from '../../../components/CopyButton';

const WasmAllCollectionsTable = (props) => {
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
            const id = list && Object.keys(list) && Object.keys(list)[rowIndex];
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
                const name = value && value.name && value.name.split('/');
                return (
                    name && <div className="collection_info">
                        <div className="table_value collection_name">
                            {name && name.length && name[name.length - 1]}
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
                const val = list[id];
                const ID = val && val.name && val.name.split('wasm.stars');
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
                            onClick={(e) => handleRedirect(e, value)}>
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
    const tableData = list && Object.keys(list) && Object.keys(list).length
        ? Object.keys(list).map((key, index) => [
            list[key],
            key,
            key,
            key,
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

WasmAllCollectionsTable.propTypes = {
    chainValue: PropTypes.string.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    list: PropTypes.object.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
    setClearCollection: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        chainValue: state.dashboard.chainValue.value,
        inProgress: state.cosmwasm.contracts.inProgress,
        lang: state.language,
        list: state.collections._wasm.allCollectionSList.value,
    };
};

const actionsToProps = {
    setClearCollection,
};

export default withRouter(connect(stateToProps, actionsToProps)(WasmAllCollectionsTable));
