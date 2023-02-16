import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextField from '../../components/TextField';
import variables from '../../utils/variables';
import { setCollectionSymbol } from '../../actions/collections';

const CollectionSymbolTextField = (props) => {
    const handleChange = (value) => {
        props.onChange(value, true);
    };

    return (
        <TextField
            id="collection-symbol"
            name="collectionSymbol"
            placeholder={variables[props.lang]['enter_collection_symbol']}
            value={props.value}
            onChange={handleChange}/>
    );
};

CollectionSymbolTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.collections.createCollection.symbol,
    };
};

const actionsToProps = {
    onChange: setCollectionSymbol,
};

export default connect(stateToProps, actionsToProps)(CollectionSymbolTextField);
