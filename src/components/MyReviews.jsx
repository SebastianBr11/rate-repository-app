import { useQuery } from '@apollo/client';
import { FlatList } from 'react-native';
import { ME } from '../graphql/queries';
import ItemSeparator from './common/ItemSeparator';
import ReviewItem from './ReviewItem';

const MyReviewsContainer = ({ reviews, onEndReached }) => {
  const reviewNodes = reviews ? reviews.edges.map(edge => edge.node) : [];
  console.log(reviewNodes);
  return (
    <FlatList
      data={reviewNodes}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={{ repoName: item.repository.fullName, ...item }} />
      )}
    />
  );
};

const MyReviews = () => {
  const { data, fetchMore, loading } = useQuery(ME, {
    variables: { includeReviews: true, first: 8 },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;
    console.log(loading, data?.me.reviews.pageInfo.hasNextPage);
    if (!canFetchMore) return;
    console.log('fetching more');

    fetchMore({
      variables: {
        includeReviews: true,
        first: 2,
        after: data.me.reviews.pageInfo.endCursor,
      },
    });
  };

  const onEndReached = handleFetchMore();

  return (
    <MyReviewsContainer
      onEndReached={onEndReached}
      reviews={data?.me.reviews}
    />
  );
};

export default MyReviews;
