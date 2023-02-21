import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { hideSnackbar } from '../actions/snackbar';
import Snackbar from '../components/Snackbar';
import withRouter from '../components/WithRouter';
import { fetchAccessToken } from '../actions/account';

class SnackbarMessage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            message: null,
        };
    }

    componentDidUpdate (pp, ps, ss) {
        if (pp.message !== this.props.message) {
            if (pp.message === 'File Upload Failed! Try after sometime.' && this.props.message === 'Asset Deleted Successfully') {
                this.setState({
                    message: 'File Upload Failed! Try after sometime.',
                });

                return;
            } else if (this.state.message) {
                this.setState({
                    message: null,
                });
            }

            switch (this.props.message) {
            case 'Token is expired':
            case 'Error occurred while verifying the JWT token.':
            case 'User Id and token combination does not exist.':
                this.props.onClose();

                /* use with Access Token API */
                if (this.props.tokenInProgress) {
                    return;
                }

                return this.props.fetchAccessToken((error) => {
                    if (error) {
                        this.props.router.navigate('/');
                    }
                });
            default:
                break;
            }
        }
    }

    render () {
        return (
            <Snackbar
                explorer={this.props.explorer}
                hash={this.props.hash}
                // manual={this.props.ibcTxInProgress}
                message={this.state.message || this.props.message}
                open={this.props.open}
                progress={this.props.variant === 'processing'}
                variant={this.props.variant}
                onClose={this.props.onClose}/>
        );
    }
}

SnackbarMessage.propTypes = {
    fetchAccessToken: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    tokenInProgress: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    explorer: PropTypes.string,
    hash: PropTypes.string,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }),
    variant: PropTypes.string,
};

const stateToProps = (state) => {
    return {
        explorer: state.snackbar.explorer,
        open: state.snackbar.open,
        message: state.snackbar.message,
        tokenInProgress: state.account.token.inProgress,
        variant: state.snackbar.variant,
        hash: state.snackbar.hash,
    };
};

const actionsToProps = {
    fetchAccessToken,
    onClose: hideSnackbar,
};

export default withRouter(connect(stateToProps, actionsToProps)(SnackbarMessage));
