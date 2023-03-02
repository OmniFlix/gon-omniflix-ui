import React from 'react';
import './index.css';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSchemaValues } from '../../../actions/collections';
import TextField from '../../../components/TextField';
import variables from '../../../utils/variables';

const SchemaProperties = (props) => {
    const handleChange = (value, type) => {
        const obj = {
            ...props.schemaValues,
            [type]: value,
        };
        props.onChange(obj, true);
    };

    let schema = {};
    if (props.schema) {
        try {
            schema = JSON.parse(props.schema);
        } catch (e) {
            schema = {};
        }
    }
    return (
        <div className="schema_properties">
            {schema && schema.properties &&
                Object.keys(schema.properties).map((key) => {
                    const type = schema.properties[key].type;
                    let multiline = false;
                    if (type === 'textarea') {
                        multiline = true;
                    }

                    return (
                        <div key={key} className="row">
                            <div className="label_info">
                                <p className="title">{key}</p>
                                {schema.properties[key] && schema.properties[key].type === 'array' &&
                                    <p className="sub_title">use comma separated list for array type</p>}
                            </div>
                            <TextField
                                className={multiline ? 'text_area' : ''}
                                error={!props.valid && !props.schemaValues[key]}
                                errorText={!props.valid && !props.schemaValues[key]
                                    ? variables[props.lang].invalid + ' ' + key : ''}
                                id={key}
                                multiline={multiline}
                                name={key}
                                placeholder={'Enter ' + key}
                                type={type}
                                value={props.schemaValues[key]}
                                onChange={(value) => handleChange(value, key)}/>
                        </div>
                    );
                })}
        </div>
    );
};

SchemaProperties.propTypes = {
    lang: PropTypes.string.isRequired,
    schemaValues: PropTypes.object.isRequired,
    valid: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    schema: PropTypes.object,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        schemaValues: state.mintNFT.schemaValues.value,
        valid: state.mintNFT.schemaValues.valid,
    };
};

const actionToProps = {
    onChange: setSchemaValues,
};

export default connect(stateToProps, actionToProps)(SchemaProperties);
