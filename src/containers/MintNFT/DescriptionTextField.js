import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextField from '../../components/TextField';
import variables from '../../utils/variables';
import { setDescription } from '../../actions/mintNFT';
import { unicodeToChar } from '../../utils/unicode';

const DescriptionTextField = (props) => {
    const handleChange = (value) => {
        // eslint-disable-next-line no-empty
        if (value.length === 257 || value.length > 257) {
        } else {
            props.onChange(value, true);
        }
    };

    return (
        <TextField
            multiline
            className="text_area"
            error={!props.valid}
            errorText={!props.valid ? variables[props.lang]['description_error'] : ''}
            id="description"
            name="description"
            placeholder={variables[props.lang]['enter_description']}
            value={unicodeToChar(props.value)}
            onChange={handleChange}/>
    );
};

DescriptionTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        valid: state.mintNFT.description.valid,
        value: state.mintNFT.description.value,
    };
};

const actionsToProps = {
    onChange: setDescription,
};

export default connect(stateToProps, actionsToProps)(DescriptionTextField);
