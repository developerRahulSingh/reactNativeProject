import React from 'react';
import { View } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import { store } from '../../../../config/reduxStore/configure.store';
import { updateProgress } from '../../../../config/reduxStore/reducers';
import commonTheme from '../../../../themes/common.theme';
import { BaseModal } from '../base.modal';
import { componentStyle } from '../languageSelector/languageSelector.style';

export default class ProgressIndicator extends BaseModal {
  constructor(props) {
    super(props, false);
    this.unsubscribe = store.subscribe(() => {
      if (this.closeDelay) {
        clearTimeout(this.closeDelay);
      }
      this.closeDelay = setTimeout(async () => {
        let state = store.getState();
        if (state.commonDataStore.progressIndicator === 0) {
          await this.close();
        }
      }, 100);
    });
  }

  componentDidMount() {
    super.componentDidMount();
    store.dispatch(updateProgress(true));
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    store.dispatch(updateProgress(false));
  }

  render() {
    return (
      <View style={[componentStyle.backdrop]}>
        <UIActivityIndicator
          size={48}
          count={16}
          color={commonTheme.COLOR_BRIGHT}
          animationDuration={900}
        />
      </View>
    );
  }
}
