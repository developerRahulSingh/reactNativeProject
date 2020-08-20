import { StyleSheet } from 'react-native';

const componentStyle = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
  image: {
    height: 24,
    width: 32,
  },
  imageContainer: {
    padding: 8,
  },
});

export { componentStyle };
