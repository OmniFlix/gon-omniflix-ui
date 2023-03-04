import React from 'react';
import './index.css';
import variables from '../../utils/variables';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import ImageOnLoad from '../../components/ImageOnLoad';
import { Button } from '@mui/material';
import exportIcon from '../../assets/export.png';

const WasmInfo = (props) => {
    const id = props.value && props.value.name && props.value.name.split('wasm.stars');
    const name = props.value && props.value.name && props.value.name.split('/');
    return (
        <div className="collection_section">
            <div className="section1">
                <ImageOnLoad alt="thumb"/>
            </div>
            <div className="section2">
                <div className="row1">
                    {name && <p>{name && name.length && name[name.length - 1]}</p>}
                    {/* <div className="row2"> */}
                    {/*     <span>{variables[props.lang]['created_by']}</span> */}
                    {/*     <div className="hash_text"> */}
                    {/*         <p>{props.collection && props.collection.denom && props.collection.denom.creator}</p> */}
                    {/*         <span>{props.collection && props.collection.denom && props.collection.denom.creator && */}
                    {/*             props.collection.denom.creator.slice(props.collection.denom.creator.length - 6, props.collection.denom.creator.length)}</span> */}
                    {/*     </div> */}
                    {/* </div> */}
                </div>
                <div className="type">
                    {id && id.length > 1
                        ? <div className="chain_type ibc_chain_type">
                            {variables[props.lang].ibc}
                        </div>
                        : <div className="chain_type native_chain_type">
                            {variables[props.lang].native}
                        </div>}
                    {props.traceValue && props.traceResult && props.traceResult.baseClassId &&
                        <Button className="export_button" onClick={() => props.handleExport(props.traceResult)}>
                            <img alt="export" src={exportIcon}/>
                        </Button>}
                </div>
            </div>
        </div>
    );
};

WasmInfo.propTypes = {
    address: PropTypes.string.isRequired,
    handleExport: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    traceResult: PropTypes.object.isRequired,
    traceValue: PropTypes.bool.isRequired,
    value: PropTypes.object.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        lang: state.language,
        traceValue: state.collection.redirectTrace.trace,
        traceResult: state.collection.redirectTrace.result,
    };
};

export default connect(stateToProps)(WasmInfo);
