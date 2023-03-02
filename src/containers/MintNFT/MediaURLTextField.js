import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextField from '../../components/TextField';
import variables from '../../utils/variables';
import { setMediaURL } from '../../actions/mintNFT';

const MediaURLTextField = (props) => {
    const handleChange = (value) => {
        props.onChange(value, true);
    };

    return (
        <TextField
            id="media-url"
            name="mediaURL"
            placeholder={variables[props.lang]['enter_url']}
            value={props.value}
            onChange={handleChange}/>
    );
};

MediaURLTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.mintNFT.mediaURL.value,
    };
};

const actionsToProps = {
    onChange: setMediaURL,
};

export default connect(stateToProps, actionsToProps)(MediaURLTextField);
