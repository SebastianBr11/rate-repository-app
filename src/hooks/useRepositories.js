import { useQuery } from '@apollo/client';
// import { useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  // useEffect(() => console.log(data), [loading]);

  return { repositories: data?.repositories, loading, error, refetch };
};

export default useRepositories;
