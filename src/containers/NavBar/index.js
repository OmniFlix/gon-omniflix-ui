import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { ReactComponent as StudioLogo } from '../../assets/studio_logo.svg';
import { ReactComponent as CreateIcon } from '../../assets/navBar/create.svg';
import { Button } from '@mui/material';
import variables from '../../utils/variables';

const NavBar = (props) => {
    const address = 'omniflix1rh3t2ptfpzm75tcfcp46vnkk992hqrt2z50glp';
    return (
        <div className="navbar">
            <div className="left_section">
                <StudioLogo/>
            </div>
            <div className="right_section">
                <Button className="create_button">
                    {variables[props.lang].create}
                    <CreateIcon/>
                </Button>
                <div className="connect_account">
                    <Button className="connect_button">
                        {variables[props.lang].connect}
                    </Button>
                    <div className="connected_account">
                        <p className="tokens">18036 FLIX</p>
                        <div className="hash_text">
                            <p>{address}</p>
                            <span>{address.slice(address.length - 6, address.length)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

NavBar.propTypes = {
    lang: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

export default connect(stateToProps)(NavBar);
