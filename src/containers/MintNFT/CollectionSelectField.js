import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import variables from '../../utils/variables';
import { setCollection } from '../../actions/mintNFT';
import CreatableSelectField from '../../components/SelectField/CreatableSelectField';
import { fetchCollections } from '../../actions/collections';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '../../config';

class CollectionSelectField extends Component {
    componentDidMount () {
        if (this.props.options && (this.props.options.length || this.props.inProgress)) {
            return;
        }

        if (this.props.address !== '' && this.props.options && (this.props.options.length === 0) &&
            this.props.rpcClient && this.props.rpcClient.omniflix) {
            this.props.fetch(this.props.rpcClient, 'omniflix', this.props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
        }
    }

    componentDidUpdate (pp, ps, ss) {
        if (this.props.address && (pp.address !== this.props.address) && this.props.rpcClient &&
            this.props.rpcClient.omniflix) {
            this.props.fetch(this.props.rpcClient, 'omniflix', this.props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
        }
        if (this.props.rpcClient && pp.rpcClient !== this.props.rpcClient && this.props.rpcClient.omniflix &&
            this.props.address !== '' && this.props.options && (this.props.options.length === 0)) {
            this.props.fetch(this.props.rpcClient, 'omniflix', this.props.address, DEFAULT_SKIP, DEFAULT_LIMIT);
        }
    }

    render () {
        return (
            <CreatableSelectField
                id="collection"
                name="collection"
                options={this.props.options}
                placeholder={variables[this.props.lang]['select_collection']}
                value={this.props.value}
                onChange={this.props.onChange}/>
        );
    }
}

CollectionSelectField.propTypes = {
    address: PropTypes.string.isRequired,
    fetch: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    rpcClient: PropTypes.any.isRequired,
    rpcClientInProgress: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        inProgress: state.mintNFT.collection.inProgress,
        lang: state.language,
        value: state.mintNFT.collection.value,
        options: state.mintNFT.collection.options,
        rpcClient: state.query.rpcClient.value,
        rpcClientInProgress: state.query.rpcClient.inProgress,
    };
};

const actionsToProps = {
    fetch: fetchCollections,
    onChange: setCollection,
};

export default connect(stateToProps, actionsToProps)(CollectionSelectField);
