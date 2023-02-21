import CloseIcon from '@mui/icons-material/Close';
import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';
import successIcon from '../../assets/snackbar/success.svg';
import errorIcon from '../../assets/snackbar/error.svg';
import shareIcon from '../../assets/snackbar/share.svg';
import CopyButton from '../CopyButton';
import copyIcon from '../../assets/snackbar/copy.svg';
import { IconButton, LinearProgress, Slide, Snackbar as MaterialSnackbar } from '@mui/material';
import warningIcon from '../../assets/snackbar/warning.png';
import { EXPLORER_URL } from '../../config';

const TransitionUp = (props) => <Slide direction="up" {...props}/>;

const Snackbar = (props) => {
    const handleClose = () => {
        if (props.manual) {
            return null;
        }

        props.onClose();
    };

    const explorer = props.explorer ? props.explorer : EXPLORER_URL;

    return (
        <MaterialSnackbar
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            TransitionComponent={TransitionUp}
            action={
                <React.Fragment>
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5 }}
                        onClick={props.onClose}>
                        <CloseIcon/>
                    </IconButton>
                </React.Fragment>
            }
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            autoHideDuration={props.manual ? null : 5000}
            className="snackbar"
            message={<div>
                {props.variant === 'success'
                    ? <div className="snackbar_class success_snackbar" id="message-id">
                        <img alt="icon" height="30" src={successIcon} width="30"/>
                        <span>{props.message}</span>
                    </div>
                    : props.variant === 'error'
                        ? <div className="snackbar_class error_snackbar" id="message-id">
                            <img alt="icon" height="30" src={errorIcon} width="30"/>
                            <span>{props.message}</span>
                        </div>
                        : props.variant === 'warning'
                            ? <div className="snackbar_class error_snackbar" id="message-id">
                                <img alt="icon" height="30" src={warningIcon} width="30"/>
                                <span>{props.message}</span>
                            </div>
                            : <div className="snackbar_class" id="message-id">
                                <span>{props.message}</span>
                            </div>}
                {props.hash && <div className="tx_hash">
                    <span>TxnHash</span>
                    <p>{props.hash}</p>
                    <CopyButton data={explorer + '/txs/' + props.hash} icon={copyIcon}/>
                    <img
                        alt="share"
                        height="18" src={shareIcon}
                        width="18"
                        onClick={() => window.open(explorer + '/txs/' + props.hash)}/>
                </div>}
                {(props.variant === 'success' || props.variant === 'processing') && props.progress
                    ? <div className="snackbar_linear_progress">
                        <LinearProgress className="success_progress"/>
                    </div>
                    : props.variant === 'error' && props.progress
                        ? <div className="snackbar_linear_progress">
                            <LinearProgress className="fail_progress"/>
                        </div>
                        : props.variant === 'warning' && props.progress
                            ? <div className="snackbar_linear_progress">
                                <LinearProgress className="warning_progress"/>
                            </div>
                            : props.progress
                                ? <div className="snackbar_linear_progress">
                                    <LinearProgress/>
                                </div>
                                : null}
            </div>}
            open={props.open}
            variant={props.variant}
            onClose={handleClose}/>
    );
};

Snackbar.propTypes = {
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    explorer: PropTypes.string,
    hash: PropTypes.string,
    manual: PropTypes.bool,
    progress: PropTypes.bool,
    variant: PropTypes.string,
};

export default Snackbar;
