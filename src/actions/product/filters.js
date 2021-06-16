import axios from 'axios';
import { errorAlert } from '../../function/alert';

import { GET_PRODUCTS_FILTER } from '../types';

export const getProductsFilter = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/products/filter');

    dispatch({
      type: GET_PRODUCTS_FILTER,
      payload: data,
    });
  } catch (err) {
    errorAlert(err);

    console.log('ERROR: getProduct', err);
  }
};
