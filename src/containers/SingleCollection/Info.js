import React from 'react';
import './index.css';
import variables from '../../utils/variables';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import ImageOnLoad from '../../components/ImageOnLoad';
import { ibcDescription, ibcName, ibcPreview, ibcSymbol } from '../../utils/ibcData';
import { mediaReference } from '../../utils/ipfs';

const Info = (props) => {
    let data = props.collection && props.collection.denom && props.collection.denom.data;
    data = data && JSON.parse(data);

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
    collection: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        collection: state.collection.collection.value,
        lang: state.language,
    };
};

export default connect(stateToProps)(Info);
