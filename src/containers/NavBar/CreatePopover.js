import React, { useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { withStyles } from '@mui/styles';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withRouter from '../../components/WithRouter';
import variables from '../../utils/variables';
import { ReactComponent as CollectionsIcon } from '../../assets/dashboard/collections.svg';
import { ReactComponent as FileUploadIcon } from '../../assets/sideBar/upload.svg';
import { showUploadFilesDialog } from '../../actions/createAssets';
import { setEmptyValue } from '../../actions/account';
import { ReactComponent as CreateIcon } from '../../assets/navBar/create.svg';

const CustomTooltip = withStyles((theme) => ({
    tooltip: {
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
        margin: '19px 0 0',
        padding: '20px',
        width: '300px',
        maxWidth: '300px',
        background: '#1B1B1B',
        border: '1px solid #353535',
        borderRadius: '20px',
        color: '#ffffff',
    },
}))(Tooltip);

const CreatePopover = (props) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleShowUploadDialog = () => {
        // props.showUploadFilesDialog();
        props.router.navigate('/mint');
        setOpen(false);
    };

    const handleNFTCollection = () => {
        props.router.navigate('/create-collection');
        setOpen(false);
    };

    const id = open ? 'create-popover' : undefined;

    return (
        <>
            <CustomTooltip
                interactive
                open={open}
                title={<div className="create_popover">
                    <Button className="tab_section" onClick={handleNFTCollection}>
                        <CollectionsIcon/>
                        <span className="tab_details">
                            <span>{variables[props.lang]['nft_collection']}</span>
                            <span>{variables[props.lang]['nft_collection_info']}</span>
                        </span>
                    </Button>
                    <Button className="tab_section" onClick={handleShowUploadDialog}>
                        <FileUploadIcon/>
                        <span className="tab_details">
                            <span>{variables[props.lang]['asset_via_upload']}</span>
                            <span>{variables[props.lang]['asset_via_upload_info']}</span>
                        </span>
                    </Button>
                </div>}
                onClose={handleClose}
                onOpen={handleOpen}>
                <Button
                    aria-describedby={id}
                    className="create_button">
                    {variables[props.lang].create}
                    <CreateIcon/>
                </Button>
            </CustomTooltip>
        </>
    );
};

CreatePopover.propTypes = {
    lang: PropTypes.string.isRequired,
    setEmptyValue: PropTypes.func.isRequired,
    showUploadFilesDialog: PropTypes.func.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }),
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

const actionToProps = {
    setEmptyValue,
    showUploadFilesDialog,
};

export default withRouter(connect(stateToProps, actionToProps)(CreatePopover));
