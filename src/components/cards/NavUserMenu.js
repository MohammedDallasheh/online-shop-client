import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';

import { logout } from '../../actions/auth';

const stateSelector = (state) => {
  const user = state?.auth?.user || {};
  const role = user?.role;

  const unreadMsgCount = user?.messages?.filter(
    ({ unread }) => unread
  ).length;

  return { role, unreadMsgCount };
};

const linksByRole = {
  admin: (
    <Link to="/user-mangment">
      <p className="btn-block">Dashboard</p>
    </Link>
  ),
  seller: (
    <Link to="/user-mangment">
      <p className="btn-block">Dashboard</p>
    </Link>
  ),
  subscriber: (
    <>
      <Link to="/cart">
        <p className="btn-block">Cart</p>
      </Link>
      <Link to="/user/wishlist">
        <p className="btn-block">Wish List</p>
      </Link>
      <Link to="/user-mangment">
        <p className="btn-block">Dashboard</p>
      </Link>
      <Link to="/user/recently-viwed">
        <p className="btn-block">Recently viwed</p>
      </Link>
    </>
  ),
};

const NavUserMenu = () => {
  const dispatch = useDispatch();
  const { role, unreadMsgCount } = useSelector(stateSelector);

  return (
    <div>
      {linksByRole[role]}

      <Link to="/user/message">
        <div className="btn-block mb-3">
          Message <Badge count={unreadMsgCount} />
        </div>
      </Link>
      <Link to="/user/setting">
        <p className="btn-block">Setting</p>
      </Link>
      <Link to="/">
        <p className="btn-block" onClick={() => dispatch(logout())}>
          Sign Out
        </p>
      </Link>
    </div>
  );
};

export default NavUserMenu;
