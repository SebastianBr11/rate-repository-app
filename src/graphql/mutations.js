import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      expiresAt
    }
  }
`;
