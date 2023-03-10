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
import {
    fetchCollectionNFTS,
    setTransferAddress,
    showBurnDialog,
    showTransferDialog,
} from '../../../actions/collection';
import { ibcMedia, ibcName, ibcPreview } from '../../../utils/ibcData';
import { mediaReference } from '../../../utils/ipfs';
import { config } from '../../../config';
import { bech32 } from 'bech32';
import withRouter from '../../../components/WithRouter';

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
                const data = value && value.data && JSON.parse(value.data);
                return (
                    <div className="collection_info nft_info">
                        <ImageOnLoad
                            alt="thumbnail"
                            preview={(value && value.metadata && value.metadata.previewUri && mediaReference(value.metadata.previewUri)) ||
                                (value && value.metadata && value.metadata.uri && mediaReference(value.metadata.uri)) ||
                                (value && value.metadata && value.metadata.uriHash && mediaReference(value.metadata.uriHash)) ||
                                (data && ibcPreview(data))}
                            src={(value && value.metadata && value.metadata.mediaUri &&
                                mediaReference(value.metadata.mediaUri)) || (data && ibcMedia(data))}/>
                        <div>
                            <p className="nft_name">
                                {(value && value.metadata && value.metadata.name) || (data && ibcName(data))}
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
                const address = value.owner && bech32.decode(value.owner);
                let convertedAddress = address && address.words && bech32.encode(config.PREFIX, address.words);
                let owner = props.address;
                if (props.chainValue === 'uptick') {
                    convertedAddress = value.owner;
                    owner = props.addressIBC && props.addressIBC.uptick;
                }

                return (
                    convertedAddress === owner && <div className="table_actions center_actions">
                        <Button
                            className="primary_button"
                            onClick={() => handleTransfer(value)}>
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

    const handleTransfer = (value) => {
        if (value && value.owner && (value.owner !== props.address)) {
            props.setTransferAddress(props.address);
        }

        props.showTransferDialog(value, props.chainValue);
    };

    let list = props.collection && props.collection.onfts;
    if (props.chainValue === 'iris' || props.chainValue === 'uptick') {
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
    addressIBC: PropTypes.object.isRequired,
    chainValue: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    fetchCollectionNFTS: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    router: PropTypes.shape({
        params: PropTypes.shape({
            chain: PropTypes.string,
        }).isRequired,
    }).isRequired,
    rpcClient: PropTypes.any.isRequired,
    setTransferAddress: PropTypes.func.isRequired,
    showBurnDialog: PropTypes.func.isRequired,
    showTransferDialog: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        addressIBC: state.account.wallet.connectionIBC.address,
        chainValue: state.dashboard.chainValue.value,
        collection: state.collection.collection.value,
        inProgress: state.collection.collection.inProgress,
        lang: state.language,
        rpcClient: state.query.rpcClient.value,
    };
};

const actionToProps = {
    fetchCollectionNFTS,
    setTransferAddress,
    showBurnDialog,
    showTransferDialog,
};

export default withRouter(connect(stateToProps, actionToProps)(NFTsTable));
