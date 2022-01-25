import { Image, Linking, StyleSheet, View } from 'react-native';
import theme from '../theme';
import { roundOverThousand } from '../utils';
import Button from './common/Button';
import Text from './common/Text';

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
		flex: 1,
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
		marginTop: 10,
		padding: 5,
		backgroundColor: theme.colors.primary,
		flexGrow: 0,
		alignSelf: 'flex-start',
		borderRadius: 5,
	},
	image: {
		borderRadius: 5,
	},
	description: {
		marginTop: 5,
	},
	button: {
		marginTop: 20,
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
		...restItem
	},
	showLinkButton,
}) => {
	const buttonHandler = () => {
		if (showLinkButton) {
			Linking.openURL(restItem.url);
		}
	};

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
					<Text
						color='textSecondary'
						style={styles.description}
						fontSize='subheading'
					>
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
			{showLinkButton && (
				<Button
					text='Open in GitHub'
					onPress={buttonHandler}
					style={styles.button}
				/>
			)}
		</View>
	);
};

export default RepositoryItem;
