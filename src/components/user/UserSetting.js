import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, InputNumber, Button } from 'antd';

import { updateUser } from '../../actions/user/index';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const UserSetting = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }) => auth);

  const onFinish = (values) => {
    console.log(values);
    dispatch(updateUser({ _id: user?._id, ...values }));
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={user}
      className="row justify-content-center my-5"
    >
      <div className="col-5">
        <Form.Item
          name={['name', 'first']}
          label="First Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={['name', 'last']}
          label="Last Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={['email']}
          label="Email"
          rules={[{ type: 'email' }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item name={['role']} label="Role">
          <Input disabled />
        </Form.Item>
      </div>
      <div className="col-5">
        <Form.Item
          name={['phone']}
          label="Phone"
          // rules={[
          //   {
          //     pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
          //   },
          // ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['address']} label="Address">
          <Input />
        </Form.Item>
        <Form.Item name={['description']} label="Description">
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
      </div>
      <div className="col-5 d-flex justify-content-center">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default UserSetting;
