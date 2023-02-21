import * as PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TextField from '../../components/TextField';
import variables from '../../utils/variables';
import SelectField from '../../components/SelectField';
import { Button, InputAdornment } from '@mui/material';
import { customSchema, noSchema } from '../../utils/defaultOptions';
import AddSchemaProperties from './AddSchemaProperties';
import CopyButton from '../../components/CopyButton';
import { fetchSchema, setCollectionJsonSchema, setJsonTabSwitch, setSchema } from '../../actions/collections';

const JsonSchemaTextField = (props) => {
    const {
        fetchSchema,
    } = props;
    useEffect(() => {
        fetchSchema();
    }, [fetchSchema]);

    const handleChange = (value) => {
        props.onChange(value, true);
    };

    const handleJson = (value) => {
        props.setSchema(value);
        if (value.schema) {
            props.onChange(JSON.stringify(value.schema, undefined, 4), true);
        }
    };

    const handleTabSwitch = (value) => {
        props.setJsonTabSwitch(value);
    };

    const options = [...props.schemas, customSchema, noSchema];

    return (
        <>
            <div className="label_info upload_schema">
                <div className="label_info">
                    <p className="title">{variables[props.lang]['json_schema_properties']}</p>
                    <p className="title_info">{variables[props.lang]['json_schema_properties_info']}</p>
                </div>
                <div className="upload_avatar field_width">
                    <SelectField
                        id="json-schema"
                        name={variables[props.lang]['json_schema']}
                        options={options}
                        placeholder={variables[props.lang]['json_schema']}
                        value={props.schema}
                        onChange={handleJson}/>
                    <div className="tab_switch">
                        <Button
                            className={props.tabSwitch === 'visual' ? 'active' : ''}
                            onClick={() => handleTabSwitch('visual')}>
                            {variables[props.lang].visual}
                        </Button>
                        <Button
                            className={props.tabSwitch === 'code' ? 'active' : ''}
                            onClick={() => handleTabSwitch('code')}>
                            {variables[props.lang].code}
                        </Button>
                    </div>
                </div>
            </div>
            {props.tabSwitch === 'code'
                ? <TextField
                    disable
                    multiline
                    className="text_area copy_schema"
                    error={!props.valid}
                    errorText={!props.valid ? variables[props.lang]['description_error'] : ''}
                    id="json-schema"
                    inputProps={{
                        endAdornment: (
                            <InputAdornment
                                position="end">
                                <CopyButton data={props.value}/>
                            </InputAdornment>
                        ),
                    }}
                    maxRows={5}
                    name="jsonSchema"
                    placeholder={variables[props.lang]['collection_json_schema']}
                    value={props.value}
                    onChange={handleChange}/>
                : props.tabSwitch === 'visual'
                    ? <AddSchemaProperties/> : null}
        </>
    );
};

JsonSchemaTextField.propTypes = {
    fetchSchema: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    schemas: PropTypes.array.isRequired,
    schemasInProgress: PropTypes.bool.isRequired,
    setJsonTabSwitch: PropTypes.func.isRequired,
    setSchema: PropTypes.func.isRequired,
    tabSwitch: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    schema: PropTypes.object,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        valid: state.collections.createCollection.jsonValid,
        value: state.collections.createCollection.jsonSchema,
        tabSwitch: state.collections.tabSwitch,
        schema: state.collections.schemas.value,
        schemas: state.collections.schemas.list,
        schemasInProgress: state.collections.schemas.inProgress,
    };
};

const actionsToProps = {
    onChange: setCollectionJsonSchema,
    fetchSchema,
    setSchema,
    setJsonTabSwitch,
};

export default connect(stateToProps, actionsToProps)(JsonSchemaTextField);
