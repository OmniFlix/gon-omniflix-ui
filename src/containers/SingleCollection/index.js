import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import Info from './Info';
import NFTsTable from '../Dashboard/Tables/NFTsTable';
import ChainPopover from '../Dashboard/ChainPopover';
import Tabs from '../Dashboard/Tabs';
import { Button } from '@mui/material';
import variables from '../../utils/variables';
import '../Dashboard/index.css';

const SingleCollection = (props) => {
    return (
        <div className="home single_collection scroll_bar">
            <ChainPopover/>
            <p className="border"/>
            <div className="header">
                <div className="left_section">
                    <Tabs/>
                </div>
                <div className="center_section">
                    <span>
                        {props.tabValue && props.tabValue.replace(/_/g, ' ')}
                        {'    /  '}
                    </span>
                    <p>Collection Name</p>
                </div>
                <div className="right_section">
                    <Button>
                        {variables[props.lang]['create_collection']}
                    </Button>
                    <Button>
                        {variables[props.lang]['create_nft']}
                    </Button>
                </div>
            </div>
            <Info />
            <div className="data_table nfts_table">
                <NFTsTable/>
            </div>
        </div>
    );
};

SingleCollection.propTypes = {
    address: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    tabValue: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        address: state.account.wallet.connection.address,
        tabValue: state.dashboard.tabValue.value,
    };
};

export default connect(stateToProps)(SingleCollection);
