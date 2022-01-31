import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBg,
  },
  // ...
});

const AppBar = () => {
  const { data } = useQuery(ME, { fetchPolicy: 'cache-and-network' });
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const onPress = async () => {
    console.log('logging out');
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
        }}
        horizontal
      >
        <AppBarTab title='Repositories' navigateTo='/' />
        {!data?.me ? (
          <>
            <AppBarTab title='Sign in' navigateTo='/signIn' />
            <AppBarTab title='Sign up' navigateTo='/signUp' />
          </>
        ) : (
          <>
            <AppBarTab title='Create a review' navigateTo='/createReview' />
            <AppBarTab title='My reviews' navigateTo='/myReviews' />
            <AppBarTab
              onPress={onPress}
              title='Sign out'
              navigateTo='/signIn'
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
