import React from 'react';

import { Divider, Rate } from 'antd';
import { Link } from 'react-router-dom';

import ProductGalary from '../product/productGalary';
import Quantity from './Quantity';

const CartProduct = ({ product = {} }) => {
  const { _id: productId, imgs = [], price } = product;
  const { offer, title, rate, quantity } = product;

  return (
    <div className="row">
      <div className="col-12 col-lg-7  ">
        <ProductGalary imgs={imgs} carousel={false} />
      </div>
      <div className="col-12 col-lg-5 text-center">
        <Link to={`/product/${productId}`}>
          <h4>{title}</h4>
        </Link>
        <div className="my-4">
          Rate:
          <span className="ml-4">
            <Rate disabled value={rate} />
          </span>
        </div>
        <div className="my-4">
          Quantity:
          <Quantity
            className="ml-3"
            product={product}
            quantity={quantity}
          />
        </div>
        <div className="my-4">
          price:
          <span className={`ml-3 h5 ${offer && 'line-through'}`}>
            {price?.fix()}
          </span>
          {!!offer && (
            <span className="mx-3 h4">{offer?.fix()} $</span>
          )}
        </div>
        {quantity > 1 && (
          <div className="my-4">
            total:
            <span className={`ml-3 h5 ${offer && 'line-through'}`}>
              {(price * quantity)?.fix()}
            </span>
            {!!offer && (
              <span className="mx-3 h4">
                {(offer * quantity)?.fix()} $
              </span>
            )}
          </div>
        )}
      </div>
      <Divider />
    </div>
  );
};

export default CartProduct;
