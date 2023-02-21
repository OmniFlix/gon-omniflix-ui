import React from 'react';
import DataTable from '../../../components/DataTable';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { Button } from '@mui/material';
import CircularProgress from '../../../components/CircularProgress';
import variables from '../../../utils/variables';
import './index.css';
import CopyButton from '../../../components/CopyButton';
import ImageOnLoad from '../../../components/ImageOnLoad';
import { fetchCollectionNFTS, showBurnDialog, showTransferDialog } from '../../../actions/collection';

const NFTsTable = (props) => {
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
        onChangePage: (currentPage) => {
            if (props.collection && props.collection.onfts && props.collection.onfts.length === 0) {
                return;
            }

            props.fetchCollectionNFTS(props.collection.denom && props.collection.denom.id, props.limit * currentPage, props.limit);
        },
        onChangeRowsPerPage: (numberOfRows) => {
            if (props.collection && props.collection.onfts && props.collection.onfts.length === 0) {
                return;
            }

            props.fetchCollectionNFTS(props.collection.denom && props.collection.denom.id, props.skip, numberOfRows);
        },
        responsive: 'standard',
        serverSide: true,
        pagination: true,
        selectableRows: 'none',
        download: false,
        filter: false,
        print: false,
        viewColumns: false,
        search: false,
    };

    const columns = [{
        name: 'nft_title',
        label: 'NFT Title',
        options: {
            sort: false,
            customBodyRender: function (value) {
                return (
                    <div className="collection_info nft_info">
                        <ImageOnLoad
                            alt="thumbnail"
                            src={value && value.metadata && value.metadata.preview_uri
                                ? value.metadata.preview_uri
                                : value && value.metadata && value.metadata.media_uri}/>
                        <div>
                            <p className="nft_name">{value && value.metadata && value.metadata.name}</p>
                            <p className="table_value collection_name">{props.collection && props.collection.name}</p>
                        </div>
                    </div>
                );
            },
        },
    }, {
        name: 'nft_id',
        label: 'NFT ID',
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
        name: 'nft_type',
        label: 'NFT Type',
        options: {
            sort: false,
            customBodyRender: function (value) {
                return (
                    <div className="table_value">
                        Native
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
                    (value.owner === props.address) && <div className="table_actions center_actions">
                        <Button className="primary_button" onClick={props.showTransferDialog}>
                            {variables[props.lang].transfer}
                        </Button>
                        <Button className="burn_button" onClick={() => props.showBurnDialog(value)}>
                            {variables[props.lang].burn}
                        </Button>
                    </div>
                );
            },
        },
    }];

    const list = props.collection && props.collection.onfts;
    const tableData = list && list.length
        ? list.map((item, index) => [
            item,
            item.id,
            item,
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

NFTsTable.propTypes = {
    address: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    fetchCollectionNFTS: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
    showBurnDialog: PropTypes.func.isRequired,
    showTransferDialog: PropTypes.func.isRequired,
    skip: PropTypes.number.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        collection: state.collection.collection.value,
        inProgress: state.collection.collection.inProgress,
        skip: state.collection.collection.skip,
        limit: state.collection.collection.limit,
        lang: state.language,
    };
};

const actionToProps = {
    fetchCollectionNFTS,
    showBurnDialog,
    showTransferDialog,
};

export default connect(stateToProps, actionToProps)(NFTsTable);
