import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dialog, DialogContent } from '@mui/material';
import { hideTransferDialog } from '../../../actions/collection';
import React from 'react';
import variables from '../../../utils/variables';
import closeIcon from '../../../assets/close.svg';
import ChainSelectField from './ChainSelectField';
import AddressTextField from './AddressTextField';
import './index.css';
import CopyButton from '../../../components/CopyButton';
import successIcon from '../../../assets/success.svg';
import failedIcon from '../../../assets/failed.svg';
import ImageOnLoad from '../../../components/ImageOnLoad';
import { mediaReference } from '../../../utils/ipfs';
import NativeButton from './NativeButton';
import IBCButton from './IBCButton';
import { ibcMedia, ibcPreview } from '../../../utils/ibcData';

const TransferDialog = (props) => {
    const data = props.value && props.value.data && JSON.parse(props.value.data);

    return (
        <Dialog
            aria-describedby="verify-twitter-dialog-description"
            aria-labelledby="verify-twitter-dialog-title"
            className="dialog transfer_dialog"
            open={props.open}
            onClose={props.handleClose}>
            {props.success
                ? <DialogContent className="transfer_dialog_content success_transfer">
                    <img alt="success" src={successIcon}/>
                    <h2>{variables[props.lang]['transfer_success']}</h2>
                    <div className="tx_hash">
                        <p>{variables[props.lang].tx_hash}</p>
                        <div>
                            <div className="hash_text">
                                <p>{props.hash}</p>
                                <span>{props.hash && props.hash.slice(props.hash.length - 6, props.hash.length)}</span>
                            </div>
                            <CopyButton data={props.hash}/>
                        </div>
                    </div>
                    <div className="card">
                        <ImageOnLoad
                            alt="nft"
                            preview={(props.value && props.value.metadata && props.value.metadata.previewUri && mediaReference(props.value.metadata.previewUri)) ||
                                (props.value && props.value.metadata && props.value.metadata.uri && mediaReference(props.value.metadata.uri)) ||
                                (props.value && props.value.metadata && props.value.metadata.uriHash && mediaReference(props.value.metadata.uriHash)) ||
                                (data && ibcPreview(data)) || (props.value.info && props.value.info.token_uri && mediaReference(props.value.info.token_uri))}
                            src={(props.value && props.value.metadata && props.value.metadata.mediaUri &&
                                mediaReference(props.value.metadata.mediaUri)) || (data && ibcMedia(data))}/>
                        <div>
                            <p className="collection">
                                {props.collection && props.collection.denom && props.collection.denom.name}
                            </p>
                            <p className="nft">
                                {props.value && props.value.metadata && props.value.metadata.name}
                            </p>
                        </div>
                    </div>
                    <div className="actions">
                        <Button className="primary_button" onClick={props.handleClose}>
                            {variables[props.lang].yay}
                        </Button>
                    </div>
                </DialogContent>
                : props.fail
                    ? <DialogContent className="transfer_dialog_content failed_transfer">
                        <img alt="success" src={failedIcon}/>
                        <h2>{variables[props.lang]['transfer_failed']}</h2>
                        <div className="card">
                            <ImageOnLoad
                                alt="nft"
                                preview={(props.value && props.value.metadata && props.value.metadata.previewUri && mediaReference(props.value.metadata.previewUri)) ||
                                    (props.value && props.value.metadata && props.value.metadata.uri && mediaReference(props.value.metadata.uri)) ||
                                    (props.value && props.value.metadata && props.value.metadata.uriHash && mediaReference(props.value.metadata.uriHash)) ||
                                    (data && ibcPreview(data)) || (props.value.info && props.value.info.token_uri && mediaReference(props.value.info.token_uri))}
                                src={(props.value && props.value.metadata && props.value.metadata.mediaUri &&
                                    mediaReference(props.value.metadata.mediaUri)) || (data && ibcMedia(data))}/>
                            <div>
                                <p className="collection">
                                    {props.collection && props.collection.denom && props.collection.denom.name}
                                </p>
                                <p className="nft">
                                    {props.value && props.value.metadata && props.value.metadata.name}
                                </p>
                            </div>
                        </div>
                        <div className="actions">
                            <Button className="primary_button" onClick={props.handleClose}>
                                {variables[props.lang].okay}
                            </Button>
                        </div>
                    </DialogContent>
                    : <DialogContent className="transfer_dialog_content">
                        <h2>{variables[props.lang]['transfer_header']}</h2>
                        <img alt="close" className="close_button" src={closeIcon} onClick={props.handleClose}/>
                        <div className="card">
                            <ImageOnLoad
                                alt="nft"
                                preview={(props.value && props.value.metadata && props.value.metadata.previewUri && mediaReference(props.value.metadata.previewUri)) ||
                                    (props.value && props.value.metadata && props.value.metadata.uri && mediaReference(props.value.metadata.uri)) ||
                                    (props.value && props.value.metadata && props.value.metadata.uriHash && mediaReference(props.value.metadata.uriHash)) ||
                                    (data && ibcPreview(data)) || (props.value.info && props.value.info.token_uri && mediaReference(props.value.info.token_uri))}
                                src={(props.value && props.value.metadata && props.value.metadata.mediaUri &&
                                    mediaReference(props.value.metadata.mediaUri)) || (data && ibcMedia(data))}/>
                            <div>
                                <p className="collection">
                                    {props.collection && props.collection.denom && props.collection.denom.name}
                                </p>
                                <p className="nft">
                                    {props.value && props.value.metadata && props.value.metadata.name}
                                </p>
                            </div>
                        </div>
                        <div className="fields">
                            <ChainSelectField/>
                            <AddressTextField/>
                        </div>
                        <div className="actions">
                            {props.chainID === ''
                                ? null
                                : props.chainID === props.chain
                                    ? <NativeButton/>
                                    : <IBCButton/>}
                        </div>
                    </DialogContent>}
        </Dialog>
    );
};

TransferDialog.propTypes = {
    chain: PropTypes.string.isRequired,
    chainID: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    fail: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    hash: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    value: PropTypes.object.isRequired,
};

const stateToProps = (state) => {
    return {
        chainID: state.collection.chainID,
        fail: state.collection.transferDialog.fail,
        hash: state.collection.transferDialog.hash,
        lang: state.language,
        open: state.collection.transferDialog.open,
        value: state.collection.transferDialog.value,
        chain: state.collection.transferDialog.chain,
        success: state.collection.transferDialog.success,
        collection: state.collection.collection.value,
    };
};

const actionToProps = {
    handleClose: hideTransferDialog,
};

export default connect(stateToProps, actionToProps)(TransferDialog);
