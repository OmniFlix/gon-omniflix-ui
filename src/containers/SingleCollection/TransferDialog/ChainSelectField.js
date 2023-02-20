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
                input={<OutlinedInput />}
                value={props.value}
                onChange={handleChange}
            >
                <MenuItem disabled value="">
                    <em>Placeholder</em>
                </MenuItem>
                {list.map((item) => (
                    <MenuItem
                        key={item.name}
                        value={item.name}>
                        <img alt={item.name} src={item.icon} />
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