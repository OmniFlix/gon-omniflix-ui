import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import Info from './Info';
import NFTsTable from '../Dashboard/Tables/NFTsTable';
import variables from '../../utils/variables';
import '../Dashboard/index.css';
import { fetchCollectionNFTS } from '../../actions/collection';
import withRouter from '../../components/WithRouter';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '../../config';
import CircularProgress from '../../components/CircularProgress';
import NoData from '../../components/NoData';
import DotsLoading from '../../components/DotsLoading';
import { setTabValue } from '../../actions/dashboard';
import TransferDialog from './TransferDialog';
import BurnDialog from './BurnDialog';

class SingleCollection extends Component {
    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount () {
        if (this.props.router && this.props.router.params && this.props.router.params.id && !this.props.inProgress) {
            const result = this.props.router.params.id.replace('_', '/');
            this.props.fetchCollectionNFTS(result, DEFAULT_SKIP, DEFAULT_LIMIT);
        }
    }

    handleClick () {
        this.props.setTabValue(this.props.tabValue);
        this.props.router.navigate('/dashboard');
    }

    render () {
        return (
            <div className="home single_collection scroll_bar">
                <div className="breadcrumb">
                    <p onClick={this.handleClick}>{variables[this.props.lang].collections}{' '}</p>
                    <span>/</span>
                    {this.props.inProgress
                        ? <DotsLoading/>
                        : this.props.collection && this.props.collection.denom
                            ? <div>{this.props.collection.denom.symbol}</div> : null}
                </div>
                {this.props.inProgress
                    ? <CircularProgress/>
                    : this.props.collection && this.props.collection.denom
                        ? <div className="coll_page">
                            <Info/>
                            <div className="data_table nfts_table">
                                <NFTsTable/>
                            </div>
                        </div> : <NoData/>}
                <TransferDialog />
                <BurnDialog />
            </div>
        );
    }
}

SingleCollection.propTypes = {
    address: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    fetchCollectionNFTS: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        params: PropTypes.shape({
            id: PropTypes.string,
        }).isRequired,
    }).isRequired,
    setTabValue: PropTypes.func.isRequired,
    tabValue: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        collection: state.collection.collection.value,
        inProgress: state.collection.collection.inProgress,
        lang: state.language,
        tabValue: state.dashboard.tabValue.value,
    };
};

const actionToProps = {
    fetchCollectionNFTS,
    setTabValue,
};

export default withRouter(connect(stateToProps, actionToProps)(SingleCollection));
