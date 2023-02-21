import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { getAssetType } from '../../utils/strings';
import { IPFS_REFERENCE_PATH } from '../../config';
import DotsLoading from '../../components/DotsLoading';
import variables from '../../utils/variables';
import { showMessage } from '../../actions/snackbar';
import { avatarUpload, setCollectionImageUrl } from '../../actions/collections';
import withRouter from '../../components/WithRouter';

const Upload = (props) => {
    const handleFileChange = (selectedFiles) => {
        const type = selectedFiles && selectedFiles.length && selectedFiles[0] && getAssetType(selectedFiles[0].type);
        if (['image'].indexOf(type) === -1) {
            props.showMessage('File format not supported', 'warning');
            return;
        }

        if (selectedFiles && selectedFiles.length > 0 && selectedFiles[0]) {
            props.avatarUpload(selectedFiles[0], (res) => {
                if (res) {
                    const url = IPFS_REFERENCE_PATH + res.Hash;
                    if (props.handleSet) {
                        props.handleSet(url);
                        return;
                    }

                    props.setCollectionImageUrl(url);
                }
            });
        } else {
            props.showMessage('File Not Selected', 'warning');
        }
    };

    return (
        <div className="select_field_parent">
            {props.avatarInProgress
                ? <DotsLoading/>
                : <div
                    className="file_upload"
                    onDrop={(e) => {
                        e.preventDefault();
                        handleFileChange(e.dataTransfer.files);
                    }}>
                    <Button
                        variant="contained">
                        <input
                            accept={'image/*'}
                            type="file"
                            onChange={(e) =>
                                handleFileChange(e.target.files)
                            }/>
                        {props.match && props.match.params && props.match.params.collectionID && props.imageUrl
                            ? variables[props.lang]['re_upload_file']
                            : variables[props.lang]['upload_file']}
                    </Button>
                </div>}
        </div>
    );
};

Upload.propTypes = {
    avatarInProgress: PropTypes.bool.isRequired,
    avatarUpload: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    setCollectionImageUrl: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    handleSet: PropTypes.func,
    imageUrl: PropTypes.any,
    match: PropTypes.shape({
        params: PropTypes.shape({
            collectionID: PropTypes.string.isRequired,
        }),
    }),
};

const stateToProps = (state) => {
    return {
        avatarInProgress: state.collections.avatar.inProgress,
        lang: state.language,
        imageUrl: state.collections.createCollection.imageUrl,
    };
};

const actionsToProps = {
    avatarUpload: avatarUpload,
    showMessage,
    setCollectionImageUrl,
};

export default withRouter(connect(stateToProps, actionsToProps)(Upload));
