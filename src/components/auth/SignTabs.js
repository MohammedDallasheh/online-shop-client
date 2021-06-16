import React from 'react';

import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SignTabsCard from '../cards/SignTabsCard';

const SignTabs = () => {
  const isAuth = useSelector(({ auth }) => !!auth?.user?._id);
  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <div className="w-50 my-5 mx-auto">
      <SignTabsCard />
    </div>
  );
};

export default SignTabs;
