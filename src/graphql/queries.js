import { gql } from '@apollo/client';
import { PAGE_INFO, REPOSITORY_FIELDS, REVIEW_FIELDS } from './fragments';

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
      pageInfo {
        ...PageInfoFields
      }
    }
  }
  ${REPOSITORY_FIELDS}
  ${PAGE_INFO}
`;

export const GET_REPOSITORIES_ORDERED = gql`
  query Repositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      edges {
        cursor
        node {
          ...RepositoryFields
        }
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  }
  ${REPOSITORY_FIELDS}
  ${PAGE_INFO}
`;

export const GET_REPOSITORY_BY_ID = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      ...RepositoryFields
      url
    }
  }
  ${REPOSITORY_FIELDS}
`;

export const GET_REVIEWS_BY_ID = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          ...PageInfoFields
        }
      }
    }
  }

  ${PAGE_INFO}
`;

export const ME = gql`
  query Me($includeReviews: Boolean = false, $first: Int, $after: String) {
    me {
      username
      id
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        ...ReviewFields
      }
    }
  }
  ${REVIEW_FIELDS}
`;
