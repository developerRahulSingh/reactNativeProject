import { Platform, StatusBar, StyleSheet } from 'react-native';
import commonUtil from '../../../../utils/common.util';

const notchHeight = commonUtil.isDeviceHasNotch() ? Platform.OS === 'ios' ? 44 - 8 : StatusBar.currentHeight : 0;

const componentStyle = StyleSheet.create({
  container: {
    height: notchHeight,
    width: '100%',
  },
});

export { componentStyle };
