import axios from 'axios';

import { alert, errorAlert } from '../../function/alert';

import { USER_LOADED } from '../types';

export const updateUser = (user) => async (dispatch) => {
  try {
    const { _id, name, phone, address, description } = user;

    const requestBody = JSON.stringify({
      name,
      phone,
      address,
      description,
    });

    const { data } = await axios.put(
      `/api/users/${_id}`,
      requestBody
    );
    dispatch({
      type: USER_LOADED,
      payload: data,
    });
    alert({ content: 'UPDATE SUCCESS', type: 'success' });
  } catch (err) {
    errorAlert(err);
    console.log('ERROR: setUnread', err);
  }
};
