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
import { ibcMedia, ibcName, ibcPreview } from '../../../utils/ibcData';

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

            props.fetchCollectionNFTS(props.chainValue, props.collection.denom && props.collection.denom.id, props.limit * currentPage, props.limit);
        },
        onChangeRowsPerPage: (numberOfRows) => {
            if (props.collection && props.collection.onfts && props.collection.onfts.length === 0) {
                return;
            }

            props.fetchCollectionNFTS(props.chainValue, props.collection.denom && props.collection.denom.id, props.skip, numberOfRows);
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
                const data = value && value.data && JSON.parse(value.data);
                return (
                    <div className="collection_info nft_info">
                        <ImageOnLoad
                            alt="thumbnail"
                            preview={(value && value.metadata && value.metadata.preview_uri) || ibcPreview(data)}
                            src={(value && value.metadata && value.metadata.media_uri) || ibcMedia(data)}/>
                        <div>
                            <p className="nft_name">
                                {(value && value.metadata && value.metadata.name) || ibcName(data)}
                            </p>
                            <p className="table_value collection_name">
                                {props.collection && props.collection.name}
                            </p>
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
        name: 'actions',
        label: 'Actions',
        options: {
            sort: false,
            customBodyRender: function (value) {
                return (
                    value.owner === props.address && <div className="table_actions center_actions">
                        <Button className="primary_button" onClick={() => props.showTransferDialog(value)}>
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

    let list = props.collection && props.collection.onfts;
    if (props.chainValue === 'iris') {
        list = props.collection && props.collection.nfts;
    }

    const tableData = list && list.length
        ? list.map((item, index) => [
            item,
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

NFTsTable.propTypes = {
    address: PropTypes.string.isRequired,
    chainValue: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    fetchCollectionNFTS: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    showBurnDialog: PropTypes.func.isRequired,
    showTransferDialog: PropTypes.func.isRequired,
    skip: PropTypes.number.isRequired,
    limit: PropTypes.number,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        chainValue: state.dashboard.chainValue.value,
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
