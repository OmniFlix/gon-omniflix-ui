import { AppBar, Tab } from '@mui/material';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import variables from '../../utils/variables';
import { setNavTabs } from '../../actions/navBar';
import withRouter from '../../components/WithRouter';

class NavTabs extends Component {
    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount () {
        const route = this.props.router.location && this.props.router.location.pathname &&
            this.props.router.location.pathname.split('/') && this.props.router.location.pathname.split('/')[1];

        if (route === '') {
            this.props.setNavTabs('about');
            this.props.router.navigate('/about');
        }
        if (this.props.tabValue !== route) {
            this.props.setNavTabs(route);
        }
    }

    componentDidUpdate (pp, ps, ss) {
        if (pp.router.location.pathname !== (this.props.router.location && this.props.router.location.pathname)) {
            const value = this.props.router.location && this.props.router.location.pathname.split('/')[1];

            if (value !== this.props.tabValue) {
                this.props.setNavTabs(value);
            }
        }
    }

    handleChange (newValue) {
        this.props.setNavTabs(newValue);
        this.props.router.navigate('/' + newValue);
    }

    render () {
        const a11yProps = (index) => {
            return {
                id: `nav-tab-${index}`,
                'aria-controls': `nav-tabpanel-${index}`,
            };
        };

        const route = this.props.router.location && this.props.router.location.pathname &&
            this.props.router.location.pathname.split('/') && this.props.router.location.pathname.split('/')[1];

        return (
            <AppBar className="horizontal_tabs" position="static">
                <div className="tabs_content">
                    <Tab
                        className={'tab ' + (route === 'about' ? 'active_tab' : '')}
                        label={variables[this.props.lang].about}
                        value="about"
                        onClick={() => this.handleChange('about')}
                        {...a11yProps(0)} />
                    <Tab
                        className={'tab ' + (route === 'dashboard' ? 'active_tab' : '')}
                        label={variables[this.props.lang].dashboard}
                        value="dashboard"
                        onClick={() => this.handleChange('dashboard')}
                        {...a11yProps(1)} />
                </div>
            </AppBar>
        );
    }
}

NavTabs.propTypes = {
    lang: PropTypes.string.isRequired,
    setNavTabs: PropTypes.func.isRequired,
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
        lang: state.language,
        tabValue: state.navBar.tabValue.value,
    };
};

const actionsToProps = {
    setNavTabs,
};

export default withRouter(connect(stateToProps, actionsToProps)(NavTabs));
