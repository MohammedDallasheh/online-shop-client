import React from 'react';

import CartProduct from './CartProduct';
import CartSide from './CartSide';

const CartBySellet = ({ isAuth, sellerId, cart }) => {
  return (
    <>
      <div className="col-lg-4 col-12 order-sm-last  ">
        <CartSide cart={cart} sellerId={sellerId} isAuth={isAuth} />
      </div>

      <div className="col-lg-8 col-12">
        {cart.map((product, key) => (
          <CartProduct product={product} key={key} />
        ))}
      </div>
    </>
  );
};

export default CartBySellet;
