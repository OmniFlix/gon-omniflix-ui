import * as React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import './index.css';
import { setChainValue } from '../../../actions/dashboard';
import { list } from '../../../utils/defaultOptions';
import { Button } from '@mui/material';
import { DEFAULT_SKIP } from '../../../config';
import { fetchAllCollections, fetchCollections } from '../../../actions/collections';

const ChainPopover = (props) => {
    const handleChange = (value) => {
        if (props.tabValue === 'all_collections' && !props.allCollectionsInProgress && value && !props.allCollections[value]) {
            props.fetchAllCollections(value, DEFAULT_SKIP, 500);
        }

        props.setChainValue(value);
    };

    return (
        <div className="chain_popover">
            {list.map((item, index) => (
                <Button
                    key={index}
                    className={props.chain === item.value ? 'active_item list_item' : 'list_item'}
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
    fetchAllCollections: PropTypes.func.isRequired,
    fetchCollections: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    setChainValue: PropTypes.func.isRequired,
    tabValue: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        chain: state.dashboard.chainValue.value,
        collections: state.collections.collectionSList.value,
        collectionsInProgress: state.collections.collectionSList.inProgress,
        allCollections: state.collections.allCollectionSList.value,
        allCollectionsInProgress: state.collections.allCollectionSList.inProgress,
        lang: state.language,
        tabValue: state.dashboard.tabValue.value,
    };
};

const actionsToProps = {
    fetchCollections,
    fetchAllCollections,
    setChainValue,
};

export default connect(stateToProps, actionsToProps)(ChainPopover);
