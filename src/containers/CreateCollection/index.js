import React, { Component, lazy, Suspense } from 'react';
import './index.css';
import {
    addCollection,
    fetchCollections,
    setCollectionJsonSchema,
    setCollectionName,
    setCollectionSymbol, showCollectionConfirmDialog,
} from '../../actions/collections';
import { fetchTxHash, protoBufSigning, setTxHashInProgressFalse, txSignAndBroadCast } from '../../actions/account/wallet';
import { fetchBalance } from '../../actions/account/BCDetails';
import { showMessage } from '../../actions/snackbar';
import withRouter from '../../components/WithRouter';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import variables from '../../utils/variables';
import CollectionSymbolTextField from './CollectionSymbolTextField';
import CollectionNameTextField from './CollectionNameTextField';
import DescriptionTextField from './DescriptionTextField';
import CollectionImageUrlTextField from './CollectionImageUrlTextField';
import Upload from './Upload';
import JsonSchemaTextField from './JsonSchemaTextField';
import { Button } from '@mui/material';
import CircularProgress from '../../components/CircularProgress';
import CollectionConfirmDialog from './CollectionConfirmDialog';

const CreateCollection = (props) => {
    const handleClick = () => {
        props.showCollectionConfirmDialog();
    };

    const inProgress = props.inProgress || props.signInProgress || props.broadCastInProgress || props.txHashInProgress;
    const disable = props.symbol === '' || props.value === '' || inProgress;
    const updateDisable = disable || (props.collection &&
        (props.value === props.collection.name &&
            (!props.collection.description ? props.description === '' : props.description === props.collection.description) &&
            (!props.collection.preview_uri ? props.imageUrl === '' : props.imageUrl === props.collection.preview_uri)));

    return (
        <div className="create_collection scroll_bar">
            <div className="header">
                {props.match && props.match.params && props.match.params.collectionID
                    ? <h2>{variables[props.lang]['update_collection']}</h2>
                    : <h2>{variables[props.lang]['create_collection']}</h2>}
            </div>
            <Suspense fallback={<CircularProgress/>}>
                <div className="collection_content">
                    <form
                        noValidate
                        autoComplete="off">
                        {props.match && props.match.params && props.match.params.collectionID
                            ? null
                            : <div className="row">
                                <div className="label_info">
                                    <p className="title">
                                        {(variables[props.lang]['collection_symbol']).toLowerCase()}
                                        <span className="text_required">*</span>
                                    </p>
                                    <p className="title_info">{variables[props.lang]['collection_symbol_info']}</p>
                                </div>
                                <CollectionSymbolTextField/>
                            </div>}
                        <div className="row">
                            <div className="label_info">
                                <p className="title">
                                    {(variables[props.lang]['collection_name']).toLowerCase()}
                                    <span className="text_required">*</span>
                                </p>
                                <p className="title_info">{variables[props.lang]['collection_name_info']}</p>
                            </div>
                            <CollectionNameTextField/>
                        </div>
                        <div className="row row_reverse description_section">
                            <div className="label_info">
                                <p className="title">
                                    {variables[props.lang]['collection_description']}
                                    <span className="text_next">{variables[props.lang]['max_characters']}</span>
                                </p>
                            </div>
                            <DescriptionTextField/>
                            <p className="description_characters">
                                {props.description && props.description.length > 0 ? props.description.length : 0} / 240
                            </p>
                        </div>
                        <div className="row al_flx_start">
                            <div className="label_info">
                                <p className="title">{variables[props.lang]['collection_avatar']}</p>
                                <p className="title_info">{variables[props.lang]['collection_avatar_info']}</p>
                            </div>
                            <div className="upload_avatar">
                                <CollectionImageUrlTextField/>
                                <Upload/>
                            </div>
                        </div>
                        {props.match && props.match.params && props.match.params.collectionID
                            ? null
                            : <div className="row row_reverse">
                                <JsonSchemaTextField/>
                            </div>}
                        {props.match && props.match.params && props.match.params.collectionID
                            ? <Button
                                className="primary_button"
                                disabled={updateDisable}
                                variant="contained"
                                onClick={handleClick}>
                                {variables[props.lang]['update_collection']}
                            </Button>
                            : <Button
                                className="primary_button"
                                disabled={disable}
                                variant="contained"
                                onClick={handleClick}>
                                {variables[props.lang]['mint_collection']}
                            </Button>}
                    </form>
                    {inProgress && <CircularProgress className="full_screen"/>}
                    <CollectionConfirmDialog/>
                </div>
            </Suspense>
        </div>

    );
};

CreateCollection.propTypes = {
    addCollection: PropTypes.func.isRequired,
    address: PropTypes.string.isRequired,
    allowances: PropTypes.array.isRequired,
    balance: PropTypes.array.isRequired,
    broadCastInProgress: PropTypes.bool.isRequired,
    collection: PropTypes.object.isRequired,
    fetch: PropTypes.func.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    fetchTxHash: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    setCollectionJsonSchema: PropTypes.func.isRequired,
    setCollectionSymbol: PropTypes.func.isRequired,
    setTxHashInProgressFalse: PropTypes.func.isRequired,
    showCollectionConfirmDialog: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    sign: PropTypes.func.isRequired,
    signInProgress: PropTypes.bool.isRequired,
    symbol: PropTypes.string.isRequired,
    txHashInProgress: PropTypes.bool.isRequired,
    txSignAndBroadCast: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    description: PropTypes.string,
    imageUrl: PropTypes.any,
    jsonSchema: PropTypes.string,
    match: PropTypes.shape({
        params: PropTypes.shape({
            collectionID: PropTypes.string.isRequired,
        }),
    }),
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        allowances: state.account.bc.allowances.value,
        balance: state.account.bc.balance.value,
        broadCastInProgress: state.account.wallet.broadCast.inProgress,
        inProgress: state.collections.newCollection.inProgress,
        lang: state.language,
        signInProgress: state.account.bc.protoBufSign.inProgress,
        symbol: state.collections.createCollection.symbol,
        txHashInProgress: state.account.bc.txHash.inProgress,
        value: state.collections.createCollection.value,
        description: state.collections.createCollection.description,
        imageUrl: state.collections.createCollection.imageUrl,
        jsonSchema: state.collections.createCollection.jsonSchema,
        // collection: state.createAssets.nft.singleCollection.value,
    };
};

const actionToProps = {
    addCollection,
    txSignAndBroadCast,
    fetch: fetchCollections,
    fetchBalance,
    fetchTxHash,
    onChange: setCollectionName,
    showMessage,
    setCollectionSymbol,
    setTxHashInProgressFalse,
    sign: protoBufSigning,
    setCollectionJsonSchema,
    showCollectionConfirmDialog,
};

export default withRouter(connect(stateToProps, actionToProps)(CreateCollection));
