import React, { Fragment } from 'react';
import { useAuthProvider, Link } from 'react-admin';

const SiteLink = ({ to, children }) => {
  const { getHome } = useAuthProvider();

  const callBack = (e) => {
    getHome(to);
  };
  return (
    <a className="text-primary" onClick={callBack}>
      {children}
    </a>
  );
};

export default SiteLink;
