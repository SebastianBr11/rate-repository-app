import { Dimensions, Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    width: Dimensions.get('screen').width * 0.5,
  },
  link: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});

const AppBarTab = ({ title, navigateTo, onPress }) => {
  return (
    <Pressable style={styles.tab}>
      <Link onPress={onPress} style={styles.link} to={navigateTo}>
        <Text color='textLight' fontWeight='bold' fontSize='subheading'>
          {title}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
