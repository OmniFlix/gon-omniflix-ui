import React, { Component } from 'react';
import './index.css';
import ChainPopover from './ChainPopover';
import Tabs from './Tabs';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CollectionsTable from './Tables/CollectionsTable';
import NFTsTable from './Tables/NFTsTable';
import IBCNFTsTable from './Tables/IBCNFTsTable';
import { fetchAllCollections, fetchCollections } from '../../actions/collections';
import { DEFAULT_SKIP } from '../../constants/url';
import withRouter from '../../components/WithRouter';
import AllCollectionsTable from './Tables/AllCollectionsTable';

class Dashboard extends Component {
    constructor (props) {
        super(props);

        this.handleCreateCollection = this.handleCreateCollection.bind(this);
    }

    componentDidMount () {
        if (this.props.tabValue === 'my_collections' && !this.props.collectionsInProgress && this.props.chainValue &&
            !this.props.collections[this.props.chainValue] && this.props.address !== '') {
            this.props.fetchCollections(this.props.chainValue, this.props.address, DEFAULT_SKIP, 500);
        } else if (this.props.tabValue === 'all_collections' && !this.props.allCollectionsInProgress && this.props.chainValue &&
            !this.props.allCollections[this.props.chainValue]) {
            this.props.fetchAllCollections(this.props.chainValue, DEFAULT_SKIP, 500);
        }
    }

    componentDidUpdate (pp, ps, ss) {
        if (this.props.address !== '' && pp.address !== this.props.address) {
            this.props.fetchCollections(this.props.chainValue, this.props.address, DEFAULT_SKIP, 500);
        }
    }

    handleCreateCollection () {
        this.props.router.navigate('/create-collection');
    }

    render () {
        return (
            <div className="home scroll_bar">
                <ChainPopover/>
                <p className="border"/>
                <div className="header">
                    <div className="left_section">
                        <Tabs/>
                    </div>
                </div>
                <div className="page_section">
                    {this.props.tabValue === 'my_collections' &&
                        <div className="data_table"><CollectionsTable/></div>}
                    {this.props.tabValue === 'all_collections' &&
                        <div className="data_table"><AllCollectionsTable/></div>}
                    {this.props.tabValue === 'nfts' &&
                        <div className="data_table nfts_table"><NFTsTable/></div>}
                    {this.props.tabValue === 'ibc_nfts' &&
                        <div className="data_table nfts_table"><IBCNFTsTable/></div>}
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    address: PropTypes.string.isRequired,
    allCollections: PropTypes.object.isRequired,
    allCollectionsInProgress: PropTypes.bool.isRequired,
    chainValue: PropTypes.string.isRequired,
    collections: PropTypes.object.isRequired,
    collectionsInProgress: PropTypes.bool.isRequired,
    fetchAllCollections: PropTypes.func.isRequired,
    fetchCollections: PropTypes.func.isRequired,
    keys: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    tabValue: PropTypes.string.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }),
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        chainValue: state.dashboard.chainValue.value,
        collections: state.collections.collectionSList.value,
        collectionsInProgress: state.collections.collectionSList.inProgress,
        allCollections: state.collections.allCollectionSList.value,
        allCollectionsInProgress: state.collections.allCollectionSList.inProgress,
        keys: state.account.wallet.connection.keys,
        lang: state.language,
        tabValue: state.dashboard.tabValue.value,
    };
};

const actionsToProps = {
    fetchCollections,
    fetchAllCollections,
};

export default withRouter(connect(stateToProps, actionsToProps)(Dashboard));
