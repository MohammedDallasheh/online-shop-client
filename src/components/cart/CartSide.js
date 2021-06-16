import React from 'react';

import { Link } from 'react-router-dom';

import { calcTotalPriceOffer } from './cartFunction';

const CartSide = ({ cart, sellerId, isAuth }) => {
  const [tPrice, tOffer] = calcTotalPriceOffer(cart);

  return (
    <div className="bg-primary text-center h-100">
      <div className="position-sticky py-5 " style={{ top: '25vh' }}>
        <h1>Total</h1>
        <h3>Total Price= {tPrice}</h3>
        {!!tOffer && <h3>Total Offer= {tOffer}</h3>}
        <h5>You save= {(tPrice - tOffer).fix(3)}</h5>

        {isAuth ? (
          <Link to={`checkout/${sellerId}`}>
            <h2 className="text-warning mt-5">Check Out</h2>
          </Link>
        ) : (
          <Link to="/sign/in">
            <h2 className="mt-5 p-2 bg-warning rounded-pill">
              SignIn To CheckOut
            </h2>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartSide;
