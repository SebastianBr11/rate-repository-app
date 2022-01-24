import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    console.log('bl', username, password);
    const result = await mutate({
      variables: { credentials: { username, password } },
    });
    return result;
  };

  return [signIn, result];
};

export default useSignIn;
