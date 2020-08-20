import { StyleSheet } from 'react-native';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';

const pageStyle = StyleSheet.create({
  profileUserImageStyle: {
    height: 130,
    width: 130,
  },
  keyboardScrollViewContentContainer: {
    alignItems: 'center',
  },
  profileImageMainContainer: {
    ...commonStyle.contentCenter,
    height: 128,
    margin: 8,
    width: 128,
  },
  profileImageContainer: {
    borderColor: commonTheme.COLOR_SECONDARY,
    borderRadius: 69,
    overflow: 'hidden',
  },
  cameraImageMainContainer: {
    bottom: 0,
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
  },
  cameraImageSubContainer: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderRadius: 20,
  },
  cameraImageStyle: {
    height: 40,
    tintColor: commonTheme.COLOR_PRIMARY,
    width: 40,
  },
  buttonsContainer: {
    padding: 16,
  },
});

export { pageStyle };
