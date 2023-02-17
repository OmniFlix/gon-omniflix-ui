import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import Info from './Info';
import NFTsTable from '../Dashboard/Tables/NFTsTable';
import ChainPopover from '../Dashboard/ChainPopover';
import Tabs from '../Dashboard/Tabs';
import { Button } from '@mui/material';
import variables from '../../utils/variables';
import '../Dashboard/index.css';
import { fetchCollectionNFTS } from '../../actions/collection';
import withRouter from '../../components/WithRouter';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '../../config';
import CircularProgress from '../../components/CircularProgress';
import NoData from '../../components/NoData';
import DotsLoading from '../../components/DotsLoading';

class SingleCollection extends Component {
    componentDidMount () {
        if (this.props.router && this.props.router.params && this.props.router.params.id && !this.props.inProgress) {
            this.props.fetchCollectionNFTS(this.props.router.params.id, DEFAULT_SKIP, DEFAULT_LIMIT);
        }
    }

    render () {
        return (
            <div className="home single_collection scroll_bar">
                <ChainPopover/>
                <p className="border"/>
                <div className="header">
                    <div className="left_section">
                        <Tabs/>
                    </div>
                    <div className="center_section">
                        <span>
                            {this.props.tabValue && this.props.tabValue.replace(/_/g, ' ')}
                            {'    /  '}
                        </span>
                        {this.props.inProgress
                            ? <DotsLoading/>
                            : this.props.collection && this.props.collection.denom
                                ? <p>{this.props.collection.denom.symbol}</p> : null}
                    </div>
                    <div className="right_section">
                        <Button>
                            {variables[this.props.lang]['create_collection']}
                        </Button>
                        <Button>
                            {variables[this.props.lang]['create_nft']}
                        </Button>
                    </div>
                </div>
                {this.props.inProgress
                    ? <CircularProgress/>
                    : this.props.collection && this.props.collection.denom
                        ? <>
                            <Info/>
                            <div className="data_table nfts_table">
                                <NFTsTable/>
                            </div>
                        </> : <NoData/>}
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
        params: PropTypes.shape({
            id: PropTypes.string,
        }).isRequired,
    }).isRequired,
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
};

export default withRouter(connect(stateToProps, actionToProps)(SingleCollection));
