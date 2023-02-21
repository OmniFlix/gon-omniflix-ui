import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dialog, DialogContent } from '@mui/material';
import { hideBurnDialog } from '../../../actions/collection';
import React, { useState } from 'react';
import successIcon from '../../../assets/success.svg';
import variables from '../../../utils/variables';
import CopyButton from '../../../components/CopyButton';
import nftIcon from '../../../assets/thumbnail.svg';
import failedIcon from '../../../assets/failed.svg';
import closeIcon from '../../../assets/close.svg';
import NFTIDTextField from './NFTIDTextField';
import './index.css';

const BurnDialog = (props) => {
    const [burn, setBurn] = useState('');
    const hash = 'mintscanadv2za5a3ascnadv2za5a3ascnadv2a5a3ascnadv2za5a3asc27b18';
    const handleClick = (value) => {
        setBurn(value);
    };

    return (
        <Dialog
            aria-describedby="verify-twitter-dialog-description"
            aria-labelledby="verify-twitter-dialog-title"
            className="dialog burn_dialog"
            open={props.open}
            onClose={props.handleClose}>
            {burn === 'success'
                ? <DialogContent className="transfer_dialog_content success_transfer">
                    <img alt="success" src={successIcon} />
                    <h2>{variables[props.lang]['nft_deleted']}</h2>
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
                            {variables[props.lang].okay}
                        </Button>
                    </div>
                </DialogContent>
                : burn === 'failed'
                    ? <DialogContent className="transfer_dialog_content failed_transfer">
                        <img alt="success" src={failedIcon} />
                        <h2>{variables[props.lang]['burn_failed']}</h2>
                        <div className="card">
                            <img alt="nft" src={nftIcon} />
                            <div>
                                <p className="collection">Liquidity Pool NFTs</p>
                                <p className="nft">ATOM-OSMO-LPNFT-654321</p>
                            </div>
                        </div>
                        <div className="actions">
                            <Button className="primary_button" onClick={props.handleClose}>
                                {variables[props.lang].okay}
                            </Button>
                        </div>
                    </DialogContent>
                    : <DialogContent className="transfer_dialog_content">
                        <h2>{variables[props.lang]['agree_to_delete']}</h2>
                        <img alt="close" className="close_button" src={closeIcon} onClick={props.handleClose} />
                        <div className="card">
                            <img alt="nft" src={nftIcon} />
                            <div>
                                <p className="collection">Liquidity Pool NFTs</p>
                                <p className="nft">ATOM-OSMO-LPNFT-654321</p>
                            </div>
                        </div>
                        <div className="tx_hash">
                            <div>
                                <div className="hash_text">
                                    <p>{hash}</p>
                                    <span>{hash && hash.slice(hash.length - 6, hash.length)}</span>
                                </div>
                                <CopyButton data={hash} />
                            </div>
                        </div>
                        <div className="fields">
                            <p>{variables[props.lang]['enter_last_digit']}</p>
                            <NFTIDTextField />
                        </div>
                        <div className="actions">
                            <Button className="primary_button" onClick={() => handleClick('success')}>
                                {variables[props.lang]['burn_nft']}
                            </Button>
                        </div>
                    </DialogContent>}
        </Dialog>
    );
};

BurnDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        open: state.collection.burnDialog.open,
    };
};

const actionToProps = {
    handleClose: hideBurnDialog,
};

export default connect(stateToProps, actionToProps)(BurnDialog);
