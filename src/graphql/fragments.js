import { gql } from '@apollo/client';

export const REPOSITORY_FIELDS = gql`
  fragment RepositoryFields on Repository {
    id
    fullName
    stargazersCount
    description
    language
    forksCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`;

export const PAGE_INFO = gql`
  fragment PageInfoFields on PageInfo {
    hasNextPage
    endCursor
    startCursor
  }
`;

export const REVIEW_FIELDS = gql`
  fragment ReviewFields on ReviewConnection {
    pageInfo {
      hasNextPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        text
        createdAt
        rating
        repositoryId
        userId
        repository {
          fullName
        }
        id
      }
    }
  }
`;
