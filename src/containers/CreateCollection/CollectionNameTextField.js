import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextField from '../../components/TextField';
import variables from '../../utils/variables';
import { setCollectionName } from '../../actions/collections';

const CollectionNameTextField = (props) => {
    const handleChange = (value) => {
        props.onChange(value, true);
    };

    return (
        <TextField
            id="collection-name"
            name="collectionName"
            placeholder={variables[props.lang]['enter_collection_name']}
            value={props.value}
            onChange={handleChange}/>
    );
};

CollectionNameTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.collections.createCollection.value,
    };
};

const actionsToProps = {
    onChange: setCollectionName,
};

export default connect(stateToProps, actionsToProps)(CollectionNameTextField);
