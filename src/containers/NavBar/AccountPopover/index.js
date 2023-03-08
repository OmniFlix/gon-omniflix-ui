import * as React from 'react';
import variables from '../../../utils/variables';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DotsLoading from '../../../components/DotsLoading';
import { config } from '../../../config';
import omniflixLogo from '../../../assets/tokens/fullLogos/omniflix.svg';
import './index.css';
import CopyButton from '../../../components/CopyButton';
import irisIcon from '../../../assets/chains/iris.svg';
import uptickIcon from '../../../assets/chains/uptick.svg';
import stargazeIcon from '../../../assets/chains/stargaze.svg';
import junoIcon from '../../../assets/chains/juno.svg';

const AccountPopover = (props) => {
    let balance = props.balance && props.balance.length && props.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
    balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

    return (
        <div className="account_popover">
            <div className="section1">
                <h2>{variables[props.lang].account}</h2>
                <div className="card">
                    <div className="row1">
                        <img alt="omniflix" src={omniflixLogo}/>
                        {props.balanceInProgress
                            ? <DotsLoading/>
                            : balance
                                ? <p className="tokens">
                                    {balance} {config.COIN_DENOM}
                                </p>
                                : <p className="tokens">
                                    0 {config.COIN_DENOM}
                                </p>}
                    </div>
                    {props.inProgress && props.address === ''
                        ? <DotsLoading/>
                        : <div className="row2 address_section">
                            <div className="hash_text">
                                <p>{props.address}</p>
                                <span>
                                    {props.address && props.address.slice(props.address.length - 6, props.address.length)}
                                </span>
                            </div>
                            <CopyButton data={props.address}/>
                        </div>}
                </div>
            </div>
            {props.tokenBalance && props.tokenBalance.length > 0
                ? <div className="section2">
                    <h2>{variables[props.lang].tokens}</h2>
                    <div className="list">
                        {props.tokenBalance.map((item, index) => (
                            <div key={index} className="token_info">
                                <div className="left_section">
                                    <div className="token_logo">
                                        {item.chain === 'iris'
                                            ? <img alt="logo" src={irisIcon}/>
                                            : item.chain === 'stargaze'
                                                ? <img alt="logo" src={stargazeIcon}/>
                                                : item.chain === 'uptick'
                                                    ? <img alt="logo" src={uptickIcon}/>
                                                    : item.chain === 'juno'
                                                        ? <img alt="logo" src={junoIcon}/>
                                                        : null}
                                        <span>{item.chain}</span>
                                    </div>
                                    <div className="row2 address_section">
                                        <div className="hash_text">
                                            <p>{item.address}</p>
                                            <span>
                                                {item.address && item.address.slice(item.address.length - 6, item.address.length)}
                                            </span>
                                        </div>
                                        <CopyButton data={item.address}/>
                                    </div>
                                </div>
                                <div className="right_section">
                                    <span>{(item.amount) / (10 ** (item.config && item.config.COIN_DECIMALS))}</span>
                                </div>
                            </div>))}
                    </div>
                </div>
                : null}
        </div>
    );
};

AccountPopover.propTypes = {
    address: PropTypes.string.isRequired,
    balance: PropTypes.array.isRequired,
    balanceInProgress: PropTypes.bool.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    tokenBalance: PropTypes.array.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        lang: state.language,
        balance: state.account.bc.balance.value,
        balanceInProgress: state.account.bc.balance.inProgress,
        inProgress: state.account.wallet.connection.inProgress,

        tokenBalance: state.navBar.tokenBalance.value,
    };
};

export default connect(stateToProps)(AccountPopover);
