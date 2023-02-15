import React from 'react';
import './index.css';
import ChainPopover from './ChainPopover';
import Tabs from './Tabs';
import SearchTextField from './SearchTextField';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CollectionsTable from './Tables/CollectionsTable';
import NFTsTable from './Tables/NFTsTable';
import IBCNFTsTable from './Tables/IBCNFTsTable';

const Dashboard = (props) => {
    return (
        <div className="home scroll_bar">
            <div className="header">
                <div className="left_section">
                    <ChainPopover/>
                    <p className="border"/>
                    <Tabs/>
                </div>
                <div className="right_section">
                    <SearchTextField/>
                </div>
            </div>
            <div className="page_section">
                {props.tabValue === 'collections' &&
                    <div className="data_table"><CollectionsTable /></div>}
                {props.tabValue === 'nfts' &&
                    <div className="data_table nfts_table"><NFTsTable /></div>}
                {props.tabValue === 'ibc_nfts' &&
                    <div className="data_table nfts_table"><IBCNFTsTable /></div>}
            </div>
        </div>
    );
};

Dashboard.propTypes = {
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

export default connect(stateToProps)(Dashboard);
