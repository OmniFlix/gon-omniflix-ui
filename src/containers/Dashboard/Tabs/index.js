import { AppBar, Tab } from '@mui/material';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { setTabValue } from '../../../actions/dashboard';
import variables from '../../../utils/variables';
import { fetchAllCollections, fetchCollections } from '../../../actions/collections';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '../../../config';

class HeaderTabs extends Component {
    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (newValue) {
        if (newValue === this.props.tabValue) {
            return;
        }

        this.props.setTabValue(newValue);

        if (newValue === 'my_collections' && !this.props.collectionsInProgress && this.props.chainValue &&
            !this.props.collections[this.props.chainValue] && this.props.address !== '') {
            this.props.fetchCollections(this.props.rpcClient, this.props.chainValue, this.props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
        }

        if (newValue === 'all_collections' && !this.props.allCollectionsInProgress && this.props.chainValue &&
            !this.props.allCollections[this.props.chainValue]) {
            this.props.fetchAllCollections(this.props.rpcClient, this.props.chainValue, DEFAULT_SKIP, DEFAULT_LIMIT);
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
                            {this.props.chainValue === 'stargaze' && this.props.gqlAllCollections &&
                            this.props.gqlAllCollections[this.props.chainValue] && this.props.gqlAllCollections[this.props.chainValue].total
                                ? ` (${this.props.gqlAllCollections[this.props.chainValue].total})`
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
                </div>
            </AppBar>
        );
    }
}

HeaderTabs.propTypes = {
    address: PropTypes.string.isRequired,
    allCollections: PropTypes.object.isRequired,
    allCollectionsInProgress: PropTypes.bool.isRequired,
    chainValue: PropTypes.string.isRequired,
    collections: PropTypes.object.isRequired,
    collectionsInProgress: PropTypes.bool.isRequired,
    fetchAllCollections: PropTypes.func.isRequired,
    fetchCollections: PropTypes.func.isRequired,
    gqlAllCollections: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    rpcClient: PropTypes.any.isRequired,
    setTabValue: PropTypes.func.isRequired,
    tabValue: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        chainValue: state.dashboard.chainValue.value,
        collections: state.collections.collectionSList.value,
        collectionsInProgress: state.collections.collectionSList.inProgress,
        allCollections: state.collections.allCollectionSList.value,
        allCollectionsInProgress: state.collections.allCollectionSList.inProgress,
        gqlAllCollections: state.collections._gql.allCollectionSList.value,
        lang: state.language,
        rpcClient: state.query.rpcClient.value,
        tabValue: state.dashboard.tabValue.value,
    };
};

const actionsToProps = {
    fetchCollections,
    fetchAllCollections,
    setTabValue,
};

export default connect(stateToProps, actionsToProps)(HeaderTabs);
