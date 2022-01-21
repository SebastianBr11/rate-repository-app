import { Pressable } from 'react-native';
import Text from './Text';

const AppBarTab = ({ title }) => {
  return (
    <Pressable>
      <Text color='textLight' fontWeight='bold' fontSize='subheading'>
        {title}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
