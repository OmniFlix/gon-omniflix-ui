import React, { Component } from 'react';
import AutoCompleteTextField from '../../components/AutoCompleteTextField/Tags';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import variables from '../../utils/variables';
import { setWhiteListValue } from '../../actions/mintNFT';
import { decodeFromBech32 } from '../../utils/address';
import { config } from '../../config';
import { showMessage } from '../../actions/snackbar';

class WhiteListTags extends Component {
    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleTags = this.handleTags.bind(this);
    }

    handleChange (value) {
        const tags = value.split(/[\n,\s+]/);
        if (tags.length > 1) {
            let array = [...this.props.value, ...tags];
            array = array.filter((item) => item !== '');
            array = array.filter((item, pos) => array.indexOf(item) === pos);
            let valid = true;
            array.map((val) => {
                const omniflixValid = val && decodeFromBech32(val) && (val.indexOf(config.PREFIX) > -1);

                if (!omniflixValid) {
                    valid = false;
                    this.props.showMessage(`In-valid address "${val}"`);
                    array = [...this.props.value];
                    this.props.onChange(array);
                }

                return null;
            });

            if (!valid) {
                return;
            }

            this.props.onChange(array);
        }
    }

    handleTags (value) {
        const address = value && value.length && value[value.length - 1];
        const omniflixValid = address && decodeFromBech32(address) && (address.indexOf(config.PREFIX) > -1);

        if (!omniflixValid) {
            if (address === 0) {
                this.props.onChange(value);

                return;
            }
            this.props.showMessage(`In-valid address "${address}"`);

            return;
        }

        this.props.onChange(value);
    }

    render () {
        return (
            <AutoCompleteTextField
                disableClearable
                freeSolo
                className="tags_select_field"
                handleInput={this.handleChange}
                id="tags"
                options={[]}
                placeholder={variables[this.props.lang]['add_addresses']}
                value={this.props.value} onChange={this.handleTags}/>
        );
    }
}

WhiteListTags.propTypes = {
    lang: PropTypes.string.isRequired,
    showMessage: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.mintNFT.whiteListValue,
    };
};

const actionsToProps = {
    onChange: setWhiteListValue,
    showMessage,
};

export default connect(stateToProps, actionsToProps)(WhiteListTags);
