import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import variables from '../../../../utils/variables';
import SelectField from '../../../../components/SelectField/TokenSelectField';
import { tokensList } from '../../../../utils/defaultOptions';
import { images } from '../../../../components/NetworkImages/ImagesOptions';
import { setTokenValue } from '../../../../actions/dashboard';

class SelectTokenSelectField extends Component {
    // componentDidMount () {
    //     if (this.props.ibcTokensList.length === 0 && !this.props.ibcTokensListInProgress) {
    //         this.props.fetchIBCTokensList();
    //     }
    // }

    render () {
        const options = [...tokensList];
        // if (list && list.length) {
        //     options.push(...list);
        // }

        return (
            <SelectField
                id="token"
                images={images}
                name="token"
                options={options}
                placeholder={variables[this.props.lang]['select_token']}
                value={this.props.value}
                onChange={this.props.onChange}/>
        );
    }
}

SelectTokenSelectField.propTypes = {
    lang: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.dashboard.tokenValue.value,
    };
};

const actionsToProps = {
    onChange: setTokenValue,
};

export default connect(stateToProps, actionsToProps)(SelectTokenSelectField);
