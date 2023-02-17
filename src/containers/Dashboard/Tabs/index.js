import { AppBar, Tab } from '@mui/material';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { setTabValue } from '../../../actions/dashboard';
import variables from '../../../utils/variables';
import { fetchCollections } from '../../../actions/collections';
import { DEFAULT_SKIP } from '../../../constants/url';

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

        if (newValue === 'collections' && !this.props.collectionsInProgress && this.props.chainValue &&
            !this.props.collections[this.props.chainValue] && this.props.address !== '') {
            this.props.fetchCollections(this.props.chainValue, this.props.address, DEFAULT_SKIP, 500);
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
                        className={'tab ' + (this.props.tabValue === 'nfts' ? 'active_tab' : '')}
                        label={<p className="text">{variables[this.props.lang]['native_nfts']}</p>}
                        value="nfts"
                        onClick={() => this.handleChange('nfts')}
                        {...a11yProps(0)} />
                    <Tab
                        className={'tab ' + (this.props.tabValue === 'ibc_nfts' ? 'active_tab' : '')}
                        label={<p className="text">{variables[this.props.lang]['ibc_nfts']}</p>}
                        value="ibc_nfts"
                        onClick={() => this.handleChange('ibc_nfts')}
                        {...a11yProps(1)} />
                    <Tab
                        className={'tab ' + (this.props.tabValue === 'collections' ? 'active_tab' : '')}
                        label={<p className="text">{variables[this.props.lang].collections}</p>}
                        value="collections"
                        onClick={() => this.handleChange('collections')}
                        {...a11yProps(2)} />
                </div>
            </AppBar>
        );
    }
}

HeaderTabs.propTypes = {
    address: PropTypes.string.isRequired,
    chainValue: PropTypes.string.isRequired,
    collections: PropTypes.object.isRequired,
    collectionsInProgress: PropTypes.bool.isRequired,
    fetchCollections: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    setTabValue: PropTypes.func.isRequired,
    tabValue: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        chainValue: state.dashboard.chainValue.value,
        collections: state.collections.collectionSList.value,
        collectionsInProgress: state.collections.collectionSList.inProgress,
        lang: state.language,
        tabValue: state.dashboard.tabValue.value,
    };
};

const actionsToProps = {
    fetchCollections,
    setTabValue,
};

export default connect(stateToProps, actionsToProps)(HeaderTabs);