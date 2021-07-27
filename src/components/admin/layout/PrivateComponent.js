import React, { Fragment } from "react";

import { useSelector } from "react-redux";

const PrivateComponent = ({ roles, children, ...rest }) => {
  const userRole = useSelector(({ auth }) => auth?.user?.role);
  const toShow =
    !roles ||
    (Array.isArray(roles) ? roles.includes(userRole) : userRole === roles);

  return toShow && React.cloneElement(children, rest);
};

export default PrivateComponent;
