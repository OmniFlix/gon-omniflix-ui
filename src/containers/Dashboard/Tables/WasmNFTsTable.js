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
import { showBurnDialog, showTransferDialog } from '../../../actions/collection';
import { config } from '../../../config';
import { bech32 } from 'bech32';
import withRouter from '../../../components/WithRouter';
import { mediaReference } from '../../../utils/ipfs';

const WasmNFTsTable = (props) => {
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
                            src={value && value.info && value.info.token_uri && mediaReference(value.info.token_uri)}/>
                        {/* <div> */}
                        {/*     <p className="nft_name"> */}
                        {/*         {(value && value.metadata && value.metadata.name) || (data && ibcName(data))} */}
                        {/*     </p> */}
                        {/*     <p className="table_value collection_name"> */}
                        {/*         {props.collection && props.collection.name} */}
                        {/*     </p> */}
                        {/* </div> */}
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
        name: 'actions',
        label: 'Actions',
        options: {
            sort: false,
            customBodyRender: function (key) {
                const value = list && list[key];
                const address = value.access && value.access.owner && bech32.decode(value.access.owner);
                const convertedAddress = address && address.words && bech32.encode(config.PREFIX, address.words);
                const obj = {
                    ...value,
                    id: key,
                };

                return (
                    convertedAddress === props.address && <div className="table_actions center_actions">
                        <Button
                            className="primary_button"
                            onClick={() => props.showTransferDialog(obj, props.router && props.router.params && props.router.params.chain)}>
                            {variables[props.lang].transfer}
                        </Button>
                        {props.router && props.router.params && props.router.params.chain &&
                        props.router.params.chain === 'omniflix'
                            ? <Button className="burn_button" onClick={() => props.showBurnDialog(value)}>
                                {variables[props.lang].burn}
                            </Button> : null}
                    </div>
                );
            },
        },
    }];

    const list = props.nftsInfo;
    const tableData = list && Object.keys(list) && Object.keys(list).length
        ? Object.keys(list).map((key, index) => [
            list[key],
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

WasmNFTsTable.propTypes = {
    address: PropTypes.string.isRequired,
    chainValue: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    nftsInfo: PropTypes.object.isRequired,
    router: PropTypes.shape({
        params: PropTypes.shape({
            chain: PropTypes.string,
        }).isRequired,
    }).isRequired,
    rpcClient: PropTypes.any.isRequired,
    showBurnDialog: PropTypes.func.isRequired,
    showTransferDialog: PropTypes.func.isRequired,
    wasmAllCollections: PropTypes.object.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        chainValue: state.dashboard.chainValue.value,
        inProgress: state.collection._wasm.nfts.inProgress,
        lang: state.language,
        nftsInfo: state.collection._wasm.nftsInfo.value,
        collection: state.collection._wasm.collection.value,
    };
};

const actionToProps = {
    showBurnDialog,
    showTransferDialog,
};

export default withRouter(connect(stateToProps, actionToProps)(WasmNFTsTable));
