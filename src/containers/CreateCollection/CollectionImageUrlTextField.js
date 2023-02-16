import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextField from '../../components/TextField';
import variables from '../../utils/variables';
import { setCollectionImageUrl } from '../../actions/collections';

const CollectionImageUrlTextField = (props) => {
    const handleChange = (value) => {
        props.onChange(value, true);
    };

    return (
        <TextField
            id="collection-image-url"
            name="imageURL"
            placeholder={variables[props.lang]['nft_avatar_placeholder']}
            value={props.value}
            onChange={handleChange}/>
    );
};

CollectionImageUrlTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.collections.createCollection.imageUrl,
    };
};

const actionsToProps = {
    onChange: setCollectionImageUrl,
};

export default connect(stateToProps, actionsToProps)(CollectionImageUrlTextField);
