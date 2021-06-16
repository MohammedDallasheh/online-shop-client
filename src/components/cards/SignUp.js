import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Form,
  Input,
  Tooltip,
  Select,
  Checkbox,
  Button,
  Row,
  Col,
} from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { register } from '../../actions/auth';

const tailFormItemLayout = {
  wrapperCol: { span: 12, offset: 6 },
  // wrapperCol: {
  //   xs: {
  //     span: 12,
  //     offset: 0,
  //   },
  //   sm: {
  //     span: 12,
  //     offset: 8,
  //   },
  //   md: { span: 12 },
  //   lg: { span: 12 },
  // },
};

const SignUp = ({}) => {
  const history = useHistory();
  let { search } = useLocation();
  const dispatch = useDispatch();

  const { fName, lName, email, avatar } = parse(search);
  console.log(avatar);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(register(values));
  };

  return (
    <Form
      form={form}
      name="register"
      initialValues={{ fName, lName, email, avatar }}
      onFinish={onFinish}
      scrollToFirstError
      // {...tailFormItemLayout}
    >
      <Row justify="space-around">
        <Col span={10}>
          <Form.Item
            name="fName"
            shouldUpdate
            rules={[
              {
                required: true,
                message: 'Please input your first name!',
                whitespace: true,
              },
            ]}
          >
            <Input
              autoComplete="off"
              placeholder="First Name"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="lName"
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
                whitespace: true,
              },
            ]}
          >
            <Input
              autoComplete="off"
              placeholder="Last Name"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: 'Please input your address!',
                whitespace: true,
              },
            ]}
          >
            {/* <Tooltip title="Address for Shipping?"> */}
            <Input
              autoComplete="off"
              placeholder="Address"
              prefix={<UserOutlined />}
            />
            {/* </Tooltip> */}
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input
              autoComplete="off"
              placeholder="E-mail"
              prefix={
                <UserOutlined className="site-form-item-icon" />
              }
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              autoComplete="off"
              placeholder="Password"
              prefix={
                <LockOutlined className="site-form-item-icon" />
              }
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('passwords do not match!');
                },
              }),
            ]}
          >
            <Input.Password
              autoComplete="off"
              placeholder="Confirm Password"
              prefix={
                <LockOutlined className="site-form-item-icon" />
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject('Should accept agreement'),
          },
        ]}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-100">
          Register
        </Button>
      </Form.Item>

      {avatar && <img src={avatar} />}
    </Form>
  );
};

export default SignUp;
