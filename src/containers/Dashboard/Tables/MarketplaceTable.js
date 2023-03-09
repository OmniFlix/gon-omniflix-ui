import React from 'react';
import DataTable from '../../../components/DataTable';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { Button } from '@mui/material';
import CircularProgress from '../../../components/CircularProgress';
import './index.css';
import CopyButton from '../../../components/CopyButton';
import ImageOnLoad from '../../../components/ImageOnLoad';
import { ibcMedia, ibcName, ibcPreview } from '../../../utils/ibcData';
import { mediaReference } from '../../../utils/ipfs';
import withRouter from '../../../components/WithRouter';
import { fetchMarketplaceNFTs, showDeListNFTDialog } from '../../../actions/dashboard';
import variables from '../../../utils/variables';
import { config } from '../../../config';
import denomIcon from '../../../assets/tokens/flix.svg';

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

            if (props.chainValue && !props.info[props.chainValue] && props.rpcClient && props.rpcClient[props.chainValue]) {
                return;
            }

            if (props.info[props.chainValue] && props.info[props.chainValue].limit) {
                props.fetchMarketplaceNFTs(props.rpcClient, props.chainValue, props.address, props.info[props.chainValue].limit * currentPage, props.list[props.chainValue].limit);
            }
        },
        onChangeRowsPerPage: (numberOfRows) => {
            if (props.chainValue && props.chainValue !== 'omniflix') {
                return;
            }

            if (props.chainValue && !props.info[props.chainValue] && props.rpcClient && props.rpcClient[props.chainValue]) {
                return;
            }

            if (props.info[props.chainValue] && props.info[props.chainValue].skip) {
                props.fetchMarketplaceNFTs(props.rpcClient, props.chainValue, props.address, props.info[props.chainValue].skip, numberOfRows);
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

    if (props.chainValue && props.chainValue === 'omniflix' && props.list && props.list[props.chainValue]) {
        options.page = (props.list[props.chainValue].skip / 10);
        options.count = props.list[props.chainValue].total;
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
                const data = props.list && props.list[props.chainValue] && props.list[props.chainValue].value &&
                    props.list[props.chainValue].value.find((item) => (item.nftId === value.id));
                const address = (data.owner === props.address);
                const price = (data.price && data.price.amount) / (10 ** config.COIN_DECIMALS);
                const denom = data.price && data.price.denom;

                // const delistData = {
                //     ...data,
                //     value,
                // };

                return (
                    <div className="table_actions center_actions market_actions">
                        {props.router && props.router.params && props.router.params.chain &&
                         props.router.params.chain === 'omniflix' && address
                            ? <Button className="primary_button" onClick={() => props.showDeListNFTDialog(value)}>
                                {variables[props.lang]['delist_nft_header']}
                            </Button>
                            : (denom || price) &&
                            <div className="arrow_button">
                                <div className="left_section">
                                    {denom === 'uflix'
                                        ? <img alt="denom" src={denomIcon} /> : null}
                                    <div className="lsr_value">
                                        {price}{' '}{denom === 'uflix' ? 'FLIX' : denom}
                                    </div>
                                </div>
                                <p className="arrow_right"/>
                                <div className="right_section">
                                    <Button>Collect Now</Button>
                                </div>
                            </div>}
                    </div>
                );
            },
        },
    }];

    const list = props.info && props.info[props.chainValue];
    const tableData = list && Object.keys(list) && Object.keys(list).length
        ? Object.keys(list).map((key, index) => [
            list[key],
            key,
            list[key] && list[key].denom,
            list[key],
        ]) : [];

    console.log('asdkjkasdasd', props.info);

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
    fetchMarketplaceNFTs: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    info: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    list: PropTypes.object.isRequired,
    router: PropTypes.shape({
        params: PropTypes.shape({
            chain: PropTypes.string,
        }).isRequired,
    }).isRequired,
    rpcClient: PropTypes.any.isRequired,
    showDeListNFTDialog: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        addressIBC: state.account.wallet.connectionIBC.address,
        chainValue: state.dashboard.chainValue.value,
        list: state.dashboard.marketplaceNFTs.value,
        info: state.dashboard.marketplaceInfo.value,
        inProgress: state.dashboard.marketplaceNFTs.inProgress,
        lang: state.language,
        rpcClient: state.query.rpcClient.value,
    };
};

const actionToProps = {
    fetchMarketplaceNFTs,
    showDeListNFTDialog,
};

export default withRouter(connect(stateToProps, actionToProps)(MarketplaceTable));
