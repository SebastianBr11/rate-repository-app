import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { Menu } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import useOrderedRepositories from '../hooks/useOrderedRepositories';
import theme from '../theme';
import { getSortDescription, getSortSettings } from '../utils';
import Button from './common/Button';
import ItemSeparator from './common/ItemSeparator';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  sortButton: {
    borderRadius: 0,
    paddingVertical: 20,
    backgroundColor: theme.colors.mainBackground,
    alignSelf: 'stretch',
  },
});

const SortingMenu = ({ visible, closeMenu, openMenu, sort, selectSort }) => {
  const { width } = useWindowDimensions();

  const setSort = sort => {
    selectSort(sort);
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={styles.container}
        anchor={{ x: width / 2 + width / 4, y: 120 }}
      >
        <Menu.Item
          onPress={() => setSort('latest')}
          title='Latest repositories'
        />
        <Menu.Item
          onPress={() => setSort('highest')}
          title='Highest rated repositories'
        />
        <Menu.Item
          onPress={() => setSort('lowest')}
          title='Lowest rated repositories'
        />
      </Menu>
      <Button
        style={styles.sortButton}
        text={getSortDescription(sort)}
        onPress={openMenu}
        color={theme.colors.primary}
      />
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  onPress,
  menuVisible,
  openMenu,
  closeMenu,
  sort,
  setSort,
}) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={
        <SortingMenu
          visible={menuVisible}
          closeMenu={closeMenu}
          openMenu={openMenu}
          sort={sort}
          selectSort={setSort}
        />
      }
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPress(item.id)} key={item.id}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [sort, setSort] = useState('latest');

  const { repositories } = useOrderedRepositories(getSortSettings(sort));

  const onPress = id => {
    navigate('/repository/' + id);
  };

  const closeMenu = () => setMenuVisible(false);
  const openMenu = () => setMenuVisible(true);

  return (
    <RepositoryListContainer
      onPress={onPress}
      repositories={repositories}
      menuVisible={menuVisible}
      closeMenu={closeMenu}
      openMenu={openMenu}
      sort={sort}
      setSort={setSort}
    />
  );
};

export default RepositoryList;
