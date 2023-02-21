import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFaucetBalance, fetchFaucetClaim, hideClaimFaucetDialog, setFaucetSuccess } from '../../../actions/navBar';
import { Button, Dialog, DialogContent } from '@mui/material';
import React from 'react';
import variables from '../../../utils/variables';
import closeIcon from '../../../assets/close.svg';
import './index.css';
import flixIcon from '../../../assets/tokens/flix.svg';
import { config } from '../../../config';
import { fetchBalance } from '../../../actions/account/BCDetails';

const ClaimFaucetDialog = (props) => {
    const handleFaucet = () => {
        const data = {
            address: props.address,
        };
        props.addFaucetBalance(config.CHAIN_ID, data, (error) => {
            if (!error) {
                setTimeout(() => {
                    props.fetchBalance(props.address);
                    props.fetchFaucetClaim(props.address);
                }, 5000);
                props.setFaucetSuccess();
            }
        });
    };

    return (
        <Dialog
            aria-describedby="verify-twitter-dialog-description"
            aria-labelledby="verify-twitter-dialog-title"
            className="dialog claim_faucet_dialog"
            open={props.open}
            onClose={props.handleClose}>
            <DialogContent className="claim_faucet_dialog_content">
                <h2>{variables[props.lang].faucet}</h2>
                <img alt="close" className="close_button" src={closeIcon} onClick={props.handleClose}/>
                <div className="card">
                    <div className="left_section">
                        <img alt="flix" src={flixIcon}/>
                        <div>
                            <p className="chain_name">{config.CHAIN_NAME}</p>
                            <p className="chain_id">{config.CHAIN_ID}</p>
                        </div>
                    </div>
                    <div className="right_section">
                        <Button onClick={() => handleFaucet()}>
                            {variables[props.lang]['claim_test_tokens']}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

ClaimFaucetDialog.propTypes = {
    addFaucetBalance: PropTypes.func.isRequired,
    address: PropTypes.string.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchFaucetClaim: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    router: PropTypes.shape({
        params: PropTypes.shape({
            collectionID: PropTypes.string,
        }).isRequired,
    }).isRequired,
    setFaucetSuccess: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        lang: state.language,
        open: state.navBar.claimFaucetDialog.open,
    };
};

const actionToProps = {
    handleClose: hideClaimFaucetDialog,
    addFaucetBalance,
    fetchFaucetClaim,
    fetchBalance,
    setFaucetSuccess,
};

export default connect(stateToProps, actionToProps)(ClaimFaucetDialog);
