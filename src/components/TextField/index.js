import { makeStyles, TextField as MaterialTextField } from '@material-ui/core';
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
            background: '#141414',
            color: '#696969',
            border: '2px solid #141414',
            '&.Mui-focused': {
                border: '2px solid',
                borderImageSource: 'linear-gradient(90deg, #D61D6A 0%, #7645FF 100%)',
                borderImageSlice: 1,
            },
        },
        '& .MuiFormHelperText-root': {
            '&.Mui-error': {
                width: '100%',
                position: 'absolute',
                bottom: '-20px',
            },
        },
        ':-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px white inset',
            backgroundColor: 'red !important',
        },
    },
}));

const TextField = (props) => {
    const onChange = (e) => props.onChange(e.target.value);

    return (
        <MaterialTextField
            InputProps={props.inputProps ? props.inputProps : null}
            autoFocus={props.autoFocus ? props.autoFocus : false}
            className={ClassNames(useStyles().root, 'text_field', props.className ? props.className : '')}
            disabled={props.disable}
            error={props.error}
            helperText={props.error
                ? <span className="error">
                    {props.errorText}
                </span>
                : null}
            id={props.id}
            inputRef={props.inputRef ? props.inputRef : null}
            label={props.label ? props.label : null}
            margin="normal"
            maxRows={props.maxRows ? props.maxRows : null}
            minRows={props.multiline ? 5 : null}
            multiline={props.multiline ? props.multiline : false}
            name={props.name}
            placeholder={props.placeholder ? props.placeholder : ''}
            required={props.required ? props.required : false}
            type={props.type ? props.type : 'text'}
            value={props.value}
            variant={props.variant ? props.variant : 'filled'}
            onChange={onChange}/>
    );
};

TextField.propTypes = {
    onChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    disable: PropTypes.bool,
    error: PropTypes.bool,
    errorText: PropTypes.string,
    handleClickShowPassword: PropTypes.func,
    handleCloseSearch: PropTypes.func,
    helperText: PropTypes.any,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    inputRef: PropTypes.object,
    label: PropTypes.string,
    margin: PropTypes.string,
    maxRows: PropTypes.number,
    multiline: PropTypes.bool,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    showPassword: PropTypes.bool,
    type: PropTypes.string,
    valid: PropTypes.bool,
    value: PropTypes.string,
    variant: PropTypes.string,
};

export default TextField;
