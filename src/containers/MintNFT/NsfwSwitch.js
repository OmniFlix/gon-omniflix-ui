import React from 'react';
import Switch from '@mui/material/Switch';
import * as PropTypes from 'prop-types';
import { setNsfwStatus } from '../../actions/mintNFT';
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

const NsfwSwitch = (props) => {
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
            name="nsfwStatus"
            onChange={handleChange}/>
    );
};

NsfwSwitch.propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.mintNFT.nsfwStatus,
    };
};

const actionsToProps = {
    onChange: setNsfwStatus,
};

export default connect(stateToProps, actionsToProps)(NsfwSwitch);
