import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextField from '../../components/TextField';
import variables from '../../utils/variables';
import { setSuffixCount } from '../../actions/mintNFT';

const SuffixStartTextField = (props) => {
    const handleChange = (value) => {
        props.onChange(value, true);
    };

    return (
        <TextField
            error={!props.valid}
            errorText={!props.valid ? variables[props.lang]['suffix_count_error'] : ''}
            id="suffix-start-count"
            name="suffixCount"
            placeholder={variables[props.lang]['suffix_count']}
            type="number"
            value={props.value}
            onChange={handleChange}/>
    );
};

SuffixStartTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        valid: state.mintNFT.suffix.countValid,
        value: state.mintNFT.suffix.count,
    };
};

const actionsToProps = {
    onChange: setSuffixCount,
};

export default connect(stateToProps, actionsToProps)(SuffixStartTextField);
