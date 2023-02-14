import { AppBar, Tab } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { setTabValue } from '../../../actions/home';
import variables from '../../../utils/variables';

class NavTabs extends Component {
    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (newValue) {
        if (newValue === this.props.tabValue) {
            return;
        }

        this.props.setTabValue(newValue);
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
                        className={'tab ' + (this.props.tabValue === 'collections' ? 'active_tab' : '')}
                        label={<p className="text">{variables[this.props.lang].collections}</p>}
                        value="collections"
                        onClick={() => this.handleChange('collections')}
                        {...a11yProps(0)} />
                    <Tab
                        className={'tab ' + (this.props.tabValue === 'nfts' ? 'active_tab' : '')}
                        label={<p className="text">{variables[this.props.lang].nfts}</p>}
                        value="nfts"
                        onClick={() => this.handleChange('nfts')}
                        {...a11yProps(1)} />
                    <Tab
                        className={'tab ' + (this.props.tabValue === 'ibc_nfts' ? 'active_tab' : '')}
                        label={<p className="text">{variables[this.props.lang]['ibc_nfts']}</p>}
                        value="ibc_nfts"
                        onClick={() => this.handleChange('ibc_nfts')}
                        {...a11yProps(2)} />
                </div>
            </AppBar>
        );
    }
}

NavTabs.propTypes = {
    lang: PropTypes.string.isRequired,
    setTabValue: PropTypes.func.isRequired,
    tabValue: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        tabValue: state.home.tabValue.value,
    };
};

const actionsToProps = {
    setTabValue,
};

export default connect(stateToProps, actionsToProps)(NavTabs);
