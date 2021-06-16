// in src/createAdminStore.js
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import {
  routerMiddleware,
  connectRouter,
} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { adminReducer, adminSaga, USER_LOGOUT } from 'react-admin';
import { createBrowserHistory } from 'history';

import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import productsReducer from './reducers/productsReducer';

import dataProvider from './components/admin/dataProvider/dataProvider';
import authProvider from './components/admin/authProvider';
import setAuthToken from './utils/setAuthToken';

const createAdminStore = (history) => {
  const reducer = combineReducers({
    admin: adminReducer,
    router: connectRouter(history),
    auth: authReducer,
    products: productsReducer,
  });
  const resettableAppReducer = (state, action) =>
    reducer(action.type !== USER_LOGOUT ? state : undefined, action);

  const saga = function* rootSaga() {
    yield all([adminSaga(dataProvider, authProvider)].map(fork));
  };
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
      typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })) ||
    compose;

  const store = createStore(
    resettableAppReducer,
    {},
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
        thunk
      )
    )
  );
  sagaMiddleware.run(saga);

  // prevent auth error on first run of subscription
  let currentState = {
    auth: {
      token: null,
      isAuth: null,
      loading: false,
      user: null,
    },
  };
  store.subscribe(() => {
    // keep track of the previous and current state to compare changes
    let previousState = currentState;
    currentState = store.getState();
    // if the token changes set the value in localStorage and axios headers
    if (previousState.auth.token !== currentState.auth.token) {
      const token = currentState.auth.token;
      setAuthToken(token);
    }
  });
  return store;
};

const history = createBrowserHistory();
export const store = createAdminStore(history);
