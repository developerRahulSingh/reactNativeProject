import axios, { AxiosInstance } from 'axios';
import compareVersions from 'compare-versions';
import { store } from '../../config/reduxStore/configure.store';
import { hideProgress, showProgress } from '../../config/reduxStore/reducers';
import HttpUrlConstant from '../../constants/http.constant';
import screenId from '../../constants/screen.id.enum';
import stackName from '../../constants/stack.name.enum';
import commonTheme from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';

class BaseClient {
  static client = (): AxiosInstance => {
    const instance = axios.create({
      baseURL: HttpUrlConstant.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // intercept response
    instance.interceptors.response.use(async (response) => {
      // log the response
      console.log('%cResponse:', 'color: ' + commonTheme.COLOR_SECONDARY + 'AF' + '; font-weight: bold', {
        address: `${response.config.baseURL}${response.config.url}`,
        responseBody: response.data,
      });

      const requestData = JSON.parse(response?.config?.data);

      if (!requestData?.ProcessInBackground) {
        store.dispatch(hideProgress());
      }

      if (response.data.ErrorCode === '1' && !!response.data?.ReasonCodes?.find((reasonCode) => reasonCode.ReasonCode === '15')) {
        await NavigationUtil.gotoLogin(true);
        return Promise.reject(false);
      } else {
        // check the app version ... it should be greater than or equal to the API version
        if (compareVersions.compare(response.data?.DeviceTypeInfo?.DeviceTypeVersion || '0.0.0', global['APP_VERSION'], '>')) {
          await NavigationUtil.resetTo(stackName.AuthenticationStack, screenId.Common.AppUpdatePage, {currentVersion: response.data?.DeviceTypeInfo?.DeviceTypeVersion});

          return Promise.reject(false);
        } else {
          return Promise.resolve(response);
        }
      }
    }, (error) => {
      store.dispatch(hideProgress());
      return Promise.reject(error);
    });

    // intercept request
    instance.interceptors.request.use((config) => {
      // update the AuthenticationToken in the request
      if (!!config.data && typeof config.data === 'object') {
        if (!config?.data?.ProcessInBackground) {
          store.dispatch(showProgress());
        }

        if (!config.data.hasOwnProperty('AuthenticationToken') || !config.data.AuthenticationToken) {
          // get the token from the store
          const token = store.getState().userDataStore?.AuthenticationToken?.Token;

          // add token from the store to the requests in case
          // the token is not provided in the request and is available in the store
          if (!!token) {
            config.data['AuthenticationToken'] = token;
          }
        }
      }

      // log the request
      console.log('%cRequest:', 'color: ' + commonTheme.COLOR_PRIMARY + 'AF' + '; font-weight: bold', {
        address: `${config.baseURL}${config.url}`,
        requestBody: config.data,
      });

      // return the request config
      return config;
    }, function (error) {
      store.dispatch(hideProgress());
      return Promise.reject(error);
    });

    return instance;
  };
}

const ClientInstance = BaseClient.client();

export { ClientInstance };
