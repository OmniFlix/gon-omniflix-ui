import { gql } from '@apollo/client';

export const GQL_ALL_COLLECTIONS_FETCH_IN_PROGRESS = 'GQL_ALL_COLLECTIONS_FETCH_IN_PROGRESS';
export const GQL_ALL_COLLECTIONS_FETCH_SUCCESS = 'GQL_ALL_COLLECTIONS_FETCH_SUCCESS';
export const GQL_ALL_COLLECTIONS_FETCH_ERROR = 'GQL_ALL_COLLECTIONS_FETCH_ERROR';

export const GET_GQL_COLLECTIONS = gql`
  query getCollections($offset: Int, $limit: Int) {
    collections(
    offset: $offset
    limit: $limit) {
        collections {
            name
            collectionAddr
            image
        }
        offset
        limit
        total
    }
  }
`;
