import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextField from '../../../components/TextField';
import variables from '../../../utils/variables';
import { config } from '../../../config';
import { decodeFromBech32 } from '../../../utils/address';
import { setTransferAddress } from '../../../actions/collection';

const AddressTextField = (props) => {
    const handleChange = (value) => {
        props.onChange(value);
    };

    const valid = props.value && decodeFromBech32(props.value) && (props.value.indexOf(config.PREFIX) > -1);

    return (
        <TextField
            className="address_field"
            error={props.value !== '' ? !valid : false}
            errorText={variables[props.lang]['invalid_address']}
            id="address-value"
            name="address"
            placeholder={variables[props.lang]['enter_your'] + (props.chainID ? props.chainID : '') +
                variables[props.lang]['account_address']}
            value={props.value}
            onChange={handleChange}/>
    );
};

AddressTextField.propTypes = {
    chainID: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.collection.address,
        chainID: state.collection.chainID,
    };
};

const actionsToProps = {
    onChange: setTransferAddress,
};

export default connect(stateToProps, actionsToProps)(AddressTextField);
