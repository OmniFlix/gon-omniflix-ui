import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useRef } from 'react';
import variables from '../../utils/variables';
import AssetTitleTextField from './AssetTitleTextField';
import SuffixSelectField from './SuffixSelectField';
import DescriptionTextField from './DescriptionTextField';
import CollectionSelectField from './CollectionSelectField';
import { Button } from '@mui/material';
import TransferSwitch from './TransferSwitch';
import ExtensibleSwitch from './ExtensibleSwitch';
import NsfwSwitch from './NsfwSwitch';
import RoyaltyShareTextField from './RoyaltyShareTextField';
import WhiteListTags from './WhiteListTags';
import MediaURLTextField from './MediaURLTextField';
import PreviewURLTextField from './PreviewURLTextField';
import SuffixStartTextField from './SuffixStartTextfield';
import Upload from '../CreateCollection/Upload';
import SchemaProperties from './SchemaProperties';
import RoyaltyShareSwitch from './RoyaltyShareSwitch';
import { setMediaURL, setPreviewURL, setSuffixCount, showMintNFTConfirmDialog } from '../../actions/mintNFT';

const LeftSection = (props) => {
    const element = useRef(null);
    const handleMint = () => {
        let mint = true;
        if (props.suffix && props.suffix.value &&
            (props.suffixCount < 1 || !props.suffixCount)) {
            if (element) {
                element.current.scrollIntoView({
                    behavior: 'smooth',
                });
            }

            props.setSuffixCount(props.suffixCount, false);
            mint = false;
        }

        if (mint) {
            props.showMintNFTConfirmDialog();
        }
    };

    let disable = props.signInProgress || props.broadCastInProgress || props.txHashInProgress;
    disable = disable || !props.collection || Object.keys(props.collection).length === 0;

    return (
        <div className="left_section">
            <form
                noValidate
                autoComplete="off"
                className="scroll_bar">
                <div className="row">
                    <div className="label_info">
                        <p className="title">{variables[props.lang]['nft_title']}</p>
                    </div>
                    <AssetTitleTextField/>
                </div>
                <div className="row">
                    <div className="label_info">
                        <p className="title">{variables[props.lang].suffix}</p>
                        <p className="title_info">{variables[props.lang]['suffix_info']}
                            <span>this</span>
                        </p>
                    </div>
                    <div ref={element} className="upload_avatar">
                        <SuffixSelectField/>
                        <SuffixStartTextField/>
                    </div>
                </div>
                <div className="row row_reverse description_section">
                    <div className="label_info">
                        <p className="title">{variables[props.lang]['nft_description']}</p>
                    </div>
                    <DescriptionTextField/>
                    <p className="description_characters">
                        {props.description && props.description.length > 0 ? props.description.length : 0} /
                        256
                    </p>
                </div>
                <div className="row">
                    <div className="label_info">
                        <p className="title">{variables[props.lang].collection}</p>
                    </div>
                    <CollectionSelectField/>
                </div>
                <div className="row">
                    <div className="label_info">
                        <p className="title">{variables[props.lang]['nft_media_url']}</p>
                    </div>
                    <div className="upload_avatar">
                        <MediaURLTextField/>
                        <Upload handleSet={props.setMediaURL}/>
                    </div>
                </div>
                <div className="row">
                    <div className="label_info">
                        <p className="title">{variables[props.lang]['preview_url']}</p>
                    </div>
                    <div className="upload_avatar">
                        <PreviewURLTextField/>
                        <Upload handleSet={props.setPreviewURL}/>
                    </div>
                </div>
                {props.collection && props.collection.schema &&
                    <div className="row row_reverse">
                        <div className="label_info">
                            <p className="title">{variables[props.lang].schema_properties}</p>
                            <p className="title_info">{variables[props.lang]['schema_properties_info']}</p>
                        </div>
                        <SchemaProperties schema={props.collection.schema}/>
                    </div>}
                <div className="row">
                    <div className="label_info">
                        <p className="title">{variables[props.lang]['transfer_status']}</p>
                        <p className="title_info">{variables[props.lang]['transfer_status_info1']}</p>
                    </div>
                    <TransferSwitch/>
                </div>
                <div className="row">
                    <div className="label_info">
                        <p className="title">{variables[props.lang].extensibility}</p>
                        <p className="title_info">{variables[props.lang]['extensible_info1']}</p>
                    </div>
                    <ExtensibleSwitch/>
                </div>
                <div className="row">
                    <div className="label_info">
                        <p className="title">{variables[props.lang]['nsfw_name']}</p>
                        <p className="title_info">{variables[props.lang]['nsfw_info1']}</p>
                    </div>
                    <NsfwSwitch/>
                </div>
                <div className="row">
                    <div className="label_info">
                        <p className="title">{variables[props.lang].royalties}</p>
                        <p className="title_info">{variables[props.lang]['royalties_info']}</p>
                    </div>
                    <RoyaltyShareSwitch/>
                    {props.royaltyShareStatus &&
                        <RoyaltyShareTextField/>}
                </div>
                <div className="row">
                    <div className="label_info">
                        <p className="title">{variables[props.lang].accounts}</p>
                        <p className="title_info">{variables[props.lang]['accounts_info']}</p>
                    </div>
                    <WhiteListTags/>
                </div>
                <div className="row actions">
                    <Button disabled={disable} onClick={handleMint}>
                        {variables[props.lang].mint}
                        {props.whiteListValue && props.whiteListValue.length
                            ? ` ${props.whiteListValue.length} ${variables[props.lang].nfts}`
                            : ' ' + variables[props.lang].nft}
                    </Button>
                </div>
            </form>
        </div>
    );
};

LeftSection.propTypes = {
    broadCastInProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    royaltyShareStatus: PropTypes.bool.isRequired,
    setMediaURL: PropTypes.func.isRequired,
    setPreviewURL: PropTypes.func.isRequired,
    setSuffixCount: PropTypes.func.isRequired,
    showMintNFTConfirmDialog: PropTypes.func.isRequired,
    signInProgress: PropTypes.bool.isRequired,
    txHashInProgress: PropTypes.bool.isRequired,
    whiteListValue: PropTypes.array.isRequired,
    collection: PropTypes.object,
    description: PropTypes.string,
    suffix: PropTypes.object,
    suffixCount: PropTypes.any,
};

const stateToProps = (state) => {
    return {
        broadCastInProgress: state.account.wallet.broadCast.inProgress,
        collection: state.mintNFT.collection.value,
        lang: state.language,
        whiteListValue: state.mintNFT.whiteListValue,
        txHashInProgress: state.account.bc.txHash.inProgress,
        signInProgress: state.account.bc.protoBufSign.inProgress,
        royaltyShareStatus: state.mintNFT.royaltyShare.status,
        suffix: state.mintNFT.suffix.value,
        suffixCount: state.mintNFT.suffix.count,

        description: state.mintNFT.description.value,
    };
};

const actionToProps = {
    showMintNFTConfirmDialog,
    setSuffixCount,
    setMediaURL,
    setPreviewURL,
};

export default connect(stateToProps, actionToProps)(LeftSection);
