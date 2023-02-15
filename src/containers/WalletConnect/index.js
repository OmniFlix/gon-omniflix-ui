import React from 'react';
import './index.css';
import { Button } from '@mui/material';

const WalletConnect = () => {
    return (
        <div className="wallet_connect">
            <div className="section1">
                Lorem ipsum line on GOZ/Phases/Interchain NFTs
            </div>
            <div className="section2">
                <p>IBC NFT Transfer</p>
                <span>&</span>
                <p>Bulk Transfer Explanation</p>
            </div>
            <div className="section3">
                <Button>
                    Connect Wallet
                </Button>
            </div>
            <div className="section4">
                Connect your wallet to view NFTs in selected chain
            </div>
        </div>
    );
};

export default WalletConnect;
