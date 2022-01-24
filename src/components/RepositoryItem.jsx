import { Image, StyleSheet, View } from 'react-native';
import theme from '../theme';
import { roundOverThousand } from '../utils';
import Text from './Text';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 15,
  },
  top: {
    flexDirection: 'row',
  },
  topContent: {
    paddingLeft: 20,
  },
  bottomContent: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  attribute: {
    alignItems: 'center',
  },
  badge: {
    marginTop: 5,
    padding: 5,
    backgroundColor: theme.colors.primary,
    flexGrow: 0,
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  image: {
    borderRadius: 5,
  },
});

const RepositoryItem = ({
  item: {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  },
}) => {
  return (
    <View testID='repositoryItem' style={styles.item}>
      <View style={styles.top}>
        <Image
          style={styles.image}
          source={{ uri: ownerAvatarUrl, width: 50, height: 50 }}
        />
        <View style={styles.topContent}>
          <Text fontWeight='bold' fontSize='heading'>
            {fullName}
          </Text>
          <Text color='textSecondary' fontSize='subheading'>
            {description}
          </Text>
          <Text style={styles.badge} color='textLight'>
            {language}
          </Text>
        </View>
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.attribute}>
          <Text fontWeight='bold'>{roundOverThousand(stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.attribute}>
          <Text fontWeight='bold'>{roundOverThousand(forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.attribute}>
          <Text fontWeight='bold'>{roundOverThousand(reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.attribute}>
          <Text fontWeight='bold'>{roundOverThousand(ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
