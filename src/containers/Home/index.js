import React from 'react';
import './index.css';
import ChainPopover from './ChainPopover';
import Tabs from './Tabs';
import SearchTextField from './SearchTextField';

const Home = () => {
    return (
        <div className="home">
            <div className="header">
                <div className="left_section">
                    <ChainPopover />
                    <p className="border"/>
                    <Tabs />
                </div>
                <div className="right_section">
                    <SearchTextField />
                </div>
            </div>
        </div>
    );
};

export default Home;
