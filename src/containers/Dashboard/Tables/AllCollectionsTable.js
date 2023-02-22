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
import { fetchClassTrace } from '../../../actions/collection';

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
            const rowIndex = rowState.rowIndex;
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
        if (props.classTraceInProgress) {
            return;
        }

        if (id.indexOf('ibc/') > -1) {
            const updatedID = id.replace('ibc/', '');
            if (props.classTrace && props.classTrace[updatedID] && props.classTrace[updatedID].base_class_id) {
                props.router.navigate(`/collection/${props.classTrace[updatedID].base_class_id}`);
            } else {
                props.fetchClassTrace(updatedID, (result) => {
                    if (result && result.base_class_id) {
                        props.router.navigate(`/collection/${result.base_class_id}`);
                    }
                });
            }
        } else {
            props.router.navigate(`/collection/${id}`);
        }
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

AllCollectionsTable.propTypes = {
    chainValue: PropTypes.string.isRequired,
    classTrace: PropTypes.object.isRequired,
    classTraceInProgress: PropTypes.bool.isRequired,
    fetchClassTrace: PropTypes.func.isRequired,
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
        classTrace: state.collection.classTrace.value,
        classTraceInProgress: state.collection.classTrace.inProgress,
        inProgress: state.collections.allCollectionSList.inProgress,
        lang: state.language,
        list: state.collections.allCollectionSList.value,
    };
};

const actionsToProps = {
    fetchClassTrace,
    setClearCollection,
};

export default withRouter(connect(stateToProps, actionsToProps)(AllCollectionsTable));
