import { Chip, makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import ClassNames from 'classnames';
import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const useStyles = makeStyles(() => ({
    root: {
        '& .MuiFilledInput-underline:after': {
            border: 'unset',
        },
        '& .MuiFilledInput-underline:before': {
            border: 'unset',
        },
        '& .MuiFilledInput-input': {
            padding: '12px 20px',
        },
        '& .MuiFilledInput-root': {
            background: 'unset',
            color: '#696969',
            padding: 'unset',
        },
        '& .MuiFormHelperText-root': {
            '&.Mui-error': {
                width: '100%',
                margin: '-6px 0',
            },
        },
        ':-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px white inset',
            backgroundColor: 'red !important',
        },
    },
    paper: {
        margin: 'unset',
        background: 'unset',
        boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
    },
    listbox: {
        padding: 'unset',
    },
}));

const AutoCompleteTextField = (props) => {
    return (
        <Autocomplete
            multiple
            className={ClassNames(useStyles().root, 'auto_complete ' + (props.className
                ? props.className : ''))}
            classes={{
                paper: useStyles().paper,
                listbox: useStyles().listbox,
            }}
            disableClearable={!!props.disableClearable}
            freeSolo={!!props.freeSolo}
            getOptionLabel={(option) => option}
            id={props.id}
            options={props.options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.label ? props.label : null}
                    placeholder={props.placeholder ? props.placeholder : ''}
                    variant="filled"/>
            )}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        key={index}
                        className="chips_input"
                        label={option}
                        variant="outlined"
                        {...getTagProps({ index })} />
                ))
            }
            value={props.value}
            onChange={(event, newValue) =>
                props.onChange(newValue)
            }
            onInputChange={(event, newValue) =>
                props.handleInput(newValue)
            }/>
    );
};

AutoCompleteTextField.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    InputLabelProps: PropTypes.bool,
    className: PropTypes.string,
    disableClearable: PropTypes.bool,
    freeSolo: PropTypes.bool,
    handleInput: PropTypes.func,
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
};

export default AutoCompleteTextField;
