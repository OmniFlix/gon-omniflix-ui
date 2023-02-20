import React from 'react';
import './index.css';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LeftSection from './LeftSection';
import ConfirmMintNFTDialog from './ConfirmDialog';
import variables from '../../utils/variables';

const BulkMint = (props) => {
    return (
        <div className="send_many">
            <h1>{variables[props.lang]['upload_assets']}</h1>
            <div className="section video_info">
                <LeftSection/>
            </div>
            <ConfirmMintNFTDialog/>
        </div>
    );
};

BulkMint.propTypes = {
    lang: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

export default connect(stateToProps)(BulkMint);
