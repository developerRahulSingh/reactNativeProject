import { Dimensions, StyleSheet } from 'react-native';

const pageStyle = StyleSheet.create({
  webViewContainerStyle: {
    height: Dimensions.get('window').height - 100,
  },
});

export { pageStyle };
