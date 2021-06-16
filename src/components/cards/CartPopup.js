import React from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, Popover } from "antd";

import Icon from "../layout/Icon";
import Quantity from "../cart/Quantity";
import { calcTotalPriceOffer } from "../cart/cartFunction";

const { Row, Cell } = Table.Summary;

const cartTitle = (
  <Link to="/cart" style={{ height: "2rem" }}>
    Cart Popup
    <span type="button" className="btn btn-primary float-right">
      Go To Cart
    </span>
  </Link>
);

const columnbreakpointsShow = ["xxl", "xl", "lg"];
const columns = [
  {
    title: "title",
    key: "title",
    render: ({ title, _id }) => (
      <div
        className="p-0 m-0"
        style={{
          lineHeight: "1.5em",
          height: "1.5em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <Link className="w-100" to={`/product/${_id}`}>
          {title}
          {/* {title.slice(0, 20)}
          {title.length > 20 && ' . . . '} */}
        </Link>
      </div>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    width: 80,
    responsive: columnbreakpointsShow,
  },
  {
    title: "Offer",
    dataIndex: "offer",
    render: (offer) => <span>{offer?.fix() || "------"}</span>,
    width: 80,
    responsive: columnbreakpointsShow,
  },
  {
    title: "Total",
    key: "total",
    render: ({ price, offer, quantity }) => (
      <span>{((offer || price) * quantity).toFixed(2)}</span>
    ),
    width: 100,
  },
  {
    title: "QTY",
    key: "quantity",
    render: (product) => (
      <Quantity product={product} quantity={product.quantity} />
    ),
    width: 200,
    responsive: columnbreakpointsShow,
  },
];
const CartContent = ({ cart, totalPrice }) => (
  <div style={{ width: "60vw" }}>
    <Table
      columns={columns}
      dataSource={cart}
      scroll={{ y: 200 }}
      pagination={false}
      rowKey="_id"
      bordered
      summary={() => {
        return (
          <Row>
            <Cell className="d-none d-lg-table-cell" />
            <Cell className="d-none d-lg-table-cell" />
            <Cell align="right">Total:</Cell>
            <Cell>{totalPrice?.fix()}</Cell>
            <Cell className="d-none d-lg-table-cell">
              <Link to="/cart">
                <button className="btn btn-raised btn-primary">
                  Go To Cart
                </button>
              </Link>
            </Cell>
          </Row>
        );
      }}
    />
  </div>
);

const CartPopup = () => {
  const cart = useSelector(({ auth }) => auth?.user?.cart || []);

  const [tPrice, tOffer] = calcTotalPriceOffer(cart);

  return (
    <Popover
      placement="bottomRight"
      title={cartTitle}
      content={<CartContent cart={cart} totalPrice={tOffer} />}
      trigger="hover"
      style={{ maxWidth: "50vh" }}
    >
      <Link to="/cart">
        <Icon
          name={cart.length ? "test11" : "test10"}
          size={2}
          className="pt-2"
        />
      </Link>
    </Popover>
  );
};

export default CartPopup;
