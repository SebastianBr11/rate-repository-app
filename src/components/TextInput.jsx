import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: theme.colors.inputBorder,
    marginBottom: 15,
  },
  error: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.input, error && styles.error];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
