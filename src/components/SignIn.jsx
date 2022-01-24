import { Formik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

const styles = StyleSheet.create({
  view: {
    padding: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = ({ onSubmit }) => {
  return (
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
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text color='textLight' fontSize='subheading'>
              Sign In
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
