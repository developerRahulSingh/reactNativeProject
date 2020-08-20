import { StyleSheet } from 'react-native';
import fontFamilyStyles from '../../styles/font.style';
import commonTheme from '../../themes/common.theme';

const pageStyle = StyleSheet.create({
  mainContainer: {
    backgroundColor: commonTheme.COLOR_DARK,
  },
  scrollViewStyle: {
    paddingHorizontal: 32,
  },
  section: {
    paddingBottom: 8,
  },
  sectionHeadingContainer: {
    marginVertical: 8,
  },
  sectionHeadingTextStyle: {
    ...fontFamilyStyles.mediumText,
    color: commonTheme.COLOR_PRIMARY_DARK,
  },
  descriptionTextStyle: {
    color: commonTheme.COLOR_HINT,
    fontSize: commonTheme.TEXT_SIZE_SMALL,
  },
  referralCodeInfoContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  referralCodeContainer: {
    borderColor: commonTheme.COLOR_SECONDARY,
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 2,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  investEarnContainer: {
    borderBottomColor: commonTheme.COLOR_LIGHT,
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  actionButtonContainer: {
    paddingVertical: 16,
  },
  cardImageStyle: {
    paddingHorizontal: 64,
    alignSelf: 'center',
    height: 130,
    width: '100%',
  },
  reserveNowButtonStyle: {
    paddingVertical: 8,
  },
  referralCodeTextStyle: {
    color: commonTheme.COLOR_HINT,
    fontSize: commonTheme.TEXT_SIZE_SMALL,
    paddingBottom: 8,
  },
  referralCodeCopyButtonContainer: {
    margin: 4,
    padding: 8,
    position: 'absolute',
    right: 0,
    zIndex: 10,
  },
  referralCodeCopyButtonImageStyle: {
    height: 20,
    tintColor: commonTheme.COLOR_PRIMARY,
    width: 20,
  },
  referralCodeValueTextStyle: {
    color: commonTheme.COLOR_SECONDARY,
    fontSize: commonTheme.TEXT_SIZE_EXTRA_LARGE,
    paddingHorizontal: 4,
  },
});

export { pageStyle };
