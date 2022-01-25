import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';
import Button from './common/Button';
import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
	view: {
		padding: 20,
		backgroundColor: '#fff',
	},
});

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required')
		.min(1, 'Username must be at least 1 character long')
		.max(30, 'Username must be at most 30 characters long'),
	password: yup
		.string()
		.required('Password is required')
		.min(5, 'Password must be at least 5 character long')
		.max(50, 'Password must be at most 50 characters long'),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Password confirmation is required'),
});

export const SignUpContainer = ({ onSubmit }) => (
	<Formik
		initialValues={{ username: '', password: '', passwordConfirm: '' }}
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
				<FormikTextInput
					secureTextEntry
					name='passwordConfirm'
					placeholder='Password confirmation'
				/>
				<Button onPress={handleSubmit} text='Sign In' />
			</View>
		)}
	</Formik>
);

const SignUp = () => {
	const [signIn] = useSignIn();
	const [signUp] = useSignUp();
	const navigate = useNavigate();

	const onSubmit = async values => {
		const { username, password } = values;

		try {
			await signUp({ username, password });
			await signIn({ username, password });
			navigate('/');
		} catch (e) {
			console.log(e);
		}
	};

	return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
