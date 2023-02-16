import { UPLOAD_FILES_DIALOG_HIDE, UPLOAD_FILES_DIALOG_SHOW } from '../../constants/createAssets';

export const showUploadFilesDialog = () => {
    return {
        type: UPLOAD_FILES_DIALOG_SHOW,
    };
};

export const hideUploadFilesDialog = () => {
    return {
        type: UPLOAD_FILES_DIALOG_HIDE,
    };
};
