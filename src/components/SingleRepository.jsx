import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import ItemSeparator from './common/ItemSeparator';
import Text from './common/Text';
import useRepository from '../hooks/useRepository';

const SingleRepositoryContainer = ({ repository, onEndReached }) => {
  const reviewNodes = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() =>
        repository ? <RepositoryItem item={repository} showLinkButton /> : null
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data, error, fetchMore } = useRepository({ id, first: 5 });

  if (error) {
    console.log(error);
    return <Text>Error</Text>;
  }

  const onEndReached = () => {
    console.log('end reached');
    fetchMore();
  };

  return (
    <SingleRepositoryContainer
      onEndReached={onEndReached}
      repository={data?.repository}
    />
  );
};

export default SingleRepository;
