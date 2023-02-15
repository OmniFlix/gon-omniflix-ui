import React from 'react';
import DataTable from '../../../components/DataTable';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import thumbnail from '../../../assets/thumbnail.svg';
import { Button } from '@mui/material';
import CircularProgress from '../../../components/CircularProgress';
import variables from '../../../utils/variables';
import './index.css';

const CollectionsTable = (props) => {
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

    const columns = [{
        name: 'collection_title',
        label: 'Collection Title',
        options: {
            sort: false,
            customBodyRender: function (value) {
                return (
                    <div className="collection_info">
                        <img alt="thumbnail" src={thumbnail} />
                        <div className="table_value collection_name">{value}</div>
                    </div>
                );
            },
        },
    }, {
        name: 'nfts',
        label: 'NFTs',
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
        name: 'actions',
        label: 'Actions',
        options: {
            sort: false,
            customBodyRender: function (value) {
                return (
                    <div className="table_actions">
                        <Button className="primary_button">
                            {variables[props.lang]['bulk_mint']}
                        </Button>
                    </div>
                );
            },
        },
    }];

    const tableData =
        [...Array(5)].map((item, index) => ([
            'Soulja BoyZ', '2564', '',
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

CollectionsTable.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

export default connect(stateToProps)(CollectionsTable);
