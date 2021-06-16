import axios from "axios";

import { errorAlert } from "../../function/alert";

import { GET_PRODUCT, GET_PRODUCTS, UNLOAD_PRODUCT } from "../types";

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: UNLOAD_PRODUCT });

    const { data } = await axios.get(`/api/products/${id}`);
    const { data: relatedProduct } = await axios.get(
      `/api/products/${id}/relatedProduct`
    );
    if (!data._id) return;
    dispatch({
      type: GET_PRODUCT,
      payload: { ...data, relatedProduct },
    });
  } catch (err) {
    errorAlert(err);

    console.log("ERROR: getProduct", err);
  }
};

export const getProducts =
  (filters = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: UNLOAD_PRODUCT });

      let { page = 1, limit = 12, sort = "createdAt", ...rest } = filters;
      Object.entries(rest).forEach(([key, value]) => {
        const splitedStr = value?.includes("--") && value?.split("--");
        if (splitedStr)
          rest[key] = { $gte: splitedStr[0], $lte: splitedStr[1] };
      });

      rest = JSON.stringify(rest);
      sort = JSON.stringify(sort);
      const range = JSON.stringify([(page - 1) * limit, page * limit - 1]);
      const { data } = await axios.get(
        `/api/products?filter=${rest}&range=${range}&sort=${sort}`
      );
      dispatch({
        type: GET_PRODUCTS,
        payload: data,
      });
    } catch (err) {
      errorAlert(err);

      console.log("ERROR: getProduct", err);
    }
  };

export const unloadProduct = () => (dispatch) => {
  dispatch({ type: UNLOAD_PRODUCT });
};
