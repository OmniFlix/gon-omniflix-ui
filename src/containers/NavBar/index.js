import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as FaucetIcon } from '../../assets/navBar/faucet.svg';
// import { ReactComponent as CreateIcon } from '../../assets/navBar/create.svg';
import { Button } from '@mui/material';
import variables from '../../utils/variables';
import ConnectButton from './ConnectButton';
import { initializeChain, setDisconnect } from '../../actions/account/wallet';
import { fetchBalance } from '../../actions/account/BCDetails';
import ConnectedAccount from './ConnectedAccount';
import Tabs from './Tabs';
import CreatePopover from './CreatePopover';
import { showClaimFaucetDialog } from '../../actions/navBar';
import ClaimFaucetDialog from './ClaimFaucetDialog';

class NavBar extends Component {
    componentDidMount () {
        if (this.props.address === '' && localStorage.getItem('gon_of_address')) {
            setTimeout(() => {
                this.initializeKeplr();
            }, 600);
        } else {
            if ((this.props.address) &&
                (this.props.balance.length === 0) && !this.props.balanceInProgress) {
                this.props.fetchBalance(this.props.address);
            }
        }

        window.addEventListener('keplr_keystorechange', () => {
            this.props.setDisconnect();
            this.initKeplr();
            localStorage.removeItem('acToken_gon_of');
            localStorage.removeItem('gon_of_address');
        });
    }

    componentWillUnmount () {
        window.removeEventListener('keplr_keystorechange', this.initKeplr);
    }

    initKeplr () {
        this.props.initializeChain((address) => {
            localStorage.setItem('gon_of_address', address && address.length && address[0] && address[0].address);
            this.props.fetchBalance(address[0].address);
        });
    }

    initializeKeplr () {
        this.props.initializeChain((address) => {
            if (!address) {
                window.onload = () => this.initializeKeplr();
                return;
            }

            localStorage.setItem('gon_of_address', address && address.length && address[0] && address[0].address);
            if ((address && address.length && address[0] && address[0].address) &&
                (this.props.balance.length === 0) && !this.props.balanceInProgress) {
                this.props.fetchBalance(address[0].address);
            }
        });
    }

    render () {
        return (
            <div className="navbar">
                <div className="left_section">
                    <Logo/>
                </div>
                <Tabs/>
                <div className="right_section">
                    {this.props.address !== '' &&
                        <Button className="claim_button" onClick={this.props.showClaimFaucetDialog}>
                            <FaucetIcon/>
                            {variables[this.props.lang]['claim_faucet']}
                        </Button>}
                    <CreatePopover/>
                    <div className="connect_account">
                        {this.props.address === '' && !localStorage.getItem('gon_of_address')
                            ? <ConnectButton/>
                            : <ConnectedAccount/>}
                    </div>
                </div>
                <ClaimFaucetDialog/>
            </div>
        );
    }
}

NavBar.propTypes = {
    address: PropTypes.string.isRequired,
    balance: PropTypes.array.isRequired,
    balanceInProgress: PropTypes.bool.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    initializeChain: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    setDisconnect: PropTypes.func.isRequired,
    showClaimFaucetDialog: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        balance: state.account.bc.balance.value,
        balanceInProgress: state.account.bc.balance.inProgress,
        lang: state.language,
    };
};

const actionToProps = {
    fetchBalance,
    initializeChain,
    setDisconnect,
    showClaimFaucetDialog,
};

export default connect(stateToProps, actionToProps)(NavBar);
