import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextField from '../../components/TextField';
import variables from '../../utils/variables';
import { setRoyaltyShare } from '../../actions/mintNFT';

const RoyaltyShareTextField = (props) => {
    const handleChange = (value) => {
        if (value < 100) {
            props.onChange(value);
        }
    };

    return (
        <TextField
            id="royalty-share"
            name="royaltyShare"
            placeholder={variables[props.lang]['enter_royalty_share']}
            value={props.value}
            onChange={handleChange}/>
    );
};

RoyaltyShareTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.mintNFT.royaltyShare.value,
    };
};

const actionsToProps = {
    onChange: setRoyaltyShare,
};

export default connect(stateToProps, actionsToProps)(RoyaltyShareTextField);
