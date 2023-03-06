import React from 'react';
import { Button } from '@mui/material';
import variables from '../../utils/variables';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { aminoSignTx, initializeChain, initializeChainIBC } from '../../actions/account/wallet';
import withRouter from '../../components/WithRouter';
import { fetchBalance } from '../../actions/account/BCDetails';
import { setTabValue } from '../../actions/dashboard';
import { ChainsList } from '../../chains';
import { setRpcClient } from '../../actions/query';
import { fetchFaucetTokens } from '../../actions/navBar';

const ConnectButton = (props) => {
    const handleClick = () => {
        props.initializeChain((address) => {
            if (address.length && address[0] && address[0].address) {
                localStorage.setItem('gon_of_address', address[0].address);
                props.fetchBalance(address[0].address);
                props.router.navigate('/' + props.chainValue + '/dashboard');
                if (props.chainValue === 'omniflix') {
                    props.setTabValue('my_collections');
                }

                Object.keys(ChainsList).map((value) => {
                    if (value === 'omniflix') {
                        return null;
                    }

                    if (value && ChainsList[value]) {
                        props.initializeChainIBC(ChainsList[value], value, (result) => {
                            const config = ChainsList[value];
                            if (ChainsList[value] && result.length && result[0] && result[0].address && (value !== 'omniflix')) {
                                if (props.rpcClient && props.rpcClient[value]) {
                                    props.fetchFaucetTokens(props.rpcClient[value], value, result[0].address, config.COIN_MINIMAL_DENOM, config);
                                    return;
                                }

                                props.setRpcClient(value, (client) => {
                                    if (client) {
                                        props.fetchFaucetTokens(client, value, result[0].address, config.COIN_MINIMAL_DENOM, config);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };

    return (
        <Button className="connect_button" onClick={handleClick}>
            {variables[props.lang]['connect_wallet']}
        </Button>
    );
};

ConnectButton.propTypes = {
    address: PropTypes.string.isRequired,
    aminoSignTx: PropTypes.func.isRequired,
    chainValue: PropTypes.string.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchFaucetTokens: PropTypes.func.isRequired,
    initializeChain: PropTypes.func.isRequired,
    initializeChainIBC: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    rpcClient: PropTypes.any.isRequired,
    setRpcClient: PropTypes.func.isRequired,
    setTabValue: PropTypes.func.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }),
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        lang: state.language,
        chainValue: state.dashboard.chainValue.value,
        rpcClient: state.query.rpcClient.value,
    };
};

const actionToProps = {
    aminoSignTx,
    fetchBalance,
    fetchFaucetTokens,
    initializeChain,
    initializeChainIBC,
    setTabValue,
    setRpcClient,
};

export default withRouter(connect(stateToProps, actionToProps)(ConnectButton));
