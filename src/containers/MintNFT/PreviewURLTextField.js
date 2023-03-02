import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextField from '../../components/TextField';
import variables from '../../utils/variables';
import { setPreviewURL } from '../../actions/mintNFT';

const PreviewURLTextField = (props) => {
    const handleChange = (value) => {
        props.onChange(value, true);
    };

    return (
        <TextField
            id="preview-url"
            name="previewURL"
            placeholder={variables[props.lang]['enter_url']}
            value={props.value}
            onChange={handleChange}/>
    );
};

PreviewURLTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.mintNFT.previewURL.value,
    };
};

const actionsToProps = {
    onChange: setPreviewURL,
};

export default connect(stateToProps, actionsToProps)(PreviewURLTextField);
