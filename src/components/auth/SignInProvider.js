import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { parse } from 'query-string';
import { errorAlert } from '../../function/alert';

import DelayRedirect from '../routing/DelayRedirect';

const SignInProvider = () => {
  const history = useHistory();

  useEffect(() => {
    const { token, error } = parse(history.location.search);

    if (error) errorAlert(error);

    if (!token) return;

    localStorage.setItem('token', token);
    history.push('/');
  }, []);
  return <DelayRedirect />;
};

export default SignInProvider;
