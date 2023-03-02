import React from 'react';
import Switch from '@mui/material/Switch';
import * as PropTypes from 'prop-types';
import { setExtensibleStatus } from '../../actions/mintNFT';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root: {
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#7745FE',
            '& + .MuiSwitch-track': {
                background: 'linear-gradient(90deg, #D61D6A 0%, #7645FF 100%)',
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

const ExtensibleSwitch = (props) => {
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
            name="extensibleStatus"
            onChange={handleChange}/>
    );
};

ExtensibleSwitch.propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.mintNFT.extensibleStatus,
    };
};

const actionsToProps = {
    onChange: setExtensibleStatus,
};

export default connect(stateToProps, actionsToProps)(ExtensibleSwitch);
