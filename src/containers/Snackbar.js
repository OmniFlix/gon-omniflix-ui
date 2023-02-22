import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { hideSnackbar } from '../actions/snackbar';
import Snackbar from '../components/Snackbar';
import withRouter from '../components/WithRouter';

const SnackbarMessage = (props) => {
    return (
        <Snackbar
            explorer={props.explorer}
            hash={props.hash}
            // manual={props.ibcTxInProgress}
            message={props.message}
            open={props.open}
            progress={props.variant === 'processing'}
            variant={props.variant}
            onClose={props.onClose}/>
    );
};

SnackbarMessage.propTypes = {
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
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
        variant: state.snackbar.variant,
        hash: state.snackbar.hash,
    };
};

const actionsToProps = {
    onClose: hideSnackbar,
};

export default withRouter(connect(stateToProps, actionsToProps)(SnackbarMessage));
