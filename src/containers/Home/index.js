import React from 'react';
import './index.css';
import ChainPopover from './ChainPopover';
import Tabs from './Tabs';
import SearchTextField from './SearchTextField';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CollectionsTable from './Tables/CollectionsTable';

const Home = (props) => {
    return (
        <div className="home scroll_bar">
            <div className="header">
                <div className="left_section">
                    <ChainPopover />
                    <p className="border"/>
                    <Tabs />
                </div>
                <div className="right_section">
                    <SearchTextField />
                </div>
            </div>
            <div className="page_section">
                {props.tabValue === 'collections' &&
                    <div className="data_table"><CollectionsTable /></div>}
            </div>
        </div>
    );
};

Home.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    tabValue: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        tabValue: state.home.tabValue.value,
    };
};

export default connect(stateToProps)(Home);
