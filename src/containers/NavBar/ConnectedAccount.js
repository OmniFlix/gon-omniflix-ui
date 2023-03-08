import DotsLoading from '../../components/DotsLoading';
import { config } from '../../config';
import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDisconnect } from '../../actions/account/wallet';
import Popover from '@mui/material/Popover';
import AccountPopover from './AccountPopover';

const ConnectedAccount = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    let balance = props.balance && props.balance.length && props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
    balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

    return (
        <>
            <div className="connected_account">
                <div aria-describedby={id} onClick={handleClick}>
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
            </div>
            <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                className="my_account_popover"
                id={id}
                open={open}
                onClose={handleClose}>
                <AccountPopover/>
            </Popover>
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
