import axios from 'axios';

import { alert, errorAlert } from '../../function/alert';

import {
  GET_MESSAGE,
  DELETE_MESSAGE,
  UNREAD_MESSAGE,
} from '../types';

export const getMessages = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/users/message');

    dispatch({ type: GET_MESSAGE, payload: data });
  } catch (err) {
    errorAlert(err);

    console.log('ERROR: getMessages', err);
  }
};
export const sendMessage = (message) => async (dispatch) => {
  try {
    const { to, subject, body, messageType } = message;

    if (!subject) throw { message: `Not Valid Message - subject` };
    if (!body) throw { message: `Not Valid Message - body` };
    if (!to.length) throw { message: `Not Valid Message - to` };

    //   ['to', 'subject', 'body'].forEach((parm) => {
    //     if (!message[parm])
    //       throw { message: `Not Valid Message - ${parm}` };
    //   });
    // if (!to.length || !subject || !messageType)

    const reqBody = JSON.stringify({
      to,
      subject: subject.slice(0, 50),
      body,
      messageType,
    });

    const { data } = await axios.post(`/api/users/message`, reqBody);

    dispatch({ type: GET_MESSAGE, payload: data });
    alert({ content: 'MESSAGE SEND SUCCESS', type: 'success' });
    return true;
  } catch (err) {
    errorAlert(err);
    console.log('ERROR: sendMessage', err);
    return false;
  }
};
export const deleteMessage = (messageId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `/api/users/message/${messageId}`
    );

    dispatch({ type: DELETE_MESSAGE, payload: messageId });
  } catch (err) {
    errorAlert(err);
    console.log('ERROR: deleteMessage', err);
  }
};
export const setUnread = (messageId, unread = false) => async (
  dispatch
) => {
  try {
    const reqBody = JSON.stringify({ unread });

    const { data } = await axios.put(
      `/api/users/message/${messageId}`,
      reqBody
    );

    dispatch({
      type: UNREAD_MESSAGE,
      payload: { _id: messageId, unread },
    });
  } catch (err) {
    errorAlert(err);
    console.log('ERROR: setUnread', err);
  }
};
