import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import OtpInput from 'react-otp-input';
import { setNftID } from '../../../actions/collection';

const BurnNFTTextField = (props) => {
    return (
        <OtpInput
            className="burn_nft"
            numInputs={4}
            shouldAutoFocus={true}
            value={props.value}
            onChange={props.onChange}/>
    );
};

BurnNFTTextField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.collection.nftID,
    };
};

const actionsToProps = {
    onChange: setNftID,
};

export default connect(stateToProps, actionsToProps)(BurnNFTTextField);
