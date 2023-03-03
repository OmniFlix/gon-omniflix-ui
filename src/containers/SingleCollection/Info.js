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
import { list } from '../../utils/defaultOptions';
import { setChainValue } from '../../actions/dashboard';
import withRouter from '../../components/WithRouter';
import { setRpcClient } from '../../actions/query';
import { fetchCollectionNFTS, setCollectionClear } from '../../actions/collection';

const Info = (props) => {
    const handleExport = (chain, hash, denom) => {
        if (chain === 'stargaze') {
            return;
        }

        props.setChainValue(chain);
        props.router.navigate(hash);
        props.setCollectionClear();
        if (props.rpcClient && props.rpcClient[chain]) {
            props.fetchCollectionNFTS(props.rpcClient, chain, `ibc/${denom}`);
        } else {
            props.setRpcClient(chain, (client) => {
                if (client) {
                    const obj = {};
                    obj[chain] = client;
                    props.fetchCollectionNFTS(obj, chain, `ibc/${denom}`);
                }
            });
        }
    };

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
                            <img alt="export" src={exportIcon}/>
                        </Button>}
                    {props.hashValue && props.hashResult && props.hashResult.baseClassId &&
                        <Button className="export_button" onClick={() => props.handleExport(props.hashResult)}>
                            <img alt="export" src={exportIcon}/>
                        </Button>}
                </div>
                <div className="row3">
                    {(props.collection && props.collection.denom && props.collection.denom.description) ||
                        (data && ibcDescription(data))}
                </div>
                <div className="redirect_content">
                    {list.map((value) => {
                        if (value && value.value && props.collectionHash &&
                            props.collectionHash[value.value]) {
                            const hash = `/${value.value}/collection/ibc_${props.collectionHash[value.value]}`;
                            return (
                                <div key={value.value} className="section">
                                    <img alt="logo" src={value.icon}/>
                                    {value.name}
                                    <Button
                                        className="export_button"
                                        onClick={() => handleExport(value.value, hash, props.collectionHash[value.value])}>
                                        <img alt="export" src={exportIcon}/>
                                    </Button>
                                </div>
                            );
                        }

                        return null;
                    })}
                    {/* <div className="section"> */}
                    {/*     {props.chainValue === 'iris' */}
                    {/*         ? <img alt="logo" src={irisIcon}/> */}
                    {/*         : props.chainValue === 'stargaze' */}
                    {/*             ? <img alt="logo" src={stargazeIcon}/> */}
                    {/*             : props.chainValue === 'uptick' */}
                    {/*                 ? <img alt="logo" src={uptickIcon}/> */}
                    {/*                 : props.chainValue === 'osmosis' */}
                    {/*                     ? <img alt="logo" src={osmoIcon}/> */}
                    {/*                     : props.chainValue === 'juno' */}
                    {/*                         ? <img alt="logo" src={junoIcon}/> */}
                    {/*                         : props.chainValue === 'omniflix' */}
                    {/*                             ? <img alt="logo" src={flixIcon}/> */}
                    {/*                             : null} */}
                    {/*     <Button className="export_button" onClick={() => props.handleExport(props.hashResult)}> */}
                    {/*         <img alt="export" src={exportIcon}/> */}
                    {/*     </Button> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

Info.propTypes = {
    address: PropTypes.string.isRequired,
    chainValue: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    collectionHash: PropTypes.object.isRequired,
    collectionHashInProgress: PropTypes.bool.isRequired,
    fetchCollectionNFTS: PropTypes.func.isRequired,
    handleExport: PropTypes.func.isRequired,
    hashResult: PropTypes.object.isRequired,
    hashValue: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
    rpcClient: PropTypes.any.isRequired,
    rpcClientInProgress: PropTypes.bool.isRequired,
    setChainValue: PropTypes.func.isRequired,
    setCollectionClear: PropTypes.func.isRequired,
    setRpcClient: PropTypes.func.isRequired,
    traceResult: PropTypes.object.isRequired,
    traceValue: PropTypes.bool.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        collection: state.collection.collection.value,
        collectionHash: state.collection.collectionHash.value,
        collectionHashInProgress: state.collection.collectionHash.inProgress,
        lang: state.language,
        chainValue: state.dashboard.chainValue.value,

        traceValue: state.collection.redirectTrace.trace,
        traceResult: state.collection.redirectTrace.result,
        rpcClient: state.query.rpcClient.value,
        rpcClientInProgress: state.query.rpcClient.inProgress,
    };
};

const actionToProps = {
    fetchCollectionNFTS,
    setCollectionClear,
    setChainValue,
    setRpcClient,
};

export default withRouter(connect(stateToProps, actionToProps)(Info));
