import { gql } from '@apollo/client';

export const LOGIN = gql`
	mutation Login($credentials: AuthenticateInput) {
		authenticate(credentials: $credentials) {
			accessToken
			expiresAt
		}
	}
`;

export const CREATE_REVIEW = gql`
	mutation CreateReview($review: CreateReviewInput) {
		createReview(review: $review) {
			id
			userId
			repositoryId
			rating
			text
		}
	}
`;
