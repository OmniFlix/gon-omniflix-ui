import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { list } from '../../../utils/defaultOptions';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setChainID } from '../../../actions/collection';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            background: '#292935',
            borderRadius: '10px',
        },
    },
};

const ChainSelectField = (props) => {
    const handleChange = (event) => {
        props.onChange(event.target.value);
    };

    return (
        <FormControl>
            <Select
                MenuProps={MenuProps}
                className="chains_field"
                defaultValue={true}
                input={<OutlinedInput/>}
                value={props.value}
                onChange={handleChange}>
                {list.map((item) => (
                    <MenuItem
                        key={item.value}
                        className="chains_menu_item"
                        value={item.value}>
                        <img alt={item.value} src={item.icon}/>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

ChainSelectField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.collection.chainID,
    };
};

const actionsToProps = {
    onChange: setChainID,
};

export default connect(stateToProps, actionsToProps)(ChainSelectField);
