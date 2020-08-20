import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../styles/common.style';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  descriptionTextContainer: {
    padding: 16,
  },
  textAlignCenterStyle: {
    textAlign: 'center',
  },
  descriptionBoldTextStyle: {
    color: commonTheme.COLOR_DEFAULT,
    fontSize: commonTheme.TEXT_SIZE_SMALL,
  },
  backdrop: {
    ...commonStyle.contentCenter,
    ...commonStyle.modalScreenContainer,
    backgroundColor: commonTheme.COLOR_DEFAULT + '7F',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  container: {
    ...commonStyle.modalContainer,
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderRadius: 16,
  },
  listView: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    paddingHorizontal: 16,
  },
  buttonStyle: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  messageMainContainer: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    flexShrink: 1,
    paddingVertical: 8,
  },
  labelInfoComponentStyle: {
    marginBottom: 16,
  },
  valueContainerWithoutCopy: {
    flexDirection: 'row',
    padding: 8,
  },
  valueTextStyle: {
    flex: 1,
    textAlign: 'right',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: commonTheme.COLOR_FADED,
  },
  valueContainer: {
    flexDirection: 'row',
    paddingStart: 8,
    paddingEnd: 4,
    paddingVertical: 4,
    alignItems: 'center',
  },
  valueCopyContainer: {
    marginStart: 4,
    padding: 4,
  },
  copyImageStyle: {
    width: 24,
    height: 24,
  },
  upiBankContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  upiContainerStyle: {
    flex: 1,
    alignItems: 'flex-end',
  },
  switchContentContainerStyle: {
    marginHorizontal: 8,
  },
  bankContainerStyle: {
    flex: 1,
    alignItems: 'flex-start',
  },
  urlContainerStyle: {
    marginBottom: 8,
    borderColor: commonTheme.COLOR_FADED,
    borderWidth: 1,
    borderRadius: 8,
  },
});

export { componentStyle };
