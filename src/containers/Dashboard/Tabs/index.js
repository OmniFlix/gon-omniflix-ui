import { AppBar, Tab } from '@mui/material';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { setTabValue } from '../../../actions/dashboard';
import variables from '../../../utils/variables';

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
                        label={<p className="text">{variables[this.props.lang]['all_collections']}</p>}
                        value="all_collections"
                        onClick={() => this.handleChange('all_collections')}
                        {...a11yProps(0)} />
                    <Tab
                        className={'tab ' + (this.props.tabValue === 'my_collections' ? 'active_tab' : '')}
                        label={<p className="text">{variables[this.props.lang]['my_collections']}</p>}
                        value="my_collections"
                        onClick={() => this.handleChange('my_collections')}
                        {...a11yProps(1)} />
                </div>
            </AppBar>
        );
    }
}

HeaderTabs.propTypes = {
    lang: PropTypes.string.isRequired,
    setTabValue: PropTypes.func.isRequired,
    tabValue: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        tabValue: state.dashboard.tabValue.value,
    };
};

const actionsToProps = {
    setTabValue,
};

export default connect(stateToProps, actionsToProps)(HeaderTabs);
