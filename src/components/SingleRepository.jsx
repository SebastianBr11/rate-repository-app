import { useQuery } from '@apollo/client';
import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY_BY_ID, GET_REVIEWS_BY_ID } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import ItemSeparator from './common/ItemSeparator';
import Text from './common/Text';

const SingleRepository = () => {
	const { id } = useParams();
	const {
		data: repoData,
		loading: repoLoading,
		error: repoError,
	} = useQuery(GET_REPOSITORY_BY_ID, {
		fetchPolicy: 'cache-and-network',
		variables: { id },
	});

	const reviewQuery = useQuery(GET_REVIEWS_BY_ID, {
		fetchPolicy: 'cache-and-network',
		variables: { id },
	});

	if (repoLoading || reviewQuery.loading) return <Text>Loading...</Text>;

	if (repoError || reviewQuery.error) {
		console.log(repoError, reviewQuery.error);
		return <Text>Error</Text>;
	}

	const reviewNodes = reviewQuery.data.repository.reviews.edges.map(
		edge => edge.node
	);

	return (
		<FlatList
			data={reviewNodes}
			keyExtractor={({ id }) => id}
			renderItem={({ item }) => <ReviewItem review={item} />}
			ItemSeparatorComponent={ItemSeparator}
			ListHeaderComponent={() => (
				<RepositoryItem item={repoData.repository} showLinkButton />
			)}
		/>
	);
};

export default SingleRepository;
