import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBg,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexDirection: 'row', flexGrow: 1 }}
        horizontal
      >
        <AppBarTab title='Repositories' navigateTo='/' />
        <AppBarTab title='Repositories' navigateTo='/' />
        <AppBarTab title='Sign in' navigateTo='/signIn' />
      </ScrollView>
    </View>
  );
};

export default AppBar;
