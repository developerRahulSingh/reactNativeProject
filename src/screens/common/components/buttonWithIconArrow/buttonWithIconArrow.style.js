import { StyleSheet } from 'react-native';
import fontFamilyStyles from '../../../../styles/font.style';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: commonTheme.COLOR_FADED,
    flexDirection: 'row',
    minHeight: 64,
    width: '100%',
  },
  iconStyle: {
    height: 24,
    margin: 16,
    marginEnd: 0,
    tintColor: commonTheme.COLOR_PRIMARY,
    width: 24,
  },
  textArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  textStyle: {
    color: commonTheme.COLOR_DEFAULT,
    fontSize: commonTheme.TEXT_SIZE_MEDIUM,
    textAlignVertical: 'center',
  },
  subTitleStyle: {
    color: commonTheme.COLOR_PRIMARY_DARK,
    fontSize: commonTheme.TEXT_SIZE_SMALL,
    textAlignVertical: 'center',
  },
  imgArrow: {
    height: 16,
    margin: 16,
    tintColor: commonTheme.COLOR_PRIMARY,
    width: 16,
  },
  subTitleAdditionalTextStyle: {
    ...fontFamilyStyles.smallText,
    color: commonTheme.COLOR_SECONDARY + 'CF',
  },
});

export { componentStyle };
