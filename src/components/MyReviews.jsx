import { FlatList } from 'react-native';
import useProfile from '../hooks/useProfile';
import ItemSeparator from './common/ItemSeparator';
import ReviewItem from './ReviewItem';

const MyReviewsContainer = ({ reviews, onEndReached }) => {
  const reviewNodes = reviews ? reviews.edges.map(edge => edge.node) : [];
  return (
    <FlatList
      data={reviewNodes}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          showActions
          review={{ repoName: item.repository.fullName, ...item }}
        />
      )}
    />
  );
};

const MyReviews = () => {
  const { me, fetchMore } = useProfile({ includeReviews: true, first: 8 });

  const onEndReached = fetchMore();

  return (
    <MyReviewsContainer onEndReached={onEndReached} reviews={me?.reviews} />
  );
};

export default MyReviews;
