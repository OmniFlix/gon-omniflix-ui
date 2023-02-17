import React from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, IconButton } from '@mui/material';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import variables from '../../../utils/variables';
import TextField from '../../../components/TextField';
import './index.css';
import SelectField from '../../../components/SelectField';
import { schemaPropertyTypes } from '../../../utils/defaultOptions';
import { setCollectionJsonSchema } from '../../../actions/collections';
import { AddCircleRounded } from '@mui/icons-material';

const AddSchemaProperties = (props) => {
    let properties = {};
    if (props.value) {
        try {
            properties = JSON.parse(props.value);
        } catch (e) {
            properties = {};
        }
    }

    const handleAdd = () => {
        const obj = properties;
        obj.properties[''] = { type: '' };
        props.onChange(JSON.stringify(obj, undefined, 4), false);
    };

    const handleInputChange = (value, key) => {
        const obj = properties;
        const newObj = {};
        const type = obj.properties[key] && obj.properties[key].type;

        if (obj.required && obj.required.length &&
            obj.required.indexOf(key) > -1) {
            const index = obj.required.indexOf(key);
            obj.required.splice(index, 1);
            obj.required.push(value);
        }
        Object.keys(obj.properties).map((val) => {
            if (val === key) {
                newObj[value] = { type: type };
            } else {
                newObj[val] = obj.properties[val];
            }

            return null;
        });
        obj.properties = newObj;
        props.onChange(JSON.stringify(obj, undefined, 4), true);
    };

    const handleSelectChange = (value, key) => {
        const obj = properties;
        obj.properties[key] = { type: value.name };
        if (value.name === 'array') {
            obj.properties[key].items = { type: 'string' };
        }
        props.onChange(JSON.stringify(obj, undefined, 4), true);
    };

    const handleRemove = (key) => {
        const obj = properties;
        delete obj.properties[key];
        if (obj.required && obj.required.length &&
            obj.required.indexOf(key) > -1) {
            const index = obj.required.indexOf(key);
            obj.required.splice(index, 1);
        }
        props.onChange(JSON.stringify(obj, undefined, 4), true);
    };

    const handleCheck = (key) => {
        const obj = properties;
        if (obj.required && obj.required.length &&
            obj.required.indexOf(key) > -1) {
            const index = obj.required.indexOf(key);
            obj.required.splice(index, 1);
        } else {
            obj.required.push(key);
        }
        props.onChange(JSON.stringify(obj, undefined, 4), true);
    };

    const disable = (properties && !Object.keys(properties).length) || !properties;

    return (
        <div className="add_schema">
            {properties && properties.properties && Object.keys(properties.properties).length
                ? Object.keys(properties.properties).map((key) => {
                    const type = properties.properties[key] && properties.properties[key].type;
                    const typeValue = type !== '' ? { name: type } : null;
                    const checked = properties.required && properties.required.length &&
                        properties.required.indexOf(key) > -1;

                    return (
                        <div key={key} className="property">
                            <IconButton className="remove_button" onClick={() => handleRemove(key)}>
                                -
                            </IconButton>
                            <TextField
                                autoFocus
                                id={key + 'input'}
                                name={key + 'input'}
                                placeholder={variables[props.lang]['enter_property_name']}
                                value={key}
                                onChange={(value) => handleInputChange(value, key)}/>
                            <SelectField
                                id={key}
                                name={key}
                                options={schemaPropertyTypes}
                                placeholder={variables[props.lang]['select_property_type']}
                                value={typeValue}
                                onChange={(value) => handleSelectChange(value, key)}/>
                            <FormGroup className="check_box">
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={checked && checked > -1} onChange={() => handleCheck(key)}/>
                                    } label={variables[props.lang].required}/>
                            </FormGroup>
                        </div>
                    );
                }) : null}
            {disable
                ? null
                : <Button className="add_property" disabled={disable} onClick={handleAdd}>
                    <AddCircleRounded/>
                    {variables[props.lang]['add_property']}
                </Button>}
        </div>
    );
};

AddSchemaProperties.propTypes = {
    lang: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        valid: state.collections.createCollection.jsonValid,
        value: state.collections.createCollection.jsonSchema,
    };
};

const actionsToProps = {
    onChange: setCollectionJsonSchema,
};

export default connect(stateToProps, actionsToProps)(AddSchemaProperties);
