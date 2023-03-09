import { AppBar, Tab } from '@mui/material';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { fetchMarketplaceNFTs, setTabValue } from '../../../actions/dashboard';
import variables from '../../../utils/variables';
import { fetchAllCollections, fetchCollections } from '../../../actions/collections';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '../../../config';
import { fetchMyNFTs } from '../../../actions/nfts';
import { ChainsList } from '../../../chains';
import { bech32 } from 'bech32';
import withRouter from '../../../components/WithRouter';

class HeaderTabs extends Component {
    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount () {
        const route = this.props.router.location && this.props.router.location.pathname &&
            this.props.router.location.pathname.split('/') && this.props.router.location.pathname.split('/')[3];
        if (route) {
            this.props.setTabValue(route);
        }
    }

    handleChange (newValue) {
        if (newValue === this.props.tabValue) {
            return;
        }

        this.props.setTabValue(newValue);
        this.props.router.navigate(`/${this.props.chainValue}/dashboard/${newValue}`);

        if (newValue === 'my_collections' && !this.props.collectionsInProgress && this.props.chainValue &&
            !this.props.collections[this.props.chainValue] && this.props.address !== '') {
            this.props.fetchCollections(this.props.rpcClient, this.props.chainValue, this.props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
        }

        if (newValue === 'all_collections' && !this.props.allCollectionsInProgress && this.props.chainValue &&
            !this.props.allCollections[this.props.chainValue]) {
            this.props.fetchAllCollections(this.props.rpcClient, this.props.chainValue, DEFAULT_SKIP, DEFAULT_LIMIT);
        }

        if (newValue === 'my_nfts' && !this.props.myNFTsInProgress && this.props.chainValue &&
            this.props.myNFTs && !this.props.myNFTs[this.props.chainValue] && this.props.address) {
            const prefix = this.props.chainValue && ChainsList[this.props.chainValue] && ChainsList[this.props.chainValue].PREFIX;
            let convertedAddress = this.props.address;
            if (prefix && prefix !== 'omniflix') {
                const address = this.props.address && bech32.decode(this.props.address);
                convertedAddress = address && address.words && bech32.encode(prefix, address.words);
            }
            if (prefix === 'uptick') {
                convertedAddress = this.props.addressIBC && this.props.addressIBC.uptick;
            }

            this.props.fetchMyNFTs(this.props.rpcClient, this.props.chainValue, convertedAddress, DEFAULT_SKIP, DEFAULT_LIMIT);
        }

        if (newValue === 'marketplace' && !this.props.marketplaceNFTsInProgress && this.props.chainValue &&
            this.props.marketplaceNFTs && !this.props.marketplaceNFTs[this.props.chainValue] && this.props.address) {
            this.props.fetchMarketplaceNFTs(this.props.rpcClient, this.props.chainValue, this.props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
        }
    }

    render () {
        const a11yProps = (index) => {
            return {
                id: `nav-tab-${index}`,
                'aria-controls': `nav-tabpanel-${index}`,
            };
        };

        return (
            <AppBar className="horizontal_tabs" position="static">
                <div className="tabs_content">
                    <Tab
                        className={'tab ' + (this.props.tabValue === 'all_collections' ? 'active_tab' : '')}
                        label={<p className="text">
                            {variables[this.props.lang]['all_collections']}
                            {(this.props.chainValue === 'stargaze' || this.props.chainValue === 'juno') && this.props.contracts &&
                            this.props.contracts[this.props.chainValue] && this.props.contracts[this.props.chainValue].value &&
                            this.props.contracts[this.props.chainValue].value.length
                                ? ` (${this.props.contracts[this.props.chainValue].value.length})`
                                : this.props.chainValue === 'omniflix' && this.props.allCollections &&
                                this.props.allCollections[this.props.chainValue] && this.props.allCollections[this.props.chainValue].total
                                    ? ` (${this.props.allCollections[this.props.chainValue].total})`
                                    : null}
                        </p>}
                        value="all_collections"
                        onClick={() => this.handleChange('all_collections')}
                        {...a11yProps(0)} />
                    {this.props.address && this.props.chainValue === 'omniflix' &&
                        <Tab
                            className={'tab ' + (this.props.tabValue === 'my_collections' ? 'active_tab' : '')}
                            label={<p className="text">
                                {variables[this.props.lang]['my_collections']}
                                {this.props.chainValue === 'omniflix' && this.props.collections &&
                                this.props.collections[this.props.chainValue] && this.props.collections[this.props.chainValue].total
                                    ? ` (${this.props.collections[this.props.chainValue].total})`
                                    : null}
                            </p>}
                            value="my_collections"
                            onClick={() => this.handleChange('my_collections')}
                            {...a11yProps(1)} />}
                    {this.props.address && this.props.chainValue !== 'stargaze' &&
                        this.props.chainValue !== 'juno' &&
                        <Tab
                            className={'tab ' + (this.props.tabValue === 'my_nfts' ? 'active_tab' : '')}
                            label={<p className="text">
                                {variables[this.props.lang]['my_nfts']}
                                {this.props.chainValue === 'omniflix' && this.props.myNFTs &&
                                this.props.myNFTs[this.props.chainValue] && this.props.myNFTs[this.props.chainValue].total
                                    ? ` (${this.props.myNFTs[this.props.chainValue].total})`
                                    : null}
                            </p>}
                            value="my_collections"
                            onClick={() => this.handleChange('my_nfts')}
                            {...a11yProps(2)} />}
                    {this.props.address && this.props.chainValue === 'omniflix' &&
                        <Tab
                            className={'tab ' + (this.props.tabValue === 'marketplace' ? 'active_tab' : '')}
                            label={<p className="text">
                                {variables[this.props.lang].marketplace}
                                {this.props.chainValue === 'omniflix' && this.props.myNFTs &&
                                this.props.marketplaceNFTs[this.props.chainValue] && this.props.marketplaceNFTs[this.props.chainValue].total
                                    ? ` (${this.props.marketplaceNFTs[this.props.chainValue].total})`
                                    : null}
                            </p>}
                            value="marketplace"
                            onClick={() => this.handleChange('marketplace')}
                            {...a11yProps(3)} />}
                </div>
            </AppBar>
        );
    }
}

HeaderTabs.propTypes = {
    address: PropTypes.string.isRequired,
    addressIBC: PropTypes.object.isRequired,
    allCollections: PropTypes.object.isRequired,
    allCollectionsInProgress: PropTypes.bool.isRequired,
    chainValue: PropTypes.string.isRequired,
    collections: PropTypes.object.isRequired,
    collectionsInProgress: PropTypes.bool.isRequired,
    contracts: PropTypes.object.isRequired,
    fetchAllCollections: PropTypes.func.isRequired,
    fetchCollections: PropTypes.func.isRequired,
    fetchMarketplaceNFTs: PropTypes.func.isRequired,
    fetchMyNFTs: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    marketplaceNFTs: PropTypes.object.isRequired,
    marketplaceNFTsInProgress: PropTypes.bool.isRequired,
    myNFTs: PropTypes.object.isRequired,
    myNFTsInProgress: PropTypes.bool.isRequired,
    rpcClient: PropTypes.any.isRequired,
    setTabValue: PropTypes.func.isRequired,
    tabValue: PropTypes.string.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
        }).isRequired,
    }),
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        addressIBC: state.account.wallet.connectionIBC.address,
        chainValue: state.dashboard.chainValue.value,
        collections: state.collections.collectionSList.value,
        collectionsInProgress: state.collections.collectionSList.inProgress,
        contracts: state.cosmwasm.contracts.value,
        allCollections: state.collections.allCollectionSList.value,
        allCollectionsInProgress: state.collections.allCollectionSList.inProgress,
        lang: state.language,
        rpcClient: state.query.rpcClient.value,
        tabValue: state.dashboard.tabValue.value,
        myNFTs: state.nfts.myNFTs.value,
        myNFTsInProgress: state.nfts.myNFTs.inProgress,
        marketplaceNFTs: state.dashboard.marketplaceNFTs.value,
        marketplaceNFTsInProgress: state.dashboard.marketplaceNFTs.inProgress,
    };
};

const actionsToProps = {
    fetchAllCollections,
    fetchCollections,
    fetchMarketplaceNFTs,
    fetchMyNFTs,
    setTabValue,
};

export default withRouter(connect(stateToProps, actionsToProps)(HeaderTabs));
