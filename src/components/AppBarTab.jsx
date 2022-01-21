import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    flexGrow: 1,
    flexBasis: 0,
  },
  link: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

const AppBarTab = ({ title, navigateTo }) => {
  return (
    <Pressable style={styles.tab}>
      <Link style={styles.link} to={navigateTo}>
        <Text color='textLight' fontWeight='bold' fontSize='subheading'>
          {title}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
