import React from 'react';
import DataTable from '../../../components/DataTable';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import thumbnail from '../../../assets/thumbnail.svg';
import { Button } from '@mui/material';
import CircularProgress from '../../../components/CircularProgress';
import variables from '../../../utils/variables';
import './index.css';
import CopyButton from '../../../components/CopyButton';
import NetworkImages from '../../../components/NetworkImages';

const NFTsTable = (props) => {
    const options = {
        textLabels: {
            body: {
                noMatch: <div className="no_data_table"> No data found </div>,
                toolTip: 'Sort',
            },
            viewColumns: {
                title: 'Show Columns',
                titleAria: 'Show/Hide Table Columns',
            },
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

    const address = 'omniflix1rh3t2ptfpzm75tcfcp46vnkk992hqrt2z50glp';
    const columns = [{
        name: 'nft_title',
        label: 'NFT Title',
        options: {
            customBodyRender: function (value) {
                return (
                    <div className="collection_info nft_info">
                        <img alt="thumbnail" src={thumbnail} />
                        <div>
                            <p className="nft_name">Omni Owl</p>
                            <p className="table_value collection_name">{value}</p>
                        </div>
                    </div>
                );
            },
        },
    }, {
        name: 'nft_id',
        label: 'NFT ID',
        options: {
            customBodyRender: function () {
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
            customBodyRender: function (value) {
                return (
                    <div className="table_value">
                        {value}
                    </div>
                );
            },
        },
    }, {
        name: 'origin_chain',
        label: 'Origin Chain',
        options: {
            customBodyRender: function (value) {
                return (
                    <div className="table_value origin_chain">
                        <NetworkImages name="FLIX" />
                        <p>OmniFlix</p>
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
                    <div className="table_actions center_actions">
                        <Button className="primary_button">
                            {variables[props.lang].transfer}
                        </Button>
                        <Button className="burn_button">
                            {variables[props.lang].burn}
                        </Button>
                    </div>
                );
            },
        },
    }];

    const tableData =
        [...Array(5)].map((item, index) => ([
            'OMNI OWL(Green) #14', '', 'Native NFT', '',
        ]));

    return (
        <>
            <DataTable
                columns={columns}
                data={props.inProgress ? <CircularProgress /> : tableData}
                name=""
                options={options}/>
        </>
    );
};

NFTsTable.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

export default connect(stateToProps)(NFTsTable);
