import React from 'react';
import DataTable from '../../../components/DataTable';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { Button } from '@mui/material';
import CircularProgress from '../../../components/CircularProgress';
import './index.css';
import CopyButton from '../../../components/CopyButton';
import ImageOnLoad from '../../../components/ImageOnLoad';
import { setTransferAddress, showBurnDialog, showTransferDialog } from '../../../actions/collection';
import { ibcMedia, ibcName, ibcPreview } from '../../../utils/ibcData';
import { mediaReference } from '../../../utils/ipfs';
import { config } from '../../../config';
import { bech32 } from 'bech32';
import withRouter from '../../../components/WithRouter';
import { fetchMyNFTs } from '../../../actions/nfts';
import NetworkImages from '../../../components/NetworkImages';

const MarketplaceTable = (props) => {
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
            if (props.chainValue && props.chainValue !== 'omniflix') {
                return;
            }

            if (props.chainValue && !props.list[props.chainValue] && props.rpcClient && props.rpcClient[props.chainValue]) {
                return;
            }

            if (props.list[props.chainValue] && props.list[props.chainValue].limit) {
                const address = props.address && bech32.decode(props.address);
                let convertedAddress = address && address.words && bech32.encode(config.PREFIX, address.words);
                if (props.chainValue === 'uptick') {
                    convertedAddress = props.addressIBC && props.addressIBC.uptick;
                }

                props.fetchMyNFTs(props.rpcClient, props.chainValue, convertedAddress, props.list[props.chainValue].limit * currentPage, props.list[props.chainValue].limit);
            }
        },
        onChangeRowsPerPage: (numberOfRows) => {
            if (props.chainValue && props.chainValue !== 'omniflix') {
                return;
            }

            if (props.chainValue && !props.list[props.chainValue] && props.rpcClient && props.rpcClient[props.chainValue]) {
                return;
            }

            if (props.list[props.chainValue] && props.list[props.chainValue].skip) {
                const address = props.address && bech32.decode(props.address);
                let convertedAddress = address && address.words && bech32.encode(config.PREFIX, address.words);
                if (props.chainValue === 'uptick') {
                    convertedAddress = props.addressIBC && props.addressIBC.uptick;
                }

                props.fetchMyNFTs(props.rpcClient, props.chainValue, convertedAddress, props.list[props.chainValue].skip, numberOfRows);
            }
        },
        responsive: 'standard',
        serverSide: props.chainValue && props.chainValue === 'omniflix',
        pagination: true,
        selectableRows: 'none',
        download: false,
        filter: false,
        print: false,
        viewColumns: false,
        search: false,
    };

    if (props.chainValue && props.chainValue === 'omniflix' && props.myNFTs && props.myNFTs[props.chainValue]) {
        options.page = (props.myNFTs[props.chainValue].skip / 10);
        options.count = props.myNFTs[props.chainValue].total;
    }

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
        name: 'denom_id',
        label: 'Collection ID',
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
                // const address = value.owner && bech32.decode(value.owner);
                // let convertedAddress = address && address.words && bech32.encode(config.PREFIX, address.words);
                // let owner = props.address;
                // if (props.chainValue === 'uptick') {
                //     convertedAddress = value.owner;
                //     owner = props.addressIBC && props.addressIBC.uptick;
                // }

                return (
                    <div className="table_actions center_actions market_actions">
                        <div className="arrow_button">
                            <div className="left_section">
                                <NetworkImages name="FLIX"/>
                                <div className="lsr_value">
                                    299259.256489 FLIX
                                </div>
                            </div>
                            <p className="arrow_right"/>
                            <div className="right_section">
                                <Button>Collect Now</Button>
                            </div>
                        </div>
                        {/* {props.router && props.router.params && props.router.params.chain && */}
                        {/* props.router.params.chain === 'omniflix' */}
                        {/*    ? <Button className="burn_button" onClick={() => props.showBurnDialog(value)}> */}
                        {/*        {variables[props.lang].burn} */}
                        {/*    </Button> : null} */}
                    </div>
                );
            },
        },
    }];

    // const handleTransfer = (value) => {
    //     if (value && value.owner && (value.owner !== props.address)) {
    //         props.setTransferAddress(props.address);
    //     }
    //
    //     props.showTransferDialog(value, props.chainValue);
    // };

    const list = props.list && props.list[props.chainValue];
    const tableData = list && Object.keys(list) && Object.keys(list).length
        ? Object.keys(list).map((key, index) => [
            list[key],
            key,
            list[key] && list[key].denom,
            list[key],
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

MarketplaceTable.propTypes = {
    address: PropTypes.string.isRequired,
    addressIBC: PropTypes.object.isRequired,
    chainValue: PropTypes.string.isRequired,
    fetchMyNFTs: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    list: PropTypes.object.isRequired,
    myNFTs: PropTypes.object.isRequired,
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
        list: state.nfts.myNFTsInfo.value,
        inProgress: state.nfts.myNFTsInfo.inProgress,
        lang: state.language,
        rpcClient: state.query.rpcClient.value,
        myNFTs: state.nfts.myNFTs.value,
    };
};

const actionToProps = {
    fetchMyNFTs,
    showBurnDialog,
    showTransferDialog,
    setTransferAddress,
};

export default withRouter(connect(stateToProps, actionToProps)(MarketplaceTable));
