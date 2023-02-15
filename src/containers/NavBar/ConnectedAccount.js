import DotsLoading from '../../components/DotsLoading';
import { config } from '../../config';
import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Popover } from '@mui/material';
import variables from '../../utils/variables';
import { setDisconnect } from '../../actions/account/wallet';

const ConnectedAccount = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const setDisconnect = () => {
        setAnchorEl(null);
        props.setDisconnect();
        localStorage.removeItem('gon_of_address');
    };

    let balance = props.balance && props.balance.length && props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
    balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <>
            <Button aria-describedby={id} className="connected_account" onClick={handleClick}>
                {props.balanceInProgress || props.connectInProgress
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
            </Button>
            <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                className="profile_popover"
                id={id}
                open={open}
                onClose={handleClose}
            >
                <div className="profile_actions">
                    <Button onClick={setDisconnect}>
                        <span>{variables[props.lang].disconnect}</span>
                    </Button>
                </div>
            </Popover>
        </>
    );
};

ConnectedAccount.propTypes = {
    address: PropTypes.string.isRequired,
    balance: PropTypes.array.isRequired,
    balanceInProgress: PropTypes.bool.isRequired,
    connectInProgress: PropTypes.bool.isRequired,
    inProgress: PropTypes.bool.isRequired,
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

const actionsToProps = {
    setDisconnect,
};

export default connect(stateToProps, actionsToProps)(ConnectedAccount);
