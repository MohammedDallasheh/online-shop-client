import CheckableTag from 'antd/lib/tag/CheckableTag';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const DelayRedirect = ({ delay = 500, children, to = '/' }) => {
  const [rdct, setRdct] = useState(false);
  useEffect(() => {
    let timeoutID;

    new Promise(
      (res) => (timeoutID = setTimeout(res, delay))
    ).then(() => setRdct(true));

    return () => clearTimeout(timeoutID);
  }, []);

  return rdct ? <Redirect to={to} /> : <div>{children}</div>;
};

export default DelayRedirect;
