import * as React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import './index.css';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CosmosIcon from '../../../assets/chains/cosmos.svg';
import IrisIcon from '../../../assets/chains/iris.svg';
import OmniIcon from '../../../assets/chains/omniflix.svg';
import StargazeIcon from '../../../assets/chains/stargaze.svg';
import JunoIcon from '../../../assets/chains/juno.svg';
import OsmoIcon from '../../../assets/chains/osmo.svg';
import { setChainValue } from '../../../actions/home';

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

    const list = [{
        icon: CosmosIcon,
        name: 'Cosmos',
    }, {
        icon: IrisIcon,
        name: 'IrisNet',
    }, {
        icon: OmniIcon,
        name: 'OmniFlix Hub',
    }, {
        icon: StargazeIcon,
        name: 'Stargaze',
    }, {
        icon: JunoIcon,
        name: 'Juno',
    }, {
        icon: OsmoIcon,
        name: 'Osmosis',
    }];

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
