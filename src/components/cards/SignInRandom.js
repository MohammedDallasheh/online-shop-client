import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Button } from "antd";

import { login } from "../../actions/auth";

const userTypes = {
  Random: [0, 49],
  Admin: [0, 9],
  Seller: [10, 29],
  Customer: [30, 99],
};
const SignInRandom = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");

  const onSelectUserType = (name) => {
    const [start, end] = userTypes[name];
    const randomUserNumber = 0 | (start + Math.random() * (end - start));
    setUser(`user-${randomUserNumber}@a.com`);
  };

  const onSignIn = () => {
    dispatch(login(user, ""));
  };

  const btnGenerator = (title) => (
    <>
      <Button
        type="primary"
        className="w-75 my-1 "
        name={title}
        key={title}
        onClick={() => onSelectUserType(title)}
      >
        {title} User
      </Button>
      <br />
    </>
  );
  return (
    <div className="w-100 text-center">
      {Object.keys(userTypes).map((name) => btnGenerator(name))}
      {user && (
        <div className="border-top my-2 ">
          <span>{user}</span>
          <br />
          <Button type="primary" className="bg-success" onClick={onSignIn}>
            SIGN IN
          </Button>
        </div>
      )}
    </div>
  );
};

export default SignInRandom;
