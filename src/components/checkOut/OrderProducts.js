import React from "react";
import { Link } from "react-router-dom";

import Quantity from "../cart/Quantity";

const OrderProducts = ({ cart = [], totalPrice }) => {
  const quantityError = (stock, quantity) => {
    if (!stock) return <b className="text-warning mr-3"> OUT OF STOCK</b>;

    if (!!stock && quantity > stock)
      return <b className="text-warning mr-3">MAX QTY {stock}</b>;
  };

  if (!cart.length) return null;

  return (
    <>
      <h4 className="text-center mb-3">
        <span className="text-primary mx-2">Your cart</span>
        <span className="badge bg-primary rounded-pill mx-2">
          {cart.length}
        </span>
      </h4>
      <ul className="list-group mb-3">
        {cart.map((product, index) => {
          const { _id, title, stock, quantity } = product;
          const { price, offer, description } = product;
          return (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between lh-sm"
            >
              <div>
                <h6 className="my-0">
                  <Link to={`/product/${_id}`}>{title.slice(0, 100)}</Link>
                  {quantityError(stock, quantity)}

                  <Quantity
                    className="default-margin-child"
                    product={product}
                    quantity={quantity}
                    size={8}
                  />
                </h6>
                <small className="text-muted">{description}</small>
              </div>
              <span className="text-muted d-block w-100">
                {quantity.fix()} X {(offer || price).fix()}$ ={" "}
                <strong>{(quantity * (offer || price)).fix()}$</strong>
              </span>
            </li>
          );
        })}
        <li className="list-group-item d-flex justify-content-between">
          <span>Total (USD)</span>
          <strong>{totalPrice} $</strong>
        </li>
      </ul>
    </>
  );
};

export default OrderProducts;
