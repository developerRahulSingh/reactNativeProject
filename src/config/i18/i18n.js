import I18n from 'i18n-js';
import * as _ from 'lodash';
import { NativeModules, Platform } from 'react-native';
import en from './locales/en.json';
import es from './locales/es.json';
import hi from './locales/hi.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import ru from './locales/ru.json';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  es: _.merge({}, en, es),
  ja: _.merge({}, en, ja),
  ko: _.merge({}, en, ko),
  ru: _.merge({}, en, ru),
  hi: _.merge({}, en, hi),
};

I18n.defaultLocale = 'en';

export function detectLanguage() {
  let deviceLocalLanguage: string;

  if (Platform.OS === 'ios') {
    deviceLocalLanguage = NativeModules.SettingsManager.settings.AppleLocale;
    if (deviceLocalLanguage === undefined) {
      // iOS 13 workaround, take first of AppleLanguages array  ["en", "en-NZ"]
      deviceLocalLanguage = NativeModules.SettingsManager.settings.AppleLanguages[0];
      if (deviceLocalLanguage === undefined) {
        deviceLocalLanguage = 'en'; // default language
      }
    }
  } else {
    deviceLocalLanguage = NativeModules.I18nManager.localeIdentifier;
  }

  if (deviceLocalLanguage.indexOf('_') !== -1) {
    deviceLocalLanguage = deviceLocalLanguage.substring(0, deviceLocalLanguage.indexOf('_'));
  } else if (deviceLocalLanguage.indexOf('-') !== -1) {
    deviceLocalLanguage = deviceLocalLanguage.substring(0, deviceLocalLanguage.indexOf('-'));
  }
  return deviceLocalLanguage.toUpperCase();
}

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return I18n.t(name, params);
}

export const switchLanguage = (lang, component = null) => {
  I18n.locale = lang;
  if (component) {
    component.forceUpdate();
  }
};

export default I18n;
