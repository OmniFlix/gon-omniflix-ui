import React from 'react';
import { Button } from '@mui/material';
import variables from '../../utils/variables';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { aminoSignTx, initializeChain } from '../../actions/account/wallet';
import withRouter from '../../components/WithRouter';
import { connectBCAccount, setAccountInProgress, verifyAccount } from '../../actions/account';
import { config } from '../../config';
import { fetchBalance } from '../../actions/account/BCDetails';

const ConnectButton = (props) => {
    const handleClick = () => {
        props.initializeChain((address) => {
            if (address.length && address[0] && address[0].address) {
                const data = {
                    bcAccountAddress: address[0].address,
                };
                props.connectBCAccount(data, (res) => {
                    if (res) {
                        if (window.keplr) {
                            window.keplr.defaultOptions = {
                                sign: {
                                    preferNoSetFee: true,
                                    preferNoSetMemo: true,
                                },
                            };
                        }

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
                            preferNoSetFee: true,
                            memo: res['auth_code'],
                        };

                        props.setAccountInProgress(true);
                        props.aminoSignTx(tx, address[0].address, (result) => {
                            if (result) {
                                props.setAccountInProgress(false);
                                const data = {
                                    authCode: res['auth_code'],
                                    sign: result.signature,
                                };

                                props.verifyAccount(res._id, data, (error) => {
                                    if (!error) {
                                        localStorage.setItem('gon_of_address', address[0].address);
                                        props.fetchBalance(address[0].address);
                                        if (window.keplr) {
                                            window.keplr.defaultOptions = {};
                                        }
                                    }
                                });
                            }
                            props.setAccountInProgress(false);
                        });
                    }
                });
            }
        });
    };

    return (
        <Button className="connect_button" onClick={handleClick}>
            {variables[props.lang].connect}
        </Button>
    );
};

ConnectButton.propTypes = {
    address: PropTypes.string.isRequired,
    aminoSignTx: PropTypes.func.isRequired,
    connectBCAccount: PropTypes.func.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    initializeChain: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    setAccountInProgress: PropTypes.func.isRequired,
    verifyAccount: PropTypes.func.isRequired,
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
    connectBCAccount,
    fetchBalance,
    initializeChain,
    setAccountInProgress,
    verifyAccount,
};

export default withRouter(connect(stateToProps, actionToProps)(ConnectButton));
