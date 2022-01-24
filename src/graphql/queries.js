import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      totalCount
      edges {
        cursor
        node {
          ...RepositoryFields
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
`;

export const ME = gql`
  query {
    me {
      username
      id
    }
  }
`;
