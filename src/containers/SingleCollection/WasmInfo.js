import React from 'react';
import './index.css';
import variables from '../../utils/variables';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import ImageOnLoad from '../../components/ImageOnLoad';

const WasmInfo = (props) => {
    const id = props.value && props.value.name && props.value.name.split('wasm.stars');
    return (
        <div className="collection_section">
            <div className="section1">
                <ImageOnLoad alt="thumb"/>
            </div>
            <div className="section2">
                <div className="row1">
                    <p>{(props.value && props.value.name) || (props.value && props.value.symbol)}</p>
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
                </div>
            </div>
        </div>
    );
};

WasmInfo.propTypes = {
    address: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        lang: state.language,
    };
};

export default connect(stateToProps)(WasmInfo);
