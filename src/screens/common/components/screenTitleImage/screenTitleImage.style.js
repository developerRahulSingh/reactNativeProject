import { StyleSheet } from 'react-native';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  contentContainer: {
    padding: 8,
  },
  title: {
    flex: 1,
    color: commonTheme.COLOR_DEFAULT,
    fontSize: commonTheme.TEXT_SIZE_LARGE,
    // margin: 8,
    textAlign: 'center',
  },
  description: {
    color: commonTheme.COLOR_DEFAULT,
    fontSize: commonTheme.TEXT_SIZE_SMALL,
    textAlign: 'center',
  },
  descriptionContainer: {
    padding: 16,
  },
  image: {
    height: 100,
    width: 100,
  },
  imageContainer: {
    alignSelf: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    margin: 8,
  },
  titleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
  },
  closeButtonImageStyle: {
    height: 20,
    width: 20,
  },
  closeButtonStyle: {
    padding: 8,
  },
});

export { componentStyle };
