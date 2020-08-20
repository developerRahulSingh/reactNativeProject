import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../styles/common.style';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  backdrop: {
    ...commonStyle.contentCenter,
    ...commonStyle.modalScreenContainer,
    backgroundColor: commonTheme.COLOR_DEFAULT + '7F',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  container: {
    ...commonStyle.modalContainer,
    backgroundColor: commonTheme.COLOR_TRANSPARENT,
    borderRadius: 16,
  },
  listView: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    paddingHorizontal: 16,
  },
  closeButton: {
    backgroundColor: commonTheme.COLOR_PRIMARY_DARK,
    borderRadius: 16,
    end: 0,
    margin: 8,
    padding: 8,
    position: 'absolute',
    top: 0,
  },
  buttonStyle: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  titleCloseButtonContainer: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    height: 40,
    justifyContent: 'center',
  },
  titleContainer: {
    paddingHorizontal: 8,
  },
  titleTextStyle: {
    color: commonTheme.COLOR_PRIMARY_DARK,
    textAlign: 'center',
  },
  closeButtonImage: {
    height: 8,
    tintColor: commonTheme.COLOR_BRIGHT,
    width: 8,
  },
  messageMainContainer: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    flexShrink: 1,
    paddingVertical: 8,
  },
  messageSubContainer: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 96,
  },
  messageTextStyle: {
    textAlign: 'center',
  },
  messageDebugContainer: {
    padding: 16,
  },
});

export { componentStyle };
