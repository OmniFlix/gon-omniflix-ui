import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dialog, DialogContent } from '@mui/material';
import React from 'react';
import variables from '../../../../utils/variables';
import closeIcon from '../../../../assets/close.svg';
import './index.css';
import ImageOnLoad from '../../../../components/ImageOnLoad';
import { mediaReference } from '../../../../utils/ipfs';
import { ibcMedia, ibcPreview } from '../../../../utils/ibcData';
import { hideListNFTDialog } from '../../../../actions/dashboard';
import CopyButton from '../../../../components/CopyButton';
import SelectTokenSelectField from './SelectTokenSelectField';
import PriceTextField from './PriceTextField';
import successIcon from '../../../../assets/success.svg';
import failedIcon from '../../../../assets/failed.svg';
import ListButton from './ListButton';

const ListNFTDialog = (props) => {
    const data = props.value && props.value.data && JSON.parse(props.value.data);

    return (
        <Dialog
            aria-describedby="verify-twitter-dialog-description"
            aria-labelledby="verify-twitter-dialog-title"
            className="dialog list_dialog"
            open={props.open}
            onClose={props.handleClose}>
            {props.success
                ? <DialogContent className="list_dialog_content success_transfer">
                    <img alt="success" className="result_image" src={successIcon}/>
                    <h2>{variables[props.lang]['list_success']}</h2>
                    <div className="tx_hash hash_card card">
                        <p>{variables[props.lang].tx_hash}</p>
                        <div className="nft_id">
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
                    ? <DialogContent className="list_dialog_content success_transfer">
                        <img alt="success" className="result_image" src={failedIcon}/>
                        <h2>{variables[props.lang]['list_fail']}</h2>
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
                    : <DialogContent className="list_dialog_content">
                        <h2>
                            {variables[props.lang]['list_nft_header']} {'  '} ???
                            {props.value && props.value.metadata && props.value.metadata.name} ???
                        </h2>
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
                                    {props.collection && props.collection.denom && props.collection.denom.name} skhdfjhdbfjhsdfj
                                </p>
                                <p className="nft">
                                    {props.value && props.value.metadata && props.value.metadata.name}
                                </p>
                                <div className="nft_id">
                                    <div className="hash_text">
                                        <p>{props.value && props.value.id}</p>
                                        <span>{props.value && props.value.id &&
                                            props.value.id.slice(props.value.id.length - 6, props.value.id.length)}</span>
                                    </div>
                                    <CopyButton data={(props.value && props.value.id)}/>
                                </div>
                            </div>
                        </div>
                        <div className="fields">
                            <SelectTokenSelectField/>
                            <PriceTextField/>
                        </div>
                        <div className="actions">
                            <Button className="secondary_button" onClick={props.handleClose}>
                                {variables[props.lang].cancel}
                            </Button>
                            <ListButton/>
                        </div>
                    </DialogContent>}
        </Dialog>
    );
};

ListNFTDialog.propTypes = {
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
        lang: state.language,
        open: state.dashboard.listNFTDialog.open,
        value: state.dashboard.listNFTDialog.value,
        collection: state.collection.collection.value,
        hash: state.dashboard.listNFTDialog.hash,
        success: state.dashboard.listNFTDialog.success,
        fail: state.dashboard.listNFTDialog.fail,
    };
};

const actionToProps = {
    handleClose: hideListNFTDialog,
};

export default connect(stateToProps, actionToProps)(ListNFTDialog);
