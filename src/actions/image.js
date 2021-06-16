import axios from 'axios';

import { alert, errorAlert } from '../function/alert';

// dispatchType = ['IMAGE_USER_AVATAR_U', 'IMAGE_USER_AVATAR_D']
//            OR  ['IMAGE_USER_IMGS_U', 'IMAGE_USER_IMGS_D']
// dispatchType = 'IMAGE_USER_AVATAR_U' oR 'IMAGE_USER_IMGS_U';
export const uploadImage = (
  file,
  resource,
  resourceId,
  path,
  dispatchType
) => async (dispatch) => {
  try {
    const fileData = new FormData();
    fileData.append('file', file);

    const { data } = await axios.post(
      `/api/image/${resource}/${resourceId}/${path}`,
      fileData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    dispatch({
      type: dispatchType,
      payload: data,
    });
  } catch (err) {
    errorAlert(err);

    console.log('ERROR: getProduct', err);
  }
};

export const deleteImage = (
  imgId,
  resource,
  resourceId,
  path
) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `/api/image/${resource}/${resourceId}/${path}/${imgId}`
    );

    // dispatch({
    //   type: DELETE_USER_IMG,
    //   payload: imageId,
    // });
  } catch (err) {
    errorAlert(err);

    console.log('ERROR: getProduct', err);
  }
};
