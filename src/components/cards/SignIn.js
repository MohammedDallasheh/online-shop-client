import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import Icon from '../layout/Icon';
import { login } from '../../actions/auth';

const inputData = {
  email: {
    rules: [
      {
        type: 'email',
        message: 'The input is not valid E-mail!',
      },
      {
        required: true,
        message: 'Please input your E-mail!',
      },
    ],
    prefix: <UserOutlined />,
  },
  password: {
    role: [
      {
        required: true,
        message: 'Please input your Password!',
      },
    ],
    prefix: <LockOutlined />,
  },
};

//***************** THE COMPONENT **************************** */
const SignIn = ({ setActiveKey }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = ({ email, password }) => {
    dispatch(login(email, password));
  };

  return (
    <>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        preserve={false}
        onFinish={onFinish}
      >
        {/* <Form.Item name="email" rules={inputData.email.rules}> */}
        <Form.Item name="email">
          <Input
            prefix={inputData.email.prefix}
            placeholder="email"
            allowClear
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item name="password" rules={inputData.password.role}>
          <Input.Password
            prefix={inputData.password.prefix}
            placeholder="Password"
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot">Forgot password</a>
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <>
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(
                    ['email', 'password'],
                    true
                  ) ||
                  !!form
                    .getFieldsError()
                    .filter(({ errors }) => errors.length).length
                }
              >
                Sign In
              </Button>
              Or
              <Button type="link" onClick={() => setActiveKey('up')}>
                register now!
              </Button>
            </>
          )}
        </Form.Item>
      </Form>
      <div className="d-flex px-5 justify-content-around">
        <a
          href={`${process.env.REACT_APP_BACKEND_URL}/api/auth/facebook`}
        >
          <Icon name="test70" size={2} />
        </a>
        <Icon name="test77" size={2} />
        <Icon name="test78" size={2} />
      </div>
    </>
  );
};
export default SignIn;
