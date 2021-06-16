import React from 'react';

import { Rate, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import {
  addProductToCart,
  removeProductFromCart,
  addToUserList,
  deleteFromUserList,
} from '../../actions/user/index';

import Icon from '../layout/Icon';
import Tags from './Tags';
import { rateTooltips } from '../../function/rateCounter';

const stateSelector =
  (productId) =>
  ({ auth }) => {
    const { cart, wishlist } = auth?.user || {};

    const compareProduct = ({ _id }) => _id == productId;

    const { quantity } = cart?.find(compareProduct) || {};
    const isInWishlist = wishlist?.some(compareProduct);

    return { quantity, isInWishlist, isAuth: !!auth?.user?._id };
  };

// quantity;

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();

  const { quantity, isInWishlist, isAuth } = useSelector(
    stateSelector(product?._id)
  );

  const { _id, title, rate, price, offer } = product;
  const { tags, stock, orders } = product;

  const cartHandler = (value = quantity ? 0 : 1) => {
    dispatch(addProductToCart(product, value));
  };
  const wishlistHandler = () => {
    if (!isAuth) return;
    if (!isInWishlist) dispatch(addToUserList('wishlist', product));
    else dispatch(deleteFromUserList('wishlist', product._id));
  };

  const removeHandler = () => {
    dispatch(removeProductFromCart(product._id));
  };

  return (
    <div className="container text-primary  ">
      <div className="row">
        <div className="col">
          <h2 style={{ wordBreak: 'break-all' }}>{title}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Tags tags={tags} />
        </div>
      </div>
      <div className="row" style={{ fontSize: '1rem' }}>
        <div className="col">
          <Rate
            disabled
            key={rate}
            defaultValue={rate}
            tooltips={rateTooltips(orders)}
            className="mr-3"
            style={{ fontSize: 'inherit' }}
            allowHalf
          />
          Based on{' '}
          {orders?.filter((order) => order.rate >= 0)?.length} reviews
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p className={`h3 mt-3 ${offer && 'line-through'}`}>
            Price: ${price?.fix()} USD
          </p>
        </div>
        <div className="col-12">
          {offer > 0 && (
            <p className="h3 mt-3 font-weight-bold">
              Offer: ${offer?.fix()} USD
            </p>
          )}
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        {/* <div className="col-1">QTY</div> */}
        <div className="col-12 col-lg-6">
          <Select
            key={`Select-${quantity}`}
            showSearch
            style={{ width: '100% ' }}
            placeholder="QTY"
            onChange={cartHandler}
            className="text-center"
            defaultValue={quantity}
            dropdownClassName="text-center"
            options={Array(stock > 0 ? stock : 0)
              .fill(0)
              .map((_, i) => ({ value: i + 1 }))}
            disabled={!stock}
            notFoundContent={<span>Max QTY is {stock}</span>}
          />
        </div>
        <div className="col-12 col-lg-6"></div>
        <div className="col-12 col-lg-6 text-center">
          Remain {stock} in the stock
        </div>
      </div>
      {isAuth && (
        <div className="row">
          <div className="col-12 col-lg-6 mt-3 d-flex justify-content-around">
            {!!stock && (
              <Icon
                key={`cartIcon-${quantity}`}
                name="test10"
                size={2}
                color={quantity ? 'red' : 'black'}
                hover="blue"
                className="p-0 ml-3"
                onClick={cartHandler}
              />
            )}
            {quantity && (
              <Icon
                key={`cartIcon2-${quantity}`}
                name="test44"
                size={2}
                hover="blue"
                className="p-0 ml-3"
                onClick={removeHandler}
              />
            )}
            <Icon
              name="test54"
              size={2}
              color={isInWishlist ? 'red' : 'black'}
              hover="blue"
              className="p-0 mx-2"
              onClick={wishlistHandler}
            />
          </div>
        </div>
      )}
      <div className="col-12"></div>
    </div>
  );
};

export default ProductInfo;
