import DotsLoading from '../../components/DotsLoading';
import { config } from '../../config';
import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { setDisconnect } from '../../actions/account/wallet';
import DisconnectIcon from '../../assets/disconnect.svg';

const ConnectedAccount = (props) => {
    const setDisconnect = () => {
        props.setDisconnect();
        localStorage.removeItem('gon_of_address');
    };

    let balance = props.balance && props.balance.length && props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
    balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

    return (
        <>
            <div className="connected_account">
                <div>
                    {props.balanceInProgress
                        ? <DotsLoading/>
                        : balance
                            ? <p className="tokens">
                                {balance} {config.COIN_DENOM}
                            </p>
                            : <p className="tokens">
                                0 {config.COIN_DENOM}
                            </p>}
                    {props.inProgress && props.address === ''
                        ? <DotsLoading/>
                        : <div className="hash_text">
                            <p>{props.address}</p>
                            <span>
                                {props.address && props.address.slice(props.address.length - 6, props.address.length)}
                            </span>
                        </div>}
                </div>
                <Button className="disconnect_button" title="Disconnect" onClick={setDisconnect}>
                    <img alt="disconnect" src={DisconnectIcon}/>
                </Button>
            </div>
        </>
    );
};

ConnectedAccount.propTypes = {
    address: PropTypes.string.isRequired,
    balance: PropTypes.array.isRequired,
    balanceInProgress: PropTypes.bool.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    setDisconnect: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        balance: state.account.bc.balance.value,
        balanceInProgress: state.account.bc.balance.inProgress,
        inProgress: state.account.wallet.connection.inProgress,
        lang: state.language,
    };
};

const actionsToProps = {
    setDisconnect,
};

export default connect(stateToProps, actionsToProps)(ConnectedAccount);
