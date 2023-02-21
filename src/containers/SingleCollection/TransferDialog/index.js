import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dialog, DialogContent } from '@mui/material';
import { hideTransferDialog } from '../../../actions/collection';
import React, { useState } from 'react';
import variables from '../../../utils/variables';
import closeIcon from '../../../assets/close.svg';
import nftIcon from '../../../assets/thumbnail.svg';
import ChainSelectField from './ChainSelectField';
import AddressTextField from './AddressTextField';
import './index.css';
import CopyButton from '../../../components/CopyButton';
import successIcon from '../../../assets/success.svg';
import failedIcon from '../../../assets/failed.svg';

const TransferDialog = (props) => {
    const [transfer, setTransfer] = useState('');
    const hash = 'mintscanadv2za5a3ascnadv2za5a3ascnadv2a5a3ascnadv2za5a3asc27b18';
    const handleClick = (value) => {
        setTransfer(value);
    };

    return (
        <Dialog
            aria-describedby="verify-twitter-dialog-description"
            aria-labelledby="verify-twitter-dialog-title"
            className="dialog transfer_dialog"
            open={props.open}
            onClose={props.handleClose}>
            {transfer === 'success'
                ? <DialogContent className="transfer_dialog_content success_transfer">
                    <img alt="success" src={successIcon} />
                    <h2>{variables[props.lang]['transfer_success']}</h2>
                    <div className="tx_hash">
                        <p>{variables[props.lang].tx_hash}</p>
                        <div>
                            <div className="hash_text">
                                <p>{hash}</p>
                                <span>{hash && hash.slice(hash.length - 6, hash.length)}</span>
                            </div>
                            <CopyButton data={hash} />
                        </div>
                    </div>
                    <div className="card">
                        <img alt="nft" src={nftIcon} />
                        <div>
                            <p className="collection">Liquidity Pool NFTs</p>
                            <p className="nft">ATOM-OSMO-LPNFT-654321</p>
                        </div>
                    </div>
                    <div className="actions">
                        <Button className="primary_button" onClick={props.handleClose}>
                            {variables[props.lang].yay}
                        </Button>
                    </div>
                </DialogContent>
                : transfer === 'failed'
                    ? <DialogContent className="transfer_dialog_content failed_transfer">
                        <img alt="success" src={failedIcon} />
                        <h2>{variables[props.lang]['transfer_failed']}</h2>
                        <div className="card">
                            <img alt="nft" src={nftIcon} />
                            <div>
                                <p className="collection">Liquidity Pool NFTs</p>
                                <p className="nft">ATOM-OSMO-LPNFT-654321</p>
                            </div>
                        </div>
                        <div className="actions">
                            <Button className="primary_button" onClick={props.handleClose}>
                                {variables[props.lang].yay}
                            </Button>
                        </div>
                    </DialogContent>
                    : <DialogContent className="transfer_dialog_content">
                        <h2>{variables[props.lang]['transfer_header']}</h2>
                        <img alt="close" className="close_button" src={closeIcon} onClick={props.handleClose} />
                        <div className="card">
                            <img alt="nft" src={nftIcon} />
                            <div>
                                <p className="collection">Liquidity Pool NFTs</p>
                                <p className="nft">ATOM-OSMO-LPNFT-654321</p>
                            </div>
                        </div>
                        <div className="fields">
                            <ChainSelectField />
                            <AddressTextField />
                        </div>
                        <div className="actions">
                            <Button className="primary_button" onClick={() => handleClick('success')}>
                                {variables[props.lang]['ibc_native_transfer']}
                            </Button>
                        </div>
                    </DialogContent>}
        </Dialog>
    );
};

TransferDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        open: state.collection.transferDialog.open,
    };
};

const actionToProps = {
    handleClose: hideTransferDialog,
};

export default connect(stateToProps, actionToProps)(TransferDialog);
