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
import { setClearCollection } from '../../../actions/collections';

const CollectionsTable = (props) => {
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
        const result = id.replace('/', '_');
        props.router.navigate(`/collection/${result}`);
    };

    const columns = [{
        name: 'collection_title',
        label: 'Collection Title',
        options: {
            sort: false,
            customBodyRender: function (value) {
                return (
                    <div className="collection_info">
                        <ImageOnLoad alt="thumbnail" src={value.preview_uri}/>
                        <div className="table_value collection_name">{value.name}</div>
                    </div>
                );
            },
        },
    }, {
        name: 'collection_symbol',
        label: 'Collection Symbol',
        options: {
            sort: false,
            customBodyRender: function (value) {
                return (
                    <div className="collection_data">
                        <div className="table_value collection_name">{value.symbol}</div>
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
                        <Button
                            className="primary_button"
                            onClick={(e) => handleRedirect(e, value.id)}>
                            {variables[props.lang].view}
                        </Button>
                        <Button
                            className="burn_button"
                            onClick={() => props.router.navigate(`/create-collection/${value.id}`)}>
                            {variables[props.lang].edit}
                        </Button>
                    </div>
                );
            },
        },
    }];

    const list = props.list && props.list[props.chainValue];
    const tableData = list && list.value && list.value.length
        ? list.value.map((item, index) => [
            item,
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

CollectionsTable.propTypes = {
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
        inProgress: state.collections.collectionSList.inProgress,
        lang: state.language,
        list: state.collections.collectionSList.value,
    };
};

const actionsToProps = {
    setClearCollection,
};

export default withRouter(connect(stateToProps, actionsToProps)(CollectionsTable));
