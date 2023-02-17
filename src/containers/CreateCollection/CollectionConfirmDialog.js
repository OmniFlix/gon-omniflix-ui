import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import { Button, Dialog, DialogContent } from '@mui/material';
import variables from '../../utils/variables';
import MintCollectionButton from './MintCollectionButton';
import { customTypes } from '../../registry';
import UpdateCollectionButton from './UpdateCollectionButton';
import { hideCollectionConfirmDialog } from '../../actions/collections';
import withRouter from '../../components/WithRouter';

const CollectionConfirmDialog = (props) => {
    return (
        <Dialog
            aria-describedby="verify-twitter-dialog-description"
            aria-labelledby="verify-twitter-dialog-title"
            className="dialog collection_confirm_dialog"
            open={props.open}
            onClose={props.handleClose}>
            <DialogContent className="collection_confirm_dialog_content">
                {props.router && props.router.params && props.router.params.collectionID
                    ? <h3>{variables[props.lang].update_collection_confirmation}</h3>
                    : <h3>{variables[props.lang].mint_collection_confirmation}</h3>}
                <div className="section">
                    <div className="row">
                        <p className="label">{variables[props.lang].message_type}</p>
                        {props.router && props.router.params && props.router.params.collectionID
                            ? <p className="value">{customTypes.UpdateDenom && customTypes.UpdateDenom.typeUrl}</p>
                            : <p className="value">{customTypes.CreateDenom && customTypes.CreateDenom.typeUrl}</p>}
                    </div>
                    {props.router && props.router.params && props.router.params.collectionID
                        ? null
                        : <div className="row">
                            <p className="label">{(variables[props.lang].collection_symbol).toLowerCase()}</p>
                            <p className="value">{props.symbol}</p>
                        </div>}
                    <div className="row">
                        <p className="label">{(variables[props.lang].collection_name).toLowerCase()}</p>
                        <p className="value">{props.name}</p>
                    </div>
                    {props.router && props.router.params && props.router.params.collectionID
                        ? null
                        : <div className="row">
                            <p className="label">{variables[props.lang].schema_property}</p>
                            <p className="value">{props.jsonSchema ? 'Yes' : 'No'}</p>
                        </div>}
                    {props.router && props.router.params && props.router.params.collectionID && props.imageUrl !== ''
                        ? <div className="row">
                            <p className="label">{variables[props.lang].collection_avatar}</p>
                            <p className="value">{props.imageUrl}</p>
                        </div> : null}
                </div>
                <div className="actions">
                    <Button
                        className="cancel_button"
                        variant="contained"
                        onClick={props.handleClose}>
                        {variables[props.lang].cancel}
                    </Button>
                    {props.router && props.router.params && props.router.params.collectionID
                        ? <UpdateCollectionButton/>
                        : <MintCollectionButton/>}
                </div>
            </DialogContent>
        </Dialog>
    );
};

CollectionConfirmDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    router: PropTypes.shape({
        params: PropTypes.shape({
            collectionID: PropTypes.string,
        }).isRequired,
    }).isRequired,
    symbol: PropTypes.string.isRequired,
    imageUrl: PropTypes.any,
    jsonSchema: PropTypes.string,
    value: PropTypes.object,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        open: state.collections.collectionConfirmDialog.open,
        value: state.collections.collectionConfirmDialog.value,
        symbol: state.collections.createCollection.symbol,
        name: state.collections.createCollection.value,
        jsonSchema: state.collections.createCollection.jsonSchema,
        imageUrl: state.collections.createCollection.imageUrl,
    };
};

const actionToProps = {
    handleClose: hideCollectionConfirmDialog,
};

export default withRouter(connect(stateToProps, actionToProps)(CollectionConfirmDialog));
