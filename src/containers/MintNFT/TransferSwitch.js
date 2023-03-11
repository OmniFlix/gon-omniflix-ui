import React from 'react';
import Switch from '@mui/material/Switch';
import * as PropTypes from 'prop-types';
import { setTransferStatus } from '../../actions/mintNFT';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root: {
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#fb9825',
            '& + .MuiSwitch-track': {
                background: 'linear-gradient(123.89deg, #FAC01E 8.56%, #FC762A 86.47%)',
            },
        },
    },
    switchBase: {
        color: '#696969',
    },
    track: {
        background: '#555555',
    },
}));

const TransferSwitch = (props) => {
    const handleChange = (event) => {
        props.onChange(event.target.checked);
    };

    return (
        <Switch
            checked={props.value}
            className="switch"
            classes={{
                root: useStyles().root,
                switchBase: useStyles().switchBase,
                track: useStyles().track,
            }}
            name="transferStatus"
            onChange={handleChange}/>
    );
};

TransferSwitch.propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.mintNFT.transferStatus,
    };
};

const actionsToProps = {
    onChange: setTransferStatus,
};

export default connect(stateToProps, actionsToProps)(TransferSwitch);
