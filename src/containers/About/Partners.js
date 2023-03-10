import React from 'react';
import variables from '../../utils/variables';
import interChain from '../../assets/partners/interchain.svg';
import cosmos from '../../assets/partners/cosmos.svg';
import iris from '../../assets/partners/iris.svg';
import stargaze from '../../assets/partners/stargaze.svg';
import juno from '../../assets/partners/juno.svg';
import uptick from '../../assets/partners/uptick.svg';
import omniflix from '../../assets/partners/omniFlix.svg';
import hashkey from '../../assets/partners/hashkey.svg';
import idg from '../../assets/partners/idg.svg';
import aws from '../../assets/partners/aws.svg';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bianjie from '../../assets/partners/bianjie.svg';
import judge1 from '../../assets/judges/SusannahEvans.3c5686fb.jpg';
import judge2 from '../../assets/judges/HaifengXi.71c31dac.jpg';
import judge3 from '../../assets/judges/ShaneVitarana.f67e40cc.jpg';
import judge4 from '../../assets/judges/JakeHartnell.3ab6c929.png';
import judge5 from '../../assets/judges/BrianXin.53aabafa.jpg';
import judge7 from '../../assets/judges/DayakarReddy.37208bf8.png';
import judge8 from '../../assets/judges/SijieHan.fc025170.png';
import judge9 from '../../assets/judges/0xUncleLee.Lalaland.b43d0694.png';
import judge10 from '../../assets/judges/JeffreyHu.da363099.jpg';
import judge11 from '../../assets/judges/Johanna.95945a5c.jpg';
import shadow from '../../assets/judges/shadow.png';

const Partners = (props) => {
    const ecosystem = [{
        image: interChain,
    }, {
        image: cosmos,
    }, {
        image: iris,
    }, {
        image: stargaze,
    }, {
        image: juno,
    }, {
        image: uptick,
    }, {
        image: omniflix,
    }];

    const institution = [{
        image: hashkey,
    }, {
        image: idg,
    }, {
        image: aws,
    }];

    const judges = [{
        image: judge1,
        name: 'Susannah Evans',
        designation: 'IBC Product Lead, Interchain',
    }, {
        image: judge2,
        name: 'Haifeng Xi',
        designation: 'CTO, Bianjie',
    }, {
        image: judge3,
        name: 'Shane Vitarana',
        designation: 'Co-founder, Stargaze',
    }, {
        image: judge4,
        name: 'Jake Hartnell',
        designation: 'Co-founder, Juno/DAO DAO',
    }, {
        image: judge5,
        name: 'Brian Xin',
        designation: 'Founder, Uptick Network',
    }, {
        image: judge7,
        name: 'Dayakar Reddy',
        designation: 'Founder, OmniFlix Network',
    }, {
        image: judge8,
        name: 'Sijie Han',
        designation: 'Solution Architect, AWS',
    }, {
        image: judge9,
        name: '0xUncleLee.Lalaland',
        designation: 'Startup Ecosystem Evangelist, AWS',
    }, {
        image: judge10,
        name: 'Jeffrey Hu',
        designation: 'Tech Lead, HashKey Capital',
    }, {
        image: judge11,
        name: 'Johanna',
        designation: 'Associate, IDG Capital',
    }];

    return (
        <div className="partners">
            <div className="partner_bg">
                <div className="header">
                    <p>{variables[props.lang]['ecosystem_partners']}</p>
                </div>
                <div className="list">
                    {ecosystem.map((item, index) => (
                        <img key={index} alt={index + 'index'} src={item.image}/>
                    ))}
                </div>
                <div className="header">
                    <p>{variables[props.lang]['institution_partner']}</p>
                </div>
                <div className="list">
                    {institution.map((item, index) => (
                        <img key={index} alt={index + 'index'} src={item.image}/>
                    ))}
                </div>
                <div className="header">
                    <p>{variables[props.lang]['tech_initiator']}</p>
                </div>
                <div className="list">
                    <img alt="bianjie" src={bianjie}/>
                </div>
            </div>
            <div className="header">
                <p>{variables[props.lang]['judges_mentors']}</p>
            </div>
            <div className="list judges_list">
                {judges.map((item, index) => (
                    <div key={index} className="judge_info">
                        <img alt={item.name} src={item.image}/>
                        <div>
                            <p className="name">{item.name}</p>
                            <p className="designation">{item.designation}</p>
                        </div>
                        <div className="shadow">
                            <img alt="shadow" src={shadow}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

Partners.propTypes = {
    lang: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

export default connect(stateToProps)(Partners);
