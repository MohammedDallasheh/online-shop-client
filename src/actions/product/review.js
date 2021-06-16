import axios from 'axios';
import { alert, errorAlert } from '../../function/alert';

import { UPDATE_REVIEWS } from '../types';

export const addReviewToProduct = (productId, text) => async (
  dispatch
) => {
  try {
    const { data } = await axios.post(
      `/api/products/${productId}/review`,
      JSON.stringify({ text })
    );
    alert({ content: 'Adding Comment Success', type: 'success' });
    dispatch({
      type: UPDATE_REVIEWS,
      payload: data,
    });
  } catch (err) {
    errorAlert(err);

    console.log(err);
  }
};
export const removeReviewToProduct = (productId, commentId) => async (
  dispatch
) => {
  try {
    const { data } = await axios.delete(
      `/api/products/${productId}/review/${commentId}`
    );

    alert({ content: 'Remove Comment Success', type: 'success' });
    dispatch({
      type: UPDATE_REVIEWS,
      payload: data,
    });
  } catch (err) {
    errorAlert(err);

    console.log(err);
  }
};
