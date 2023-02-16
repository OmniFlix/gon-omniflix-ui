import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextField from '../../components/TextField';
import variables from '../../utils/variables';
import { unicodeToChar } from '../../utils/unicode';
import { setCollectionDescription } from '../../actions/collections';

const DescriptionTextField = (props) => {
    const handleChange = (value) => {
        // eslint-disable-next-line no-empty
        if (value.length === 241 || value.length > 241) {
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
            placeholder={variables[props.lang]['collection_placeholder_description']}
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
        valid: state.collections.createCollection.descriptionValid,
        value: state.collections.createCollection.description,
    };
};

const actionsToProps = {
    onChange: setCollectionDescription,
};

export default connect(stateToProps, actionsToProps)(DescriptionTextField);
