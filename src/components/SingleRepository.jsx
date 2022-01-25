import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });
  if (loading) return <Text>Loading...</Text>;

  if (error) {
    console.log(error);
    return <Text>Error</Text>;
  }

  console.log(data);

  return <RepositoryItem item={data.repository} showLinkButton />;
};

export default SingleRepository;
