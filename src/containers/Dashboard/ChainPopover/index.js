import * as React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import './index.css';
import { setChainValue, setTabValue } from '../../../actions/dashboard';
import { list } from '../../../utils/defaultOptions';
import { Button } from '@mui/material';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '../../../config';
import { fetchAllCollections, fetchCollections } from '../../../actions/collections';
import { setRpcClient } from '../../../actions/query';
import withRouter from '../../../components/WithRouter';
import { ChainsList } from '../../../chains';
import { fetchContracts } from '../../../actions/cosmwasm';

const ChainPopover = (props) => {
    const handleChange = (value) => {
        const config = ChainsList && ChainsList[value];
        if (config && config.cosmwasm) {
            props.setChainValue(value);
            props.router.navigate(`/${value}/dashboard`);
            if (props.contracts && !props.contracts[value]) {
                props.fetchContracts(config, value);
            }
            return;
        }

        props.router.navigate(`/${value}/dashboard`);
        if (props.rpcClient && props.rpcClient[value]) {
            handleFetch(value, props.rpcClient[value]);
        } else {
            props.setRpcClient(value, (rpcClient) => {
                handleFetch(value, rpcClient);
            });
        }
    };

    const handleFetch = (value, rpcClient) => {
        if (props.tabValue === 'my_collections' && value !== 'omniflix') {
            props.setChainValue(value);
            props.setTabValue('all_collections');
            if (!props.allCollectionsInProgress && value && !props.allCollections[value]) {
                props.fetchAllCollections(rpcClient, value, DEFAULT_SKIP, DEFAULT_LIMIT);
            }

            return;
        }

        if (props.tabValue === 'all_collections' && !props.allCollectionsInProgress && value && !props.allCollections[value]) {
            props.fetchAllCollections(rpcClient, value, DEFAULT_SKIP, DEFAULT_LIMIT);
        }

        props.setChainValue(value);
    };

    return (
        <div className="chain_popover">
            {list.map((item, index) => (
                <Button
                    key={index}
                    className={props.chain === item.value ? 'active_item list_item' : 'list_item'}
                    disabled={item.value === 'osmosis' || item.value === 'juno'}
                    onClick={() => handleChange(item.value)}>
                    <img alt={item.icon} src={item.icon}/>
                    {item.name}
                </Button>))}
        </div>
    );
};

ChainPopover.propTypes = {
    allCollections: PropTypes.object.isRequired,
    allCollectionsInProgress: PropTypes.bool.isRequired,
    chain: PropTypes.string.isRequired,
    collections: PropTypes.object.isRequired,
    collectionsInProgress: PropTypes.bool.isRequired,
    contracts: PropTypes.object.isRequired,
    fetchAllCollections: PropTypes.func.isRequired,
    fetchCollections: PropTypes.func.isRequired,
    fetchContracts: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    rpcClient: PropTypes.any.isRequired,
    setChainValue: PropTypes.func.isRequired,
    setRpcClient: PropTypes.func.isRequired,
    setTabValue: PropTypes.func.isRequired,
    tabValue: PropTypes.string.isRequired,
    router: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }),
};

const stateToProps = (state) => {
    return {
        allCollections: state.collections.allCollectionSList.value,
        allCollectionsInProgress: state.collections.allCollectionSList.inProgress,
        chain: state.dashboard.chainValue.value,
        collections: state.collections.collectionSList.value,
        collectionsInProgress: state.collections.collectionSList.inProgress,
        contracts: state.cosmwasm.contracts.value,
        lang: state.language,
        rpcClient: state.query.rpcClient.value,
        tabValue: state.dashboard.tabValue.value,
    };
};

const actionsToProps = {
    fetchAllCollections,
    fetchCollections,
    fetchContracts,
    setChainValue,
    setRpcClient,
    setTabValue,
};

export default withRouter(connect(stateToProps, actionsToProps)(ChainPopover));
