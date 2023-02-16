import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import Info from './Info';
import NFTsTable from '../Tables/NFTsTable';

const SingleCollection = (props) => {
    return (
        <div className="single_collection">
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
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        address: state.account.wallet.connection.address,
    };
};

export default connect(stateToProps)(SingleCollection);
