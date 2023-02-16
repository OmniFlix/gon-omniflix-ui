import React from 'react';
import { components } from 'react-select';
import * as PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './index.css';
import AsyncCreatable from 'react-select/async-creatable/dist/react-select.esm';
import { ReactComponent as Create } from '../../assets/sideBar/create.svg';
import { ArrowDropDown } from '@mui/icons-material';

const CreatableSelectField = (props) => {
    const handleChange = (newValue) => {
        props.onChange(newValue);
    };

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <ArrowDropDown/>
            </components.DropdownIndicator>
        );
    };

    const NoOptionsMessage = (childProps) => {
        return (
            <components.NoOptionsMessage {...childProps}>
                {props.noOption
                    ? props.noOption
                    : 'No Option'}
            </components.NoOptionsMessage>
        );
    };

    const handleCreate = (inputValue) => {
        props.onCreateOption(inputValue);
    };

    const filterSearch = (inputValue) => {
        return props.options.filter((i) => {
            if (i.name) {
                return i.name.toLowerCase().includes(inputValue.toLowerCase());
            } else if (i.symbol) {
                return i.symbol.toLowerCase().includes(inputValue.toLowerCase());
            } else if (i.label) {
                return i.label.toLowerCase().includes(inputValue.toLowerCase());
            } else {
                return i;
            }
        });
    };

    const promiseOptions = (inputValue) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(filterSearch(inputValue));
            }, 100);
        });

    return (
        <div className="select_field_parent">
            <AsyncCreatable
                autoFocus={!!props.autoFocus}
                className={ClassNames('text_field select_field', props.className ? props.className : '')}
                classNamePrefix="select"
                components={{
                    DropdownIndicator,
                    NoOptionsMessage,
                }}
                defaultOptions={props.options}
                formatCreateLabel={(inputValue) => <div className="create_div">
                    {`Create : ${inputValue}`}
                    <Create className="add_icon"/>
                </div>}
                getNewOptionData={(inputValue, optionLabel) => ({
                    id: inputValue,
                    name: optionLabel,
                })}
                getOptionLabel={(option) => {
                    return (
                        <div className="label">
                            {option.image ? option.image : null}
                            {option.name || option.symbol || option.label}
                        </div>
                    );
                }}
                getOptionValue={(option) => option._id || option.id}
                id={props.id}
                isClearable={!!props.isClearable}
                isDisabled={!!props.isDisabled}
                isLoading={!!props.isLoading}
                isRtl={!!props.isRtl}
                isSearchable={true}
                loadOptions={promiseOptions}
                name={props.name}
                options={props.options}
                placeholder={props.placeholder ? props.placeholder : ''}
                value={props.value}
                onChange={handleChange}
                onCreateOption={props.onCreateOption ? handleCreate : null}
                onMenuScrollToBottom={props.handleFetch}/>
            {props.error
                ? <span className="error">
                    {props.errorText}
                </span>
                : null}
        </div>
    );
};

CreatableSelectField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    error: PropTypes.bool,
    errorText: PropTypes.string,
    handleFetch: PropTypes.func,
    isClearable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    isRtl: PropTypes.bool,
    noOption: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onCreateOption: PropTypes.func,
};

export default CreatableSelectField;
