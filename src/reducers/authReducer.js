import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT,
  /************* */
  UPDATE_CART,
  /************* */
  IMAGE_USER_IMGS_U,
  IMAGE_USER_AVATAR_U,
  /************* */
  GET_MESSAGE,
  UNREAD_MESSAGE,
  DELETE_MESSAGE,
  /************* */
  GET_LIST,
  ADD_TO_LIST,
  DELETE_FROM_LIST,
  DELETE_LIST,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  try {
    const { type, payload } = action;
    switch (type) {
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        return {
          ...state,
          token: payload.token,
        };
      case USER_LOADED:
        return {
          ...state,
          user: payload,
          isAuth: true,
          loading: false,
        };

      case LOGIN_FAIL:
      case AUTH_ERROR:
      case LOGOUT:
        return {
          ...state,
          ...initialState,
          loading: false,
          token: null,
        };

      /********************************** */

      case UPDATE_CART: {
        return {
          ...state,
          user: { ...state.user, cart: payload },
        };
      }

      /********************************** */

      case GET_MESSAGE:
        return {
          ...state,
          user: { ...state.user, messages: payload },
        };
      case DELETE_MESSAGE: {
        const messages = state.user?.messages?.filter(
          ({ _id }) => _id != payload
        );
        return {
          ...state,
          user: { ...state.user, messages },
        };
      }
      case UNREAD_MESSAGE: {
        const messages = state.user?.messages?.slice();
        const message = messages?.find(({ _id }) => payload._id == _id);
        message.unread = payload.unread || false;
        return {
          ...state,
          user: { ...state.user, messages },
        };
      }

      /********************************** */
      case IMAGE_USER_IMGS_U:
        return {
          ...state,
          user: { ...state.user, imgs: payload },
        };
      case IMAGE_USER_AVATAR_U:
        return {
          ...state,
          user: { ...state.user, avatar: payload },
        };
      /********************************** */
      case GET_LIST:
        return {
          ...state,
          user: { ...state.user, [payload.listName]: payload.data },
        };
      case ADD_TO_LIST: {
        let list = state.user?.[payload.listName]?.slice();

        if (list) list.push(payload.product);
        else list = [payload.product];

        return {
          ...state,
          user: { ...state.user, [payload.listName]: list },
        };
      }
      case DELETE_FROM_LIST: {
        const list = state.user?.[payload.listName]?.filter(
          ({ _id }) => _id != payload.id
        );
        return {
          ...state,
          user: { ...state.user, [payload.listName]: list },
        };
      }
      case DELETE_LIST:
        return {
          ...state,
          user: { ...state.user, [payload.listName]: [] },
        };

      default:
        return state;
    }
  } catch (err) {
    console.log(err);
  }
}
