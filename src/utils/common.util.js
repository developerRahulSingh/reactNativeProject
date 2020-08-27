//Please add an common utility methods here
import React from 'react';
import { Dimensions, Platform, StatusBar } from 'react-native';

let Freshchat = (Platform.OS === 'ios') ? require('react-native-freshchat-sdk') : null;


const commonUtil = {
  languageOptions: [
    {
      key: 'en',
      label: 'label_english',
    },
    {
      key: 'ja',
      label: 'label_japanese',
    },
    {
      key: 'ko',
      label: 'label_korean',
    },
    {
      key: 'ru',
      label: 'label_russian',
    },
    {
      key: 'es',
      label: 'label_spanish',
    },
  ],
  resetFreshchatUser: () => {
    if (Platform.OS === 'ios' && !!Freshchat) {
      Freshchat.Freshchat.resetUser();

    }
  },
  validateNumericFields: (value) => {
    if (value.indexOf(' ') > -1 || value.indexOf(',') > -1
      || value.indexOf('-') > -1 || value.indexOf('.') > -1) {
      let tempVal = [];
      if (value.indexOf(' ') > -1) {
        tempVal = value.split(' ');
        value = '';
        tempVal.forEach(element => {
          value += element;
        });
      } else if (value.indexOf(',') > -1) {
        tempVal = value.split(',');
        value = '';
        tempVal.forEach(element => {
          value += element;
        });
      } else if (value.indexOf('-') > -1) {
        tempVal = value.split('-');
        value = '';
        tempVal.forEach(element => {
          value += element;
        });
      } else if (value.indexOf('.') > -1) {
        tempVal = value.split('.');
        value = '';
        tempVal.forEach(element => {
          value += element;
        });
      }
    }
    return value;
  },

  isDeviceHasNotch: () => {
    let result = false;
    const windowDimensions = Dimensions.get('window');
    if (Platform.OS === 'android' && StatusBar.currentHeight > 24) {
      result = true;
    }
    if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS &&
      ((windowDimensions.height === 812 || windowDimensions.width === 812) || (windowDimensions.height === 896 || windowDimensions.width === 896))) {
      result = true;
    }
    return result;
  },

  trimString: (string) => {
    return string.replace(/^\s+|\s+$/g, '');
  },
};

export default commonUtil;
