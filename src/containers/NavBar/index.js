import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as FaucetIcon } from '../../assets/navBar/faucet.svg';
import { Button } from '@mui/material';
import variables from '../../utils/variables';
import ConnectButton from './ConnectButton';
import { initializeChain, initializeChainIBC, setDisconnect } from '../../actions/account/wallet';
import { fetchBalance } from '../../actions/account/BCDetails';
import ConnectedAccount from './ConnectedAccount';
import Tabs from './Tabs';
import CreatePopover from './CreatePopover';
import { fetchFaucetTokens, hideSideBar, showClaimFaucetDialog, showSideBar } from '../../actions/navBar';
import ClaimFaucetDialog from './ClaimFaucetDialog';
import { setEmptyValue } from '../../actions/account';
import { setRpcClient } from '../../actions/query';
import withRouter from '../../components/WithRouter';
import { setChainValue } from '../../actions/dashboard';
import { Close, MenuOutlined } from '@mui/icons-material';
import { ChainsList } from '../../chains';
import { fetchContracts } from '../../actions/cosmwasm';
import { fetchWasmAllCollections } from '../../actions/collections/wasm';
import { fetchCollectionHash } from '../../actions/collection';
import { fetchWasmCollectionHash } from '../../actions/collection/wasm';

class NavBar extends Component {
    constructor (props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    componentDidMount () {
        if (this.props.rpcClient && !this.props.rpcClient.omniflix && !this.props.rpcClientInProgress) {
            const route = this.props.router.location && this.props.router.location.pathname &&
                this.props.router.location.pathname.split('/') && this.props.router.location.pathname.split('/')[1];
            if (route === 'stargaze' || route === 'juno') {
                this.props.setChainValue(route);
                const config = ChainsList && ChainsList[route];
                this.props.fetchContracts(config, route);
            } else if (route === 'iris' || route === 'uptick') {
                this.props.setChainValue(route);
                this.props.setRpcClient(route);
            } else {
                this.props.setRpcClient('omniflix');
            }
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

                Object.keys(ChainsList).map((item, index) => {
                    const config = ChainsList && ChainsList[item] && ChainsList[item];
                    if (item === 'omniflix') {
                        return null;
                    }

                    this.props.initializeChainIBC(config, item, (result) => {
                        const convertedAddress = result && result.length && result[0] && result[0].address;
                        if (config && convertedAddress && (item !== 'omniflix')) {
                            if (this.props.rpcClient && this.props.rpcClient[item]) {
                                this.props.fetchFaucetTokens(this.props.rpcClient[item], item, convertedAddress, config.COIN_MINIMAL_DENOM, config);
                                return;
                            }

                            this.props.setRpcClient(item, (client) => {
                                if (client) {
                                    this.props.fetchFaucetTokens(client, item, convertedAddress, config.COIN_MINIMAL_DENOM, config);
                                    const route = this.props.router && this.props.router.location && this.props.router.location.pathname &&
                                        this.props.router.location.pathname.split('/');
                                    if (route[3] && route[3].includes('ibc_')) {
                                        return null;
                                    }

                                    if (route && route.length && route[1] && route[3]) {
                                        if (item === 'stargaze' || item === 'juno') {
                                            const hash = `wasm.${config.CONTRACT_ADDRESS}/${config.CHANNELS && config.CHANNELS[route[1]] &&
                                            config.CHANNELS[route[1]][0]}/${route[3]}`;
                                            this.props.fetchWasmCollectionHash(config, item, hash);

                                            return null;
                                        }

                                        const hash = `nft-transfer/${config.CHANNELS && config.CHANNELS[route[1]] &&
                                        config.CHANNELS[route[1]][0]}/${route[3]}`;
                                        const obj = {};
                                        obj[item] = client;

                                        this.props.fetchCollectionHash(obj, item, hash);
                                    }
                                }
                            });
                        }
                    });

                    return null;
                });
            }
        });
    }

    handleShow () {
        this.props.showSideBar();

        document.body.style.overflow = 'hidden';
    }

    handleHide () {
        if (this.props.show) {
            this.props.hideSideBar();
            document.body.style.overflow = null;
        }
    }

    render () {
        return (
            <div className="navbar">
                <div className="left_section">
                    <Logo onClick={() => this.props.router.navigate('/about')}/>
                </div>
                <Tabs/>
                <Button className="menu_icon" onClick={this.handleShow}>
                    <MenuOutlined/>
                </Button>
                <div className={this.props.show ? 'show_nav_expansion right_section' : 'right_section'}>
                    {this.props.balanceInProgress
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
                    <Tabs/>
                    <Button className="close_icon" onClick={this.handleHide}>
                        <Close/>
                    </Button>
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
    chainValue: PropTypes.string.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchCollectionHash: PropTypes.func.isRequired,
    fetchContracts: PropTypes.func.isRequired,
    fetchFaucetTokens: PropTypes.func.isRequired,
    fetchWasmAllCollections: PropTypes.func.isRequired,
    fetchWasmCollectionHash: PropTypes.func.isRequired,
    hideSideBar: PropTypes.func.isRequired,
    initializeChain: PropTypes.func.isRequired,
    initializeChainIBC: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    rpcClient: PropTypes.any.isRequired,
    rpcClientInProgress: PropTypes.bool.isRequired,
    setChainValue: PropTypes.func.isRequired,
    setDisconnect: PropTypes.func.isRequired,
    setEmptyValue: PropTypes.func.isRequired,
    setRpcClient: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    showClaimFaucetDialog: PropTypes.func.isRequired,
    showSideBar: PropTypes.func.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
        }).isRequired,
    }),
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        balance: state.account.bc.balance.value,
        balanceInProgress: state.account.bc.balance.inProgress,
        lang: state.language,
        rpcClient: state.query.rpcClient.value,
        rpcClientInProgress: state.query.rpcClient.inProgress,

        show: state.navBar.show,
        chainValue: state.dashboard.chainValue.value,
    };
};

const actionToProps = {
    fetchBalance,
    fetchContracts,
    fetchWasmAllCollections,
    fetchWasmCollectionHash,
    initializeChain,
    initializeChainIBC,
    setChainValue,
    setDisconnect,
    setEmptyValue,
    setRpcClient,
    showClaimFaucetDialog,
    showSideBar,
    hideSideBar,
    fetchFaucetTokens,
    fetchCollectionHash,
};

export default withRouter(connect(stateToProps, actionToProps)(NavBar));
