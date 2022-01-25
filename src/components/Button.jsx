import { Pressable, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});

const Button = ({ onPress, children, text, style, ...props }) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress} {...props}>
      <Text color='textLight' fontSize='subheading'>
        {children || text}
      </Text>
    </Pressable>
  );
};

export default Button;
