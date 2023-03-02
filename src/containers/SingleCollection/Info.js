import React from 'react';
import './index.css';
import variables from '../../utils/variables';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import ImageOnLoad from '../../components/ImageOnLoad';
import { ibcDescription, ibcName, ibcPreview, ibcSymbol } from '../../utils/ibcData';
import { mediaReference } from '../../utils/ipfs';
import exportIcon from '../../assets/export.png';
import { Button } from '@mui/material';

const Info = (props) => {
    let data = props.collection && props.collection.denom && props.collection.denom.data;
    data = data && JSON.parse(data);
    const id = props.collection && props.collection.denom && props.collection.denom.id &&
        props.collection.denom.id.split('ibc/');

    return (
        <div className="collection_section">
            <div className="section1">
                <ImageOnLoad
                    alt="thumb"
                    src={(props.collection && props.collection.denom && props.collection.denom.previewUri &&
                            mediaReference(props.collection.denom.previewUri)) ||
                        (props.collection && props.collection.denom && props.collection.denom.uri &&
                            mediaReference(props.collection.denom.uri)) ||
                        (props.collection && props.collection.denom && props.collection.denom.uriHash &&
                            mediaReference(props.collection.denom.uriHash)) ||
                        (data && ibcPreview(data))}/>
            </div>
            <div className="section2">
                <div className="row1">
                    <p>{(props.collection && props.collection.denom && props.collection.denom.name) ||
                        (props.collection && props.collection.denom && props.collection.denom.symbol) ||
                        (data && ibcName(data)) || (data && ibcSymbol(data))}</p>
                    <div className="row2">
                        <span>{variables[props.lang]['created_by']}</span>
                        <div className="hash_text">
                            <p>{props.collection && props.collection.denom && props.collection.denom.creator}</p>
                            <span>{props.collection && props.collection.denom && props.collection.denom.creator &&
                                props.collection.denom.creator.slice(props.collection.denom.creator.length - 6, props.collection.denom.creator.length)}</span>
                        </div>
                    </div>
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
                        <img alt="export" src={exportIcon} />
                    </Button>}
                </div>
                <div className="row3">
                    {(props.collection && props.collection.denom && props.collection.denom.description) ||
                        (data && ibcDescription(data))}
                </div>
            </div>
        </div>
    );
};

Info.propTypes = {
    address: PropTypes.string.isRequired,
    chainValue: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    handleExport: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    traceResult: PropTypes.object.isRequired,
    traceValue: PropTypes.bool.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        collection: state.collection.collection.value,
        lang: state.language,
        chainValue: state.dashboard.chainValue.value,
        traceValue: state.collection.redirectTrace.trace,
        traceResult: state.collection.redirectTrace.result,
    };
};

export default connect(stateToProps)(Info);
