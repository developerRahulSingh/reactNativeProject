import { StyleSheet } from 'react-native';

const alignItemsAndJustifyContentCenter = {
  alignItems: 'center',
  justifyContent: 'center',
};

const commonStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomButtonContainer: {
    padding: 32,
  },
  keyboardScrollViewContentContainer: {
    flexGrow: 1,
  },
  switchInnerCircleStyle: {
    ...alignItemsAndJustifyContentCenter,
    height: 16,
    width: 16,
  },
  contentCenter: {
    ...alignItemsAndJustifyContentCenter,
  },
  modalContainer: {
    flexShrink: 1,
    overflow: 'hidden',
    width: '100%',
  },
  modalScreenContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

export { commonStyle };
