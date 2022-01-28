import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useDebounce } from 'use-debounce/lib';
import { GET_REPOSITORIES_ORDERED } from '../graphql/queries';

const useOrderedRepositories = ({ orderDirection, orderBy, searchQuery }) => {
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [getRepositories, { data, error, loading, refetch }] = useLazyQuery(
    GET_REPOSITORIES_ORDERED,
    {
      fetchPolicy: 'cache-and-network',
    }
  );

  useEffect(() => {
    (async () => {
      await getRepositories({
        variables: { orderDirection, orderBy, searchKeyword: debouncedQuery },
      });
    })();
  }, [orderDirection, orderBy, debouncedQuery]);

  return { repositories: data?.repositories, loading, error, refetch };
};

export default useOrderedRepositories;
