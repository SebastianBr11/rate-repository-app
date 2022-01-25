import { FlatList, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import ItemSeparator from './common/ItemSeparator';
import RepositoryItem from './RepositoryItem';

export const RepositoryListContainer = ({ repositories, onPress }) => {
	// Get the nodes from the edges array
	const repositoryNodes = repositories
		? repositories.edges.map(edge => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
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
	const { repositories } = useRepositories();
	const navigate = useNavigate();

	const onPress = id => {
		navigate('/repository/' + id);
	};

	return (
		<RepositoryListContainer onPress={onPress} repositories={repositories} />
	);
};

export default RepositoryList;
