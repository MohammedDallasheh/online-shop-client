import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Loading from '../layout/Loading';

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const { isAuth, loading, user } = useSelector(({ auth }) => auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Loading />
        ) : isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
