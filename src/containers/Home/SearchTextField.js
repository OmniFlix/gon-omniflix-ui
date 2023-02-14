import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextField from '../../components/TextField';
import variables from '../../utils/variables';
import searchIcon from '../../assets/search.svg';
import { setSearchValue } from '../../actions/home';
import { InputAdornment } from '@mui/material';

const SearchTextField = (props) => {
    const handleChange = (value) => {
        props.onChange(value);
    };

    return (
        <TextField
            id="search"
            inputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <img alt="search" src={searchIcon}/>
                    </InputAdornment>
                ),
            }}
            name="search"
            placeholder={variables[props.lang].search}
            value={props.value}
            onChange={handleChange}/>
    );
};

SearchTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.home.searchValue.value,
    };
};

const actionsToProps = {
    onChange: setSearchValue,
};

export default connect(stateToProps, actionsToProps)(SearchTextField);
