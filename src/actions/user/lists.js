import axios from 'axios';
import {
  UPDATE_CART,
  GET_LIST,
  ADD_TO_LIST,
  DELETE_FROM_LIST,
  DELETE_LIST,
} from '../types';
import { alert, errorAlert } from '../../function/alert';
import { mapCartFromServer, setCartToLocalStorge } from './cart';

export const updateOrder = (order) => async (dispatch) => {
  const { sellerId, products, payment, address } = order;

  const body = JSON.stringify({
    sellerId,
    products,
    payment,
    address,
  });

  try {
    const { data } = await axios.post(`/api/orders`, body);

    const cart = mapCartFromServer(data);
    setCartToLocalStorge(cart);

    dispatch({
      type: UPDATE_CART,
      payload: cart,
    });

    alert({ content: 'Processing complete', type: 'success' });

    return true;
  } catch (err) {
    errorAlert(err);
    return false;
  }
};

// GET_LIST;
// ADD_TO_LIST;
// DELETE_FROM_LIST;
// DELETE_LIST;

export const addToUserList =
  (listName, product) => async (dispatch) => {
    try {
      axios.post(`/api/users/list/${listName}/${product._id}`);

      dispatch({
        type: ADD_TO_LIST,
        payload: { listName, product },
      });
      if (listName == 'wishlist')
        alert({
          content: 'Add to wishlist success',
          type: 'success',
        });
    } catch (err) {
      errorAlert(err);
    }
  };

export const getUserList = (listName) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/list/${listName}`);

    dispatch({
      type: GET_LIST,
      payload: { listName, data },
    });
  } catch (err) {
    errorAlert(err);
  }
};
export const deleteFromUserList =
  (listName, id) => async (dispatch) => {
    try {
      axios.delete(`/api/users/list/${listName}/${id}`);

      dispatch({
        type: DELETE_FROM_LIST,
        payload: { listName, id },
      });
      alert('Delete from list success');
    } catch (err) {
      errorAlert(err);
    }
  };
export const deleteUserList = (listName) => async (dispatch) => {
  try {
    axios.delete(`/api/users/list/${listName}`);

    dispatch({
      type: DELETE_LIST,
      payload: { listName },
    });
  } catch (err) {
    errorAlert(err);
  }
};
