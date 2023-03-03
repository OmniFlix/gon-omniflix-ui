import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { list } from '../../../utils/defaultOptions';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setChainID, setTransferAddress } from '../../../actions/collection';
import { ChainsList } from '../../../chains';
import { bech32 } from 'bech32';

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
        if (props.chain === event.target.value) {
            props.setTransferAddress('');
            return;
        }

        const prefix = event.target.value && ChainsList[event.target.value] && ChainsList[event.target.value].PREFIX;
        const address = props.address && bech32.decode(props.address);
        const convertedAddress = address && address.words && bech32.encode(prefix, address.words);
        if (convertedAddress) {
            props.setTransferAddress(convertedAddress);
        } else {
            props.setTransferAddress('');
        }
    };

    const updatedList = list && list.filter((val) => val && !val.disabled);

    return (
        <FormControl>
            <Select
                MenuProps={MenuProps}
                className="chains_field"
                defaultValue={true}
                input={<OutlinedInput/>}
                value={props.value}
                onChange={handleChange}>
                {updatedList.map((item) => (
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
    address: PropTypes.string.isRequired,
    chain: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    setTransferAddress: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        chain: state.dashboard.chainValue.value,
        lang: state.language,
        value: state.collection.chainID,
    };
};

const actionsToProps = {
    setTransferAddress,
    onChange: setChainID,
};

export default connect(stateToProps, actionsToProps)(ChainSelectField);
