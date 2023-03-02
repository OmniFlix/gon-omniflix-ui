import React, { useEffect } from 'react';
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
import CopyButton from '../../../components/CopyButton';
import { ibcName, ibcPreview } from '../../../utils/ibcData';
import { mediaReference } from '../../../utils/ipfs';
import { fetchGqlAllCollections } from '../../../actions/collections.gql';
import { useLazyQuery } from '@apollo/client';
import { GET_GQL_COLLECTIONS } from '../../../constants/collections.gql';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '../../../config';

const GQLAllCollectionsTable = (props) => {
    const [getCollections] = useLazyQuery(GET_GQL_COLLECTIONS);

    useEffect(() => {
        if (props.router && props.router.params && props.router.params.chain && props.router.params.chain === 'stargaze') {
            props.fetchGqlAllCollections(() => getCollections({
                variables: {
                    offset: DEFAULT_SKIP,
                    limit: DEFAULT_LIMIT,
                },
            }), props.router.params.chain);
        }
        // eslint-disable-next-line
    }, []);

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
            // const rowIndex = rowState.dataIndex;
            // const id = list && list.value[rowIndex] &&
            //     list.value[rowIndex].id;
            // handleRedirect('', id);
        },
        onChangePage: (currentPage) => {
            if (props.chainValue && !props.list[props.chainValue]) {
                return;
            }

            if (props.list[props.chainValue] && props.list[props.chainValue].limit) {
                props.fetchGqlAllCollections(() => getCollections({
                    variables: {
                        offset: props.list[props.chainValue].limit * currentPage,
                        limit: props.list[props.chainValue].limit,
                    },
                }), props.chainValue);
            }
        },
        onChangeRowsPerPage: (numberOfRows) => {
            if (props.chainValue && !props.list[props.chainValue]) {
                return;
            }

            if (props.list[props.chainValue] && props.list[props.chainValue].skip) {
                props.fetchGqlAllCollections(() => getCollections({
                    variables: {
                        offset: props.list[props.chainValue].skip,
                        limit: numberOfRows,
                    },
                }), props.chainValue);
            }
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
        count: props.list && props.chainValue && props.list[props.chainValue] && props.list[props.chainValue].total,
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
                const data = value && value.data && JSON.parse(value.data);
                return (
                    <div className="collection_info">
                        <ImageOnLoad
                            alt="thumbnail"
                            src={(value.image && mediaReference(value.image)) ||
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
        label: 'Chain Type',
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
                            disabled
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

    let list = props.list && props.list[props.chainValue];
    list = list && list.value && list.value.collections && list.value.collections.collections;
    const tableData = list && list.length
        ? list.map((item, index) => [
            item,
            item.collectionAddr,
            item.collectionAddr,
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

GQLAllCollectionsTable.propTypes = {
    chainValue: PropTypes.string.isRequired,
    fetchGqlAllCollections: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    list: PropTypes.object.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        params: PropTypes.shape({
            chain: PropTypes.string,
        }).isRequired,
    }).isRequired,
    setClearCollection: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        chainValue: state.dashboard.chainValue.value,
        inProgress: state.collections._gql.allCollectionSList.inProgress,
        lang: state.language,
        list: state.collections._gql.allCollectionSList.value,
    };
};

const actionsToProps = {
    setClearCollection,
    fetchGqlAllCollections,
};

export default withRouter(connect(stateToProps, actionsToProps)(GQLAllCollectionsTable));
