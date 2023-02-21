import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import variables from '../../utils/variables';
import SelectField from '../../components/SelectField';
import { setSuffixValue } from '../../actions/mintNFT';

class SuffixSelectField extends Component {
    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (value) {
        this.props.onChange(value, true);
    }

    render () {
        return (
            <SelectField
                id="suffix"
                name={variables[this.props.lang].suffix}
                options={this.props.options}
                placeholder={variables[this.props.lang]['select_suffix']}
                value={this.props.value}
                onChange={this.handleChange}/>
        );
    }
}

SuffixSelectField.propTypes = {
    lang: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.mintNFT.suffix.value,
        options: state.mintNFT.suffix.options,
    };
};

const actionsToProps = {
    onChange: setSuffixValue,
};

export default connect(stateToProps, actionsToProps)(SuffixSelectField);
