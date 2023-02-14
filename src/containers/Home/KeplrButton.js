import React from 'react';
import { Button } from '@mui/material';
import logo from '../../assets/keplr.png';
import variables from '../../utils/variables';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { aminoSignTx, initializeChain } from '../../actions/account/wallet';
import withRouter from '../../components/WithRouter';
import { config } from '../../config';

const KeplrButton = (props) => {
    const initKeplr = () => {
        props.initializeChain((address) => {
            if (address.length && address[0] && address[0].address) {
                const tx = {
                    msg: {
                        type: 'omniflix/MsgSign',
                        value: {
                            address: address[0].address,
                        },
                    },
                    fee: {
                        amount: [{
                            amount: String(0),
                            denom: config.COIN_MINIMAL_DENOM,
                        }],
                        gas: String(1),
                    },
                    memo: '',
                };

                props.aminoSignTx(tx, address[0].address, (result) => {
                    if (result) {
                        props.router.navigate('/home');
                    }
                });
            }
        });
    };

    return (
        <div className="keplr_button">
            {props.address
                ? props.address
                : <Button variant="contained" onClick={initKeplr}>
                    <img alt="keplr" src={logo}/>
                    {variables[props.lang]['connect_keplr']}
                </Button>}
        </div>
    );
};

KeplrButton.propTypes = {
    address: PropTypes.string.isRequired,
    aminoSignTx: PropTypes.func.isRequired,
    initializeChain: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
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
    initializeChain,
};

export default withRouter(connect(stateToProps, actionToProps)(KeplrButton));
