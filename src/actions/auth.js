import axios from 'axios';

import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';

import { alert, errorAlert } from '../function/alert';
import {
  saveCartToServer,
  setCartToLocalStorge,
  mapCartFromServer,
} from './user/index';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    if (!axios.defaults.headers.common['x-auth-token']) {
      return dispatch({
        type: LOGIN_FAIL,
      });
    }

    const { data } = await axios.get('/api/auth');

    data.cart = mapCartFromServer(data.cart);

    setCartToLocalStorge(data.cart);

    dispatch({
      type: USER_LOADED,
      payload: data,
    });
  } catch (err) {
    errorAlert(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (user) => async (dispatch) => {
  try {
    const { email, password, lName, fName, address } = user;

    const body = JSON.stringify({
      email,
      password,
      lName,
      fName,
      address,
    });

    const { data } = await axios.post('/api/auth/signup', body);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
    alert({ content: 'SIGNUP SUCCESS', type: 'success' });

    dispatch(loadUser());
  } catch (err) {
    errorAlert(err);
    console.log(err);
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  try {
    let logInfo = { email, password };

    // To delete
    if (email >= 0 && email < 50)
      logInfo.email = `user-${email}@a.com`;

    const body = JSON.stringify(logInfo);

    const { data } = await axios.post('/api/auth', body);

    alert({ content: 'LOGIN SUCCESS', type: 'success' });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    dispatch(loadUser());
  } catch (err) {
    errorAlert(err);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  saveCartToServer();
  alert({ content: 'LOGOUT', type: 'warning' });
  localStorage.removeItem('cart');
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};
