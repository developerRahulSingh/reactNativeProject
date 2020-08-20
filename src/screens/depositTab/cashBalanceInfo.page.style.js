import { StyleSheet } from 'react-native';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';

const pageStyle = StyleSheet.create({
  cashBalanceLabelViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: commonTheme.COLOR_HINT,
  },
  textColor: {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
  },
  marginEnd: {
    marginEnd: 8,
  },
  bottomButtonContainerStyle: {
    ...commonStyle.bottomButtonContainer,
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  descriptionTextStyle: {
    textAlign: 'center',
    padding: 16,
    fontSize: commonTheme.TEXT_SIZE_MEDIUM,
    color: commonTheme.PRIMARY_TEXT_COLOR_LIGHT,
  },
});

export { pageStyle };
