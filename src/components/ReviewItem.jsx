import dayjs from 'dayjs';
import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
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
  mTop: {
    marginTop: 5,
  },
});

const ReviewItem = ({ review: { text, rating, createdAt, user } }) => {
  return (
    <View style={styles.item}>
      <View style={styles.rating}>
        <Text color='primary' fontWeight='bold' fontSize='subheading'>
          {rating}
        </Text>
      </View>
      <View style={styles.content}>
        <Text fontSize='subheading' fontWeight='bold'>
          {user.username}
        </Text>
        <Text color='textSecondary'>
          {dayjs(createdAt).format('DD.MM.YYYY')}
        </Text>
        <Text style={styles.mTop}>{text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
