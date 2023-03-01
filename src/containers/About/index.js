import React from 'react';
import './index.css';
import logoIcon from '../../assets/about.svg';
import variables from '../../utils/variables';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import image1 from '../../assets/about/1.svg';
import image2 from '../../assets/about/2.svg';
import image3 from '../../assets/about/3.svg';
import ConnectButton from '../NavBar/ConnectButton';
import '../NavBar/index.css';
import omniflixIcon from '../../assets/omniFlix.svg';
import Partners from './Partners';

const About = (props) => {
    return (
        <div className="about_page scroll_bar">
            <div className="row1">
                <div className="left_section">
                    {/* <h2>{variables[props.lang]['welcome_to_gon']}</h2> */}
                    <p>{variables[props.lang]['welcome_gon_content']}</p>
                    {props.address === '' && !localStorage.getItem('gon_of_address') &&
                        <ConnectButton/>}
                </div>
                <div className="right_section">
                    <img alt="about" src={logoIcon}/>
                </div>
            </div>
            <div className="row">
                <div className="section">
                    <div>
                        <img alt="number" src={image1}/>
                        <h3>{variables[props.lang].connect}</h3>
                    </div>
                    <p>{variables[props.lang]['connect_view_content']}</p>
                </div>
                <div className="section">
                    <div>
                        <img alt="number" src={image2}/>
                        <h3>{variables[props.lang]['create_nfts']}</h3>
                    </div>
                    <p>{variables[props.lang]['create_nfts_content']}</p>
                </div>
                <div className="section">
                    <div>
                        <img alt="number" src={image3}/>
                        <h3>{variables[props.lang]['transfer_nfts']}</h3>
                    </div>
                    <p>{variables[props.lang]['transfer_nfts_content']}</p>
                </div>
            </div>
            <div className="partners_sponsors">
                <h2>{variables[props.lang]['partners_sponsors']}</h2>
                <Partners />
            </div>
            <div className="footer">
                <p>{variables[props.lang].powered_by}</p>
                <img alt="omniflix" src={omniflixIcon}/>
            </div>
        </div>
    );
};

About.propTypes = {
    address: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        lang: state.language,
    };
};

export default connect(stateToProps)(About);
