import { createStore } from 'redux';
import rootReducer from './reducers/reducers';

const configureStore = () => {
  let store = createStore(rootReducer);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducers = require('./reducers').default;
      store.replaceReducer(nextRootReducers);
    });
  }

  return store;
};

const store = configureStore();

export { store };
