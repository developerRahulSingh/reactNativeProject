import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { store } from '../../../config/reduxStore/configure.store';
import commonTheme from '../../../themes/common.theme';

class BaseModal extends Component {
  backButtonCanClose: boolean;

  constructor(props, backButtonCanClose: boolean = true) {
    super(props);
    this.backButtonCanClose = backButtonCanClose;
    this.close = this.close.bind(this);

    console.log(`%c${this.constructor.name}: %cReceiving Props`, 'color: ' + commonTheme.COLOR_PRIMARY + '; font-weight: bold',
      'color: ' + commonTheme.COLOR_SECONDARY + '; font-weight: bold', this.props);
    console.log(`%c${this.constructor.name}: %cCurrent Store`, 'color: ' + commonTheme.COLOR_PRIMARY + '; font-weight: bold',
      'color: ' + commonTheme.COLOR_SECONDARY + '; font-weight: bold', store.getState());
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._backButtonClose);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._backButtonClose);
  }

  _backButtonClose = async () => {
    if (this.backButtonCanClose) {
      return !!this.props.onDismiss ? this._onDismiss() : this.close();
    } else {
      return {};
    }
  };

  close = async () => {
    return Navigation.dismissOverlay(this.props.componentId).catch(() => null);
  };
}

export { BaseModal };
