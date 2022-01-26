import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_REPOSITORIES_ORDERED } from '../graphql/queries';

const useOrderedRepositories = ({ orderDirection, orderBy }) => {
  const [getRepositories, { data, error, loading, refetch }] = useLazyQuery(
    GET_REPOSITORIES_ORDERED,
    {
      fetchPolicy: 'cache-and-network',
    }
  );

  useEffect(() => {
    (async () => {
      await getRepositories({ variables: { orderDirection, orderBy } });
    })();
  }, [orderDirection, orderBy]);

  return { repositories: data?.repositories, loading, error, refetch };
};

export default useOrderedRepositories;
