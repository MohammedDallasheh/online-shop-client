import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productsReducer from './productsReducer';

export default combineReducers({
  auth: authReducer,
  products: productsReducer,
});
