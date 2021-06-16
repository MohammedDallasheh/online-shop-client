import {
  GET_PRODUCT,
  GET_PRODUCTS,
  UNLOAD_PRODUCT,
  UPDATE_REVIEWS,
  GET_PRODUCTS_FILTER,
} from "../actions/types";

const initialState = {
  product: {},
  products: [],
  productsFilters: [],
  productsSorts: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCT:
      return { ...state, product: payload, loading: false };
    case GET_PRODUCTS:
      return { ...state, products: payload, loading: false };
    case UNLOAD_PRODUCT:
      return { ...state, product: {}, loading: true };

    case UPDATE_REVIEWS:
      return {
        ...state,
        product: { ...state.product, reviews: payload.reviews },
      };

    case GET_PRODUCTS_FILTER:
      return {
        ...state,
        productsFilters: payload.filters,
        productsSorts: payload.sortOption,
      };

    default:
      return state;
  }
}
