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
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.input];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
