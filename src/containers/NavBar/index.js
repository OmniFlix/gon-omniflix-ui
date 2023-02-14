import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { ReactComponent as StudioLogo } from '../../assets/studio_logo.svg';
import { ReactComponent as CreateIcon } from '../../assets/navBar/create.svg';
import { Button } from '@mui/material';
import variables from '../../utils/variables';
import ConnectButton from './ConnectButton';
import DotsLoading from '../../components/DotsLoading';
import { config } from '../../config';
import { initializeChain, setDisconnect } from '../../actions/account/wallet';
import { fetchBalance } from '../../actions/account/BCDetails';

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
        let balance = this.props.balance && this.props.balance.length && this.props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
        balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

        return (
            <div className="navbar">
                <div className="left_section">
                    <StudioLogo/>
                </div>
                <div className="right_section">
                    <Button className="create_button">
                        {variables[this.props.lang].create}
                        <CreateIcon/>
                    </Button>
                    <div className="connect_account">
                        {this.props.address === '' && !localStorage.getItem('gon_of_address')
                            ? <ConnectButton/>
                            : <div className="connected_account">
                                {this.props.balanceInProgress || this.props.connectInProgress
                                    ? <DotsLoading/>
                                    : balance
                                        ? <p className="tokens">
                                            {balance} {config.COIN_DENOM}
                                        </p>
                                        : <p className="tokens">
                                            0 {config.COIN_DENOM}
                                        </p>}
                                {this.props.inProgress && this.props.address === ''
                                    ? <DotsLoading/>
                                    : <div className="hash_text">
                                        <p>{this.props.address}</p>
                                        <span>{this.props.address && this.props.address.slice(this.props.address.length - 6, this.props.address.length)}</span>
                                    </div>}
                            </div>}
                    </div>
                </div>
            </div>
        );
    }
}

NavBar.propTypes = {
    address: PropTypes.string.isRequired,
    balance: PropTypes.array.isRequired,
    balanceInProgress: PropTypes.bool.isRequired,
    connectInProgress: PropTypes.bool.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    initializeChain: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    setDisconnect: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        balance: state.account.bc.balance.value,
        balanceInProgress: state.account.bc.balance.inProgress,
        connectInProgress: state.account.connect,
        inProgress: state.account.wallet.connection.inProgress,
        lang: state.language,
    };
};

const actionToProps = {
    fetchBalance,
    initializeChain,
    setDisconnect,
};

export default connect(stateToProps, actionToProps)(NavBar);
