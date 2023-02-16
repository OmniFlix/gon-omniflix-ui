import React, { Component } from 'react';
import './index.css';
import ChainPopover from './ChainPopover';
import Tabs from './Tabs';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CollectionsTable from './Tables/CollectionsTable';
import NFTsTable from './Tables/NFTsTable';
import IBCNFTsTable from './Tables/IBCNFTsTable';
import { Button } from '@mui/material';
import variables from '../../utils/variables';
import { fetchCollections } from '../../actions/collections';
import { DEFAULT_SKIP } from '../../constants/url';
import SingleCollection from './SingleCollection';

class Dashboard extends Component {
    componentDidMount () {
        if (this.props.tabValue === 'my_collections' && !this.props.collectionsInProgress && this.props.chainValue &&
            !this.props.collections[this.props.chainValue] && this.props.address !== '') {
            this.props.fetchCollections(this.props.chainValue, this.props.address, DEFAULT_SKIP, 500);
        }
    }

    componentDidUpdate (pp, ps, ss) {
        if (this.props.address !== '' && pp.address !== this.props.address) {
            this.props.fetchCollections(this.props.chainValue, this.props.address, DEFAULT_SKIP, 500);
        }
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
                    <div className="center_section">
                        <span>
                            {this.props.tabValue && this.props.tabValue.replace(/_/g, ' ')}
                            {'    /  '}
                        </span>
                        <p>Collection Name</p>
                    </div>
                    <div className="right_section">
                        <Button>
                            {variables[this.props.lang]['create_collection']}
                        </Button>
                        <Button>
                            {variables[this.props.lang]['create_nft']}
                        </Button>
                    </div>
                </div>
                <div>
                    <SingleCollection />
                </div>
                <div className="page_section">
                    {this.props.tabValue === 'my_collections' &&
                        <div className="data_table"><CollectionsTable/></div>}
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
    chainValue: PropTypes.string.isRequired,
    collections: PropTypes.object.isRequired,
    collectionsInProgress: PropTypes.bool.isRequired,
    fetchCollections: PropTypes.func.isRequired,
    keys: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    tabValue: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        chainValue: state.dashboard.chainValue.value,
        collections: state.collections.collectionSList.value,
        collectionsInProgress: state.collections.collectionSList.inProgress,
        keys: state.account.wallet.connection.keys,
        lang: state.language,
        tabValue: state.dashboard.tabValue.value,
    };
};

const actionsToProps = {
    fetchCollections,
};

export default connect(stateToProps, actionsToProps)(Dashboard);
