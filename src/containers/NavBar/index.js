import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as FaucetIcon } from '../../assets/navBar/faucet.svg';
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
import { setEmptyValue } from '../../actions/account';
import { config } from '../../config';
import { setRpcClient } from '../../actions/query';

class NavBar extends Component {
    componentDidMount () {
        if (this.props.rpcClient && !this.props.rpcClient.omniflix && !this.props.rpcClientInProgress) {
            this.props.setRpcClient('omniflix');
        }

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
            this.props.setEmptyValue();
            this.initKeplr();
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
        let balance = this.props.balance && this.props.balance.length && this.props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
        balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

        return (
            <div className="navbar">
                <div className="left_section">
                    <Logo/>
                </div>
                <Tabs/>
                <div className="right_section">
                    {(balance && balance > 0)
                        ? null
                        : this.props.address !== '' &&
                        <Button className="claim_button" onClick={this.props.showClaimFaucetDialog}>
                            <FaucetIcon/>
                            {variables[this.props.lang].faucet}
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
    rpcClient: PropTypes.any.isRequired,
    rpcClientInProgress: PropTypes.bool.isRequired,
    setDisconnect: PropTypes.func.isRequired,
    setEmptyValue: PropTypes.func.isRequired,
    setRpcClient: PropTypes.func.isRequired,
    showClaimFaucetDialog: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        balance: state.account.bc.balance.value,
        balanceInProgress: state.account.bc.balance.inProgress,
        lang: state.language,
        rpcClient: state.query.rpcClient.value,
        rpcClientInProgress: state.query.rpcClient.inProgress,
    };
};

const actionToProps = {
    fetchBalance,
    initializeChain,
    setDisconnect,
    setEmptyValue,
    setRpcClient,
    showClaimFaucetDialog,
};

export default connect(stateToProps, actionToProps)(NavBar);
