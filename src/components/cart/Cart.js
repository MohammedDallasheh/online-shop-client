import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Divider, Empty } from 'antd';

import DelayRedirect from '../routing/DelayRedirect';
import CartBySellet from './CartBySellet';
import { cartBySellerFunc } from './cartFunction';

const EmptyCart = () => (
  <div style={{ minHeight: '60vh' }}>
    <DelayRedirect delay={1500}>
      <h1 className="text-center text-primary m-5">
        Cart Is Empty
        <Empty />
      </h1>
    </DelayRedirect>
  </div>
);

const StateSelector = ({ auth }) => ({
  cart: auth?.user?.cart,
  isAuth: !!auth?.user?._id,
});

//***************** THE COMPONENT **************************** */
const Cart = () => {
  const { cart, isAuth } = useSelector(StateSelector);

  const cartBySeller = cartBySellerFunc(cart);

  return !cart?.length ? (
    <EmptyCart />
  ) : (
    Object.entries(cartBySeller).map(([sellerId, cart], i) => (
      <div key={i}>
        <Divider>
          <h1>MY CART - SELLER {i + 1}</h1>
          <h6>
            Seller ID:{' '}
            <Link to={`/users/${sellerId}/products`}>{sellerId}</Link>
          </h6>
        </Divider>
        <div className="container">
          <div className="row">
            <CartBySellet
              sellerId={sellerId}
              cart={cart}
              isAuth={isAuth}
            />
          </div>
        </div>
      </div>
    ))
  );
};

export default Cart;
