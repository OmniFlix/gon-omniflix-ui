import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextField from '../../components/TextField';
import variables from '../../utils/variables';
import { setAssetTitle } from '../../actions/mintNFT';

const AssetTitleTextField = (props) => {
    const handleChange = (value) => {
        props.onChange(value, true);
    };

    return (
        <TextField
            error={!props.valid}
            errorText={!props.valid ? variables[props.lang]['asset_title_error'] : ''}
            id="asset-title"
            name="assetTitle"
            placeholder={variables[props.lang]['enter_asset_title']}
            value={props.value}
            onChange={handleChange}/>
    );
};

AssetTitleTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        valid: state.mintNFT.assetTitle.valid,
        value: state.mintNFT.assetTitle.value,
    };
};

const actionsToProps = {
    onChange: setAssetTitle,
};

export default connect(stateToProps, actionsToProps)(AssetTitleTextField);
