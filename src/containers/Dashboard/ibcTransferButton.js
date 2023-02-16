import React from 'react';
import { Button } from '@mui/material';
import { config } from '../../config';
import Long from 'long';
import * as PropTypes from 'prop-types';
import { aminoSignTx, initializeChain } from '../../actions/account/wallet';
import withRouter from '../../components/WithRouter';
import { connect } from 'react-redux';
import { fetchTimeoutHeight } from '../../actions/account/IBCTokens';

const IbcTransferButton = (props) => {
    const handleClick = () => {
        props.fetchTimeoutHeight(config.REST_URL, 'channel-0', (result) => {
            const revisionNumber = result && result.proof_height && result.proof_height.revision_number &&
                Long.fromNumber(result.proof_height.revision_number);
            const revisionHeight = result && result.proof_height && result.proof_height.revision_height;

            const Tx = {
                msgs: [{
                    typeUrl: '/ibc.applications.nft_transfer.v1.MsgTransfer',
                    value: {
                        source_port: 'nft-transfer',
                        source_channel: 'channel-0',
                        class_id: 'onftdenom4ce508e776f64d9e8dd4af7367d65844',
                        token_ids: [
                            'onft51a845dc561b42dba43ab01e519b3675',
                        ],
                        sender: 'omniflix1jpudqpydw26r3297dlaj3whecvatyayklk4k9e',
                        receiver: 'iaa1jpudqpydw26r3297dlaj3whecvatyaykh2y7sk',
                        timeout_height: {
                            revisionNumber: revisionNumber || undefined,
                            revisionHeight: Long.fromNumber(parseInt(revisionHeight) + 150) || undefined,
                        },
                        timeout_timestamp: undefined,
                    },
                }],
                fee: {
                    amount: [{
                        amount: String(225000),
                        denom: config.COIN_MINIMAL_DENOM,
                    }],
                    gasLimit: String(450000),
                },
                memo: '',
            };

            props.sign(Tx, props.address, (result, txBytes) => {
                if (result) {
                    const data = {
                        tx_bytes: txBytes,
                        mode: 'BROADCAST_MODE_SYNC',
                    };
                    props.txSignAndBroadCast(data, (res1) => {
                        if (res1 && res1.txhash) {
                            let counter = 0;
                            const time = setInterval(() => {
                                props.fetchTxHash(res1.txhash, (hashResult) => {
                                    if (hashResult) {
                                        if (hashResult.code !== undefined && hashResult.code !== 0) {
                                            props.showMessage(hashResult.logs || hashResult.raw_log, 'error', hashResult && hashResult.hash);
                                        }
                                        props.fetchCollections(props.address, DEFAULT_SKIP, props.collectionSkip + DEFAULT_LIMIT, props.collectionSearch);
                                        props.fetchBalance(props.address);
                                        props.setTxHashInProgressFalse();
                                        clearInterval(time);
                                    }

                                    counter++;
                                    if (counter === 3) {
                                        if (hashResult.code !== undefined && hashResult.code !== 0) {
                                            props.showMessage(hashResult.logs || hashResult.raw_log, 'error', hashResult && hashResult.hash);
                                        }
                                        props.fetchCollections(props.address, DEFAULT_SKIP, props.collectionSkip + DEFAULT_LIMIT, props.collectionSearch);
                                        props.fetchBalance(props.address);
                                        props.setTxHashInProgressFalse();
                                        clearInterval(time);
                                    }
                                });
                            }, 5000);
                        }
                    });
                }
            });
        });
    };

    return (
        <Button onClick={handleClick}>
            IbcTransfer
        </Button>
    );
};

IbcTransferButton.propTypes = {
    address: PropTypes.string.isRequired,
    fetchTimeoutHeight: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.account.wallet.connection.address,
        lang: state.language,
    };
};

const actionToProps = {
    fetchTimeoutHeight,
};

export default connect(stateToProps, actionToProps)(IbcTransferButton);
