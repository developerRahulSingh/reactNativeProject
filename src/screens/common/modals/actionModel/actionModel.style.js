import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../styles/common.style';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  screenContainer: {
    ...commonStyle.modalScreenContainer,
    backgroundColor: commonTheme.COLOR_DEFAULT + '7F',
    justifyContent: 'flex-end',
  },
  mainContainer: {
    ...commonStyle.modalContainer,
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
  },
  selectMessageText: {
    margin: 16,
    textAlign: 'center',
  },
  itemsContainer: {
    flexDirection: 'row',
    paddingBottom: 32,
  },
  itemMainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  itemImageStyle: {
    width: 72,
    height: 72,
  },
});

export { componentStyle };
