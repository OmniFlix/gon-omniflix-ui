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
import CircularProgress from '../../../components/CircularProgress';
import IrisIcon from '../../../assets/chains/iris.svg';
import StargazeIcon from '../../../assets/chains/stargaze.svg';
import JunoIcon from '../../../assets/chains/juno.svg';
import UpTickIcon from '../../../assets/chains/uptick.svg';

const ClaimFaucetDialog = (props) => {
    const handleFaucet = () => {
        props.addFaucetBalance(props.address, (error) => {
            if (!error) {
                props.fetchBalance(props.address);
                setTimeout(() => {
                    props.fetchBalance(props.address);
                    // props.fetchFaucetClaim(props.address);
                }, 5000);
                props.setFaucetSuccess();
            }
        });
    };

    let balance = props.balance && props.balance.length && props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
    balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

    return (
        <Dialog
            aria-describedby="verify-twitter-dialog-description"
            aria-labelledby="verify-twitter-dialog-title"
            className="dialog claim_faucet_dialog"
            open={props.open}
            onClose={props.handleClose}>
            <DialogContent className="claim_faucet_dialog_content">
                {props.inProgress && <CircularProgress className="full_screen"/>}
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
                        {balance && balance > 0
                            ? <Button disabled>
                                {variables[props.lang]['claim_test_tokens']}
                            </Button>
                            : <Button onClick={() => handleFaucet()}>
                                {variables[props.lang]['claim_test_tokens']}
                            </Button>}
                    </div>
                </div>
                <div className="discord_links">
                    <p>{variables[props.lang]['discord_url_content']}</p>
                    <div>
                        <Button>
                            <img alt="stargaze" src={StargazeIcon}/>
                            <p>Stargaze</p>
                        </Button>
                        <Button>
                            <img alt="irisNet" src={IrisIcon}/>
                            <p>IrisNet</p>
                        </Button>
                        <Button>
                            <img alt="juno" src={JunoIcon}/>
                            <p>Juno</p>
                        </Button>
                        <Button>
                            <img alt="uptick" src={UpTickIcon}/>
                            <p>Uptick</p>
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
    balance: PropTypes.array.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchFaucetClaim: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    setFaucetSuccess: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        balance: state.account.bc.balance.value,
        lang: state.language,
        open: state.navBar.claimFaucetDialog.open,
        inProgress: state.navBar.claimFaucetDialog.inProgress,
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
