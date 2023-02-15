import { IPFS_REFERENCE_PATH, IPFS_URL as URL } from '../config';

export const mediaReference = (link) => {
    let IPFS_URL = localStorage.getItem('gon_of_ipfs_url');
    let hash = null;
    if (link.includes(IPFS_REFERENCE_PATH)) {
        IPFS_URL = URL;
        hash = link.replace(IPFS_REFERENCE_PATH, '');
    } else {
        const array = link.split('/');
        if (IPFS_URL && array && array.length && array[array.length - 2] &&
            (array[array.length - 2] === 'ipfs') && array[array.length - 1]) {
            hash = array[array.length - 1];
        } else if (IPFS_URL && array && array.length === 1) {
            hash = link;
        } else if (array && array.length === 1) {
            IPFS_URL = URL;
            hash = link;
        }
    }

    if (IPFS_URL && hash) {
        return `${IPFS_URL}/${hash}`;
    } else {
        return link;
    }
};
