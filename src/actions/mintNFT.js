import {
    ASSET_TITLE_SET,
    BULK_MINT_SET,
    COLLECTION_SET,
    DESCRIPTION_SET,
    EXTENSIBLE_STATUS_SET,
    MEDIA_URL_SET,
    MINT_NFT_CONFIRM_DIALOG_HIDE,
    MINT_NFT_CONFIRM_DIALOG_SHOW,
    NSFW_STATUS_SET,
    PREVIEW_URL_SET,
    ROYALTY_SHARE_SET,
    ROYALTY_SHARE_STATUS_SET,
    SUFFIX_COUNT_SET,
    SUFFIX_VALUE_SET,
    TRANSFER_STATUS_SET,
    WHITELIST_VALUE_SET,
} from '../constants/mintNFT';

export const setAssetTitle = (value, valid) => {
    return {
        type: ASSET_TITLE_SET,
        value,
        valid,
    };
};

export const setDescription = (value, valid) => {
    return {
        type: DESCRIPTION_SET,
        value,
        valid,
    };
};

export const setCollection = (value) => {
    return {
        type: COLLECTION_SET,
        value,
    };
};

export const setTransferStatus = (value) => {
    return {
        type: TRANSFER_STATUS_SET,
        value,
    };
};

export const setExtensibleStatus = (value) => {
    return {
        type: EXTENSIBLE_STATUS_SET,
        value,
    };
};

export const setNsfwStatus = (value) => {
    return {
        type: NSFW_STATUS_SET,
        value,
    };
};

export const setRoyaltyShareStatus = (value) => {
    return {
        type: ROYALTY_SHARE_STATUS_SET,
        value,
    };
};

export const setRoyaltyShare = (value) => {
    return {
        type: ROYALTY_SHARE_SET,
        value,
    };
};

export const setBulkMint = (show) => {
    return {
        type: BULK_MINT_SET,
        show,
    };
};

export const setSuffixValue = (value) => {
    return {
        type: SUFFIX_VALUE_SET,
        value,
    };
};

export const setSuffixCount = (value, valid) => {
    return {
        type: SUFFIX_COUNT_SET,
        value,
        valid,
    };
};

export const setMediaURL = (value) => {
    return {
        type: MEDIA_URL_SET,
        value,
    };
};

export const setPreviewURL = (value) => {
    return {
        type: PREVIEW_URL_SET,
        value,
    };
};

export const setWhiteListValue = (value) => {
    return {
        type: WHITELIST_VALUE_SET,
        value,
    };
};

export const showMintNFTConfirmDialog = (value) => {
    return {
        type: MINT_NFT_CONFIRM_DIALOG_SHOW,
        value,
    };
};

export const hideMintNFTConfirmDialog = () => {
    return {
        type: MINT_NFT_CONFIRM_DIALOG_HIDE,
    };
};
