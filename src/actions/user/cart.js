import axios from 'axios';
import { errorAlert, alert } from '../../function/alert';

import { UPDATE_CART } from '../types';

/*************************** FUNCTION **************************** */
export const getCartFromLocalStorge = () =>
  JSON.parse(localStorage.getItem('cart') || '[]');
//-------       -----       ----       ---//
export const setCartToLocalStorge = (cart) =>
  localStorage.setItem('cart', JSON.stringify(cart));
//-------       -----       ----       ---//
export const addToCartValid = (product, quantity) => {
  if (quantity < 0) throw 'QTY  MUST BE POSITIVE';
  if (quantity > product?.stock)
    throw `MAX QTY IS- ${product?.stock}`;
};

export const mapCartFromServer = (cart) =>
  cart?.map(({ quantity, product }) => ({
    quantity,
    ...product,
  }));

/************************************************************* */

export const saveCartFromLocalToState = () => (dispatch) => {
  try {
    const cart = getCartFromLocalStorge();

    dispatch({
      type: UPDATE_CART,
      payload: cart,
    });
  } catch (err) {
    errorAlert(err);
  }
};
/************************************************************* */

export const saveCartToServer = async () => {
  try {
    if (!axios.defaults.headers.common['x-auth-token']) return;

    let cart = getCartFromLocalStorge();

    cart = cart.map(({ _id, quantity }) => ({
      product: _id,
      quantity,
    }));

    cart = JSON.stringify(cart);
    await axios.post(`/api/users/updatecart`, cart);
  } catch (err) {
    errorAlert(err);
  }
};

/************************************************************* */
export const addProductToCart =
  (product, quantity) => (dispatch, getState) => {
    try {
      const { isAuth } = getState().auth;
      if (!isAuth) return alert('You have to login');

      addToCartValid(product, quantity);

      let cart = getCartFromLocalStorge();

      const cartProduct = cart.find(({ _id }) => _id == product._id);

      if (cartProduct) cartProduct.quantity = quantity;
      else cart.push({ ...product, quantity });

      cart = cart.filter((product) => product.quantity > 0);

      setCartToLocalStorge(cart);

      alert({ content: 'ADD TO CART SUCCESS', type: 'success' });
      dispatch({
        type: UPDATE_CART,
        payload: cart,
      });

      saveCartToServer();
    } catch (err) {
      errorAlert(err);
    }
  };

/************************************************************* */
export const removeProductFromCart =
  (productId) => async (dispatch) => {
    try {
      let cart = getCartFromLocalStorge();

      cart = cart.filter(({ _id }) => _id != productId);

      setCartToLocalStorge(cart);

      alert('REMOVE FROM CART SUCCESS');
      dispatch({
        type: UPDATE_CART,
        payload: cart,
      });

      saveCartToServer();
    } catch (err) {
      errorAlert(err);
    }
  };
