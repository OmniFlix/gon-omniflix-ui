import React from 'react';
import { Button } from '@mui/material';
import variables from '../../utils/variables';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { aminoSignTx, initializeChain } from '../../actions/account/wallet';
import withRouter from '../../components/WithRouter';
import { fetchBalance } from '../../actions/account/BCDetails';
import { setTabValue } from '../../actions/dashboard';

const ConnectButton = (props) => {
    const handleClick = () => {
        props.initializeChain((address) => {
            if (address.length && address[0] && address[0].address) {
                localStorage.setItem('gon_of_address', address[0].address);
                props.fetchBalance(address[0].address);
                props.router.navigate('/dashboard');
                props.setTabValue('my_collections');
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
    fetchBalance: PropTypes.func.isRequired,
    initializeChain: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    setTabValue: PropTypes.func.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }),
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        lang: state.language,
    };
};

const actionToProps = {
    aminoSignTx,
    fetchBalance,
    initializeChain,
    setTabValue,
};

export default withRouter(connect(stateToProps, actionToProps)(ConnectButton));
