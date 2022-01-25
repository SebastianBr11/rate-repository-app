import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import Button from './Button';
import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
  view: {
    padding: 20,
    backgroundColor: '#fff',
  },
});

export const SignInContainer = ({ onSubmit }) => (
  <Formik
    initialValues={{ username: '', password: '' }}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => (
      <View style={styles.view}>
        <FormikTextInput name='username' placeholder='Username' />
        <FormikTextInput
          secureTextEntry
          name='password'
          placeholder='Password'
        />
        <Button onPress={handleSubmit} text='Sign In' />
      </View>
    )}
  </Formik>
);

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async values => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
