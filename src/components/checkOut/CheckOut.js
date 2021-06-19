import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Steps, Button, Tooltip } from "antd";
import { Link } from "react-router-dom";

import Payment from "./Payment";
import OrderDetails from "./OrderDetails";
import OrderProducts from "./OrderProducts";
import DelayRedirect from "../routing/DelayRedirect";
import { calcTotalPriceOffer } from "../cart/cartFunction";
import { updateOrder } from "../../actions/user/index";

const { Step } = Steps;

const initialCreditState = {
  paymentMethod: "Credit Card",
  "cc-name": "1",
  "cc-number": "2",
  "cc-expiration": "3",
  "cc-cvv": "4",
  totalAmount: "",
};
const initialFormState = {
  fName: "",
  lName: "",
  email: "",
  address: "",
  paymentType: "",
  totalAmount: "",
};
const stateSelector =
  (sellerId) =>
  ({ auth }) => {
    const cart = auth.user.cart.filter(({ user }) => user == sellerId);
    return {
      ...auth.user,
      cart,
    };
  };

const CheckOut = ({ history }) => {
  const { sellerId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector(stateSelector(sellerId));
  const [currentTab, setCurrentTab] = useState(0);

  const [creditForm, setCreditForm] = useState(initialCreditState);
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (!user) return;

    setForm({
      fName: user?.name?.first,
      lName: user?.name?.last,
      email: user?.email,
      address: user?.address,
    });

    const [_, totalAmount] = calcTotalPriceOffer(user?.cart);

    setCreditForm({ ...creditForm, totalAmount });
  }, []);

  const handleCredit = ({ target: { id, value } }) => {
    setCreditForm((os) => ({ ...os, [id]: value }));
  };

  const nextPrv = (n) => {
    setCurrentTab(currentTab + n);
  };
  const submitHandel = async () => {
    const order = {
      sellerId: sellerId,
      products: user.cart.map(({ _id, quantity }) => ({
        productId: _id,
        quantity,
      })),
      payment: creditForm,
      address: form.address,
    };
    if (await dispatch(updateOrder(order))) history.push("/user-mangment#");
  };
  const steps = [
    {
      title: "Details",
      content: <OrderDetails form={form} setForm={setForm} />,
    },
    {
      title: "Products",
      content: (
        <OrderProducts cart={user.cart} totalPrice={creditForm.totalAmount} />
      ),
    },
    {
      title: "Payment",
      content: <Payment creditForm={creditForm} handleCredit={handleCredit} />,
    },
  ];

  const outOfStoke = user.cart?.some(
    ({ stock, quantity }) => !stock || stock < quantity
  );

  return !user?.cart?.length ? (
    <DelayRedirect delay={1500}>
      <h1 className="text-center text-primary m-5">
        <Link to="/"> Cart Is Empty</Link>
      </h1>
    </DelayRedirect>
  ) : (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <Steps current={currentTab}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content col-12 my-5 mx-auto">
          {steps[currentTab].content}
        </div>

        <div className="steps-action ">
          {currentTab > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => nextPrv(-1)}>
              Previous
            </Button>
          )}
          {currentTab < steps.length - 1 && (
            <Tooltip
              title={(currentTab == 1) & outOfStoke ? "OUT OF STOCK" : ""}
            >
              <Button
                type="primary"
                onClick={() => nextPrv(+1)}
                disabled={(currentTab == 1) & outOfStoke}
              >
                Next
              </Button>
            </Tooltip>
          )}
          {currentTab === steps.length - 1 && (
            <Button type="primary" onClick={submitHandel}>
              Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
