import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
import Button from './common/Button';
import FormikTextInput from './FormikTextInput';

const validationSchema = yup.object().shape({
	ownerName: yup.string().required('Owner name is required'),
	repositoryName: yup.string().required('Repository name is required'),
	rating: yup.number().required('Rating is required').min(0).max(100),
	text: yup.string().optional(),
});

const styles = StyleSheet.create({
	view: {
		padding: 20,
		backgroundColor: '#fff',
	},
});

export const CreateReviewContainer = ({ onSubmit }) => (
	<Formik
		initialValues={{ username: '', password: '' }}
		onSubmit={onSubmit}
		validationSchema={validationSchema}
	>
		{({ handleSubmit }) => (
			<View style={styles.view}>
				<FormikTextInput name='ownerName' placeholder='Repository owner name' />
				<FormikTextInput name='repositoryName' placeholder='Repository name' />
				<FormikTextInput
					name='rating'
					placeholder='Rating between 0 and 100'
					keyboardType='numeric'
				/>
				<FormikTextInput multiline name='text' placeholder='Review' />
				<Button onPress={handleSubmit} text='Create a review' />
			</View>
		)}
	</Formik>
);

const CreateReview = () => {
	const [createReview] = useCreateReview();
	const navigate = useNavigate();

	const onSubmit = async values => {
		const { repositoryName, ownerName, rating, text } = values;

		try {
			const {
				createReview: { repositoryId },
			} = await createReview({
				repositoryName,
				ownerName,
				rating: parseInt(rating),
				text,
			});
			navigate('/repository/' + repositoryId);
		} catch (e) {
			console.log(e);
		}
	};

	return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
