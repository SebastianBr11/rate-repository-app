import { useQuery } from '@apollo/client';
import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY_BY_ID, GET_REVIEWS_BY_ID } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import ItemSeparator from './common/ItemSeparator';
import Text from './common/Text';
import { useMemo } from 'react';

const SingleRepositoryContainer = ({ reviews, repoData, onEndReached }) => {
  const reviewNodes = reviews?.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviewNodes}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() =>
        repoData ? (
          <RepositoryItem item={repoData.repository} showLinkButton />
        ) : null
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

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
    variables: { id, first: 5 },
  });

  const loading = useMemo(
    () => repoLoading && reviewQuery.loading,
    [repoLoading, reviewQuery.loading]
  );

  if (loading) return <Text>Loading...</Text>;

  if (repoError || reviewQuery.error) {
    console.log(repoError, reviewQuery.error);
    return <Text>Error</Text>;
  }

  const onEndReached = () => {
    const canFetchMore =
      !loading && reviewQuery.data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    reviewQuery.fetchMore({
      variables: {
        id,
        first: 2,
        after: reviewQuery.data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return (
    <SingleRepositoryContainer
      onEndReached={onEndReached}
      repoData={repoData}
      reviews={reviewQuery.data?.repository.reviews}
    />
  );
};

export default SingleRepository;
