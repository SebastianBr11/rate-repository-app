import { useApolloClient, useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(LOGIN);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    console.log('bl', username, password);
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
