import React from 'react';
import './index.css';
import thumbnail from '../../../assets/dashboard/collections.svg';
import verifiedIcon from '../../../assets/dashboard/verified.svg';
import variables from '../../../utils/variables';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';

const Info = (props) => {
    return (
        <div className="collection_section">
            <div className="section1">
                <img alt="thumb" src={thumbnail} />
            </div>
            <div className="section2">
                <div className="row1">
                    <p>Rise of the Aztecs</p>
                    <img alt="verified" src={verifiedIcon} />
                </div>
                <div className="row2">
                    <span>{variables[props.lang]['created_by']}</span>
                    <div className="hash_text">
                        <p>{props.address}</p>
                        <span>{props.address && props.address.slice(props.address.length - 6, props.address.length)}</span>
                    </div>
                </div>
                <div className="row3">
                        The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles In the distant future, drivers fight in a world divided into 4 Factions. Originals Meka,
                </div>
            </div>
        </div>
    );
};

Info.propTypes = {
    address: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        address: state.account.wallet.connection.address,
    };
};

export default connect(stateToProps)(Info);
