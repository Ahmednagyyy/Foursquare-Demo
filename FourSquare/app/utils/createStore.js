/**
 * This is for redux store and redux-persist configuration
 */
import { persistStore, persistReducer } from 'redux-persist';
import { apiClient } from './apiClient';
import storage from 'redux-persist/lib/storage'; // AsyncStorage
import { createStore } from 'easy-peasy';
import { composeWithDevTools } from 'remote-redux-devtools';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../reducers/rootReducer';
import { createWhitelistFilter } from 'redux-persist-transform-filter';

const store = createStore(rootReducer, {
  /**
   * Dependency injection of the api client,
   * this is useful for testing purposes as this can be injected with a mock api client instead
   */
  injections: { apiClient },
  compose: composeWithDevTools({ realtime: true, trace: true }),
  devTools: true,
  disableImmer: true,
  /**
   * Redux-persist reducer to automatically sync the specified reducers in the whiteist
   * with the AsyncStorage
   */
  reducerEnhancer: (reducer) => {
    return persistReducer(
      {
        key: 'store',
        storage,
        whitelist: ['auth', 'user'], // List the names of the reducers to be stored automatically,
        stateReconciler: autoMergeLevel2, // Merges the app initial state with the stored state
        transforms: [
          createWhitelistFilter('auth', ['accessToken.data']), // Specify the fields to be stored from a reducer
          createWhitelistFilter('user', ['details.data'])
        ]
      },
      reducer
    );
  }
});

if (__DEV__) {
  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      store.reconfigure(require('../reducers/rootReducer').default);
    });
  }
}

const persistor = persistStore(store);

export { store, persistor };
