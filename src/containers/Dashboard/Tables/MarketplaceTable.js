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

            if (props.chainValue && !props.list[props.chainValue] && props.rpcClient && props.rpcClient[props.chainValue]) {
                return;
            }

            if (props.list[props.chainValue] && props.list[props.chainValue].limit) {
                props.fetchMarketplaceNFTs(props.rpcClient, props.chainValue, props.address, props.list[props.chainValue].limit * currentPage, props.list[props.chainValue].limit);
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
                props.fetchMarketplaceNFTs(props.rpcClient, props.chainValue, props.address, props.list[props.chainValue].skip, numberOfRows);
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
            customBodyRender: function (value) {
                const address = value && value.nftId;
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
            customBodyRender: function (value) {
                const address = value && value.denomId;
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
                const address = (value.owner === props.address);
                const price = (value.price && value.price.amount) / (10 ** config.COIN_DECIMALS);
                const denom = value.price && value.price.denom;

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

    const list = props.list && props.list[props.chainValue] && props.list[props.chainValue].value;
    const tableData = props.list && props.list[props.chainValue] &&
    props.list[props.chainValue].value && (props.list[props.chainValue].value).length
        ? props.list[props.chainValue].value.map((item, index) => [
            item,
            item,
            item,
            item,
        ]) : [];
    // [
    //     {
    //         id: 'list44b048631ee74d179f5ffef93c6cba03',
    //         nftId: 'irisnft001',
    //         denomId: 'ibc/F993C0A059D4CB58EC779095C0F3E3EDC8454B0CA605CB5C8C840CB972B747AD',
    //         price: {
    //             denom: 'uflix',
    //             amount: '1000000',
    //         },
    //         owner: 'omniflix1g46urfdmslh3lv0xw4v06a47x3jwletq99ywyc',
    //         splitShares: [],
    //     },
    //     {
    //         id: 'list46c9c656aca347fa8a4cc6b210d21f5b',
    //         nftId: 'onftc22037a3e2b0435d8e546716f9f4adc0',
    //         denomId: 'onftdenom28e31c304aed4ae391b8e0138a1bbea8',
    //         price: {
    //             denom: 'uflix',
    //             amount: '1000000',
    //         },
    //         owner: 'omniflix1fgs9gudt8ltlnv5yymzjhcafycltw2tz85rx0t',
    //         splitShares: [],
    //     },
    //     {
    //         id: 'list9ce760986c814df5aacfb5b8951b1c76',
    //         nftId: 'onft6d6e84e3c14145c887dfc067f3972e1f',
    //         denomId: 'onftdenom4ce508e776f64d9e8dd4af7367d65844',
    //         price: {
    //             denom: 'uflix',
    //             amount: '100000000',
    //         },
    //         owner: 'omniflix1rh3t2ptfpzm75tcfcp46vnkk992hqrt2z50glp',
    //         splitShares: [],
    //     },
    //     {
    //         id: 'listc689a92c7d7d4ba1b64dd2b7b3a4f80b',
    //         nftId: 'onftb6daed38178b4b258dd3d42845a6ca0c',
    //         denomId: 'onftdenomb8d3862e81d14c3d8961b88331b3dd6d',
    //         price: {
    //             denom: 'uflix',
    //             amount: '1000000',
    //         },
    //         owner: 'omniflix1fgs9gudt8ltlnv5yymzjhcafycltw2tz85rx0t',
    //         splitShares: [],
    //     },
    //     {
    //         id: 'listfac4e61da42b48d9bc56c076bda2b937',
    //         nftId: 'onftcf8cef519bea472fad8f99871157a714',
    //         denomId: 'onftdenom4ce508e776f64d9e8dd4af7367d65844',
    //         price: {
    //             denom: 'uflix',
    //             amount: '1000000',
    //         },
    //         owner: 'omniflix1jpudqpydw26r3297dlaj3whecvatyayklk4k9e',
    //         splitShares: [],
    //     },
    // ];
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
