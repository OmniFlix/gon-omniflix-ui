import * as React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import './index.css';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setChainValue } from '../../../actions/home';
import { list } from '../../../utils/defaultOptions';

const MenuProps = {
    PaperProps: {
        style: {
            width: 170,
            background: '#292935',
            borderRadius: '10px',
            padding: '10px',
        },
    },
};

const ChainPopover = (props) => {
    const handleChange = (event) => {
        props.setChainValue(event.target.value);
    };

    return (
        <Box className="chain_popover" sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <Select
                    MenuProps={MenuProps}
                    className="select_popover"
                    id="demo-simple-select"
                    value={props.chain}
                    onChange={handleChange}
                >
                    {list.map((item, index) => (
                        <MenuItem key={index} className="list_item" value={item.name}>
                            <img alt={item.icon} src={item.icon} />
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

ChainPopover.propTypes = {
    chain: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    setChainValue: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        chain: state.home.chainValue.value,
    };
};

const actionsToProps = {
    setChainValue,
};

export default connect(stateToProps, actionsToProps)(ChainPopover);
