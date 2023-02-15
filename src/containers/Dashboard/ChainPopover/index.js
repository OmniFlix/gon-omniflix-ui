import * as React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import './index.css';
import { setChainValue } from '../../../actions/dashboard';
import { list } from '../../../utils/defaultOptions';
import { Button } from '@mui/material';

const ChainPopover = (props) => {
    const handleChange = (value) => {
        props.setChainValue(value);
    };

    return (
        <div className="chain_popover">
            {list.map((item, index) => (
                <Button
                    key={index}
                    className={props.chain === item.name ? 'active_item list_item' : 'list_item'}
                    onClick={() => handleChange(item.name)}>
                    <img alt={item.icon} src={item.icon}/>
                    {item.name}
                </Button>))}
        </div>
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
        chain: state.dashboard.chainValue.value,
    };
};

const actionsToProps = {
    setChainValue,
};

export default connect(stateToProps, actionsToProps)(ChainPopover);
