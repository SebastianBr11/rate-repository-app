import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useDebounce } from 'use-debounce/lib';
import { GET_REPOSITORIES_ORDERED } from '../graphql/queries';

const useRepositories = variables => {
  const [debouncedQuery] = useDebounce(variables?.searchQuery, 500);
  const { data, error, loading, refetch, fetchMore } = useQuery(
    GET_REPOSITORIES_ORDERED,
    {
      fetchPolicy: 'cache-and-network',
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        ...variables,
        searchQuery: debouncedQuery,
        after: data.repositories.pageInfo.endCursor,
      },
    });
  };

  useEffect(() => {
    (async () => {
      await refetch({ ...variables, searchKeyword: debouncedQuery });
    })();
  }, [variables?.orderDirection, variables?.orderBy, debouncedQuery]);

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    error,
    refetch,
  };
};

export default useRepositories;
