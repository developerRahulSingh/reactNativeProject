import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  uploadDocumentDescriptionTextStyle: {
    color: commonTheme.COLOR_FADED,
    fontSize: commonTheme.TEXT_SIZE_SMALL,
    paddingBottom: 16,
    paddingTop: 8,
    textAlign: 'center',
  },
  uploadImageStyle: {
    height: 192,
    width: 192,
  },
  uploadImageContainerStyle: {
    alignSelf: 'center',
  },
  marginBottomStyle: {
    marginBottom: 16,
  },
  paddingHorizontalStyle: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  pageColorStyle: {
    backgroundColor: commonTheme.COLOR_UPLOAD_DOCUMENT_BG,
  },
});

export { pageStyle };
