import dayjs from 'dayjs';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import theme from '../theme';
import Text from './common/Text';
import Button from './common/Button';
import { DELETE_REVIEW } from '../graphql/mutations';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 15,
  },
  text: {
    flexDirection: 'row',
  },
  date: {
    marginTop: 3,
  },
  rating: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  content: {
    marginLeft: 15,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 15,
  },
  mTop: {
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    marginLeft: 15,
  },
  flex: {
    flex: 1,
  },
});

const ReviewItem = ({
  review: { text, rating, createdAt, user, id, repositoryId, repoName },
  showActions = false,
}) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    variables: { id },
    refetchQueries: [ME],
  });
  const onViewRepository = () => {
    navigate(`/repository/${repositoryId}`);
  };

  const onDeleteReview = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
        },
        { text: 'Delete', onPress: deleteReview },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.item}>
      <View style={styles.text}>
        <View style={styles.rating}>
          <Text color='primary' fontWeight='bold' fontSize='subheading'>
            {rating}
          </Text>
        </View>
        <View style={styles.content}>
          <Text fontSize='subheading' fontWeight='bold'>
            {!repoName ? user.username : repoName}
          </Text>
          <Text style={styles.date} color='textSecondary'>
            {dayjs(createdAt).format('DD.MM.YYYY')}
          </Text>
          <Text style={styles.mTop}>{text}</Text>
        </View>
      </View>
      {showActions && (
        <View style={styles.actions}>
          <Button onPress={onViewRepository} style={styles.flex}>
            View Repository
          </Button>
          <Button
            onPress={onDeleteReview}
            style={[styles.deleteButton, styles.flex]}
          >
            Delete review
          </Button>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
