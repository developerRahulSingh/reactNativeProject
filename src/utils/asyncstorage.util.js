import AsyncStorage from '@react-native-community/async-storage';

const AsyncStorageUtil = {
  getItem: (key) => {
    return AsyncStorage.getItem(key);
  },
  setItem: (key, data) => {
    return AsyncStorage.setItem(key, JSON.stringify(data));
  },
  storeStringItem: (key, data) => {
    return AsyncStorage.setItem(key, data);
  },
  removeItem: (key) => {
    return AsyncStorage.removeItem(key);
  },
};

export default AsyncStorageUtil;
