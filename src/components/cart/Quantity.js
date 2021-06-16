import React from 'react';

import { useDispatch } from 'react-redux';
import { Button, Popconfirm, Space } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { PlusCircleOutlined } from '@ant-design/icons';

import Icon from '../layout/Icon';
import { addProductToCart } from '../../actions/user/index';
import { removeProductFromCart } from '../../actions/user/index';
import { alert } from '../../function/alert';

const Quantity = (props) => {
  const { product, quantity, className, disabled, ...rest } = props;

  const dispatch = useDispatch();

  const quantityHandler = (value) => {
    if (disabled) return alert('Butten is disabled');
    dispatch(addProductToCart(product, quantity + value));
  };

  const removeHandler = () => {
    if (disabled) return alert('Butten is disabled');
    dispatch(removeProductFromCart(product._id));
  };
  return (
    <Space className={className || 'mx-2'} size="middle" {...rest}>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={() => quantityHandler(1)}
        disabled={quantity >= product?.stock}
      ></Button>
      <span>{quantity}</span>
      <Button
        type="primary"
        icon={<MinusCircleOutlined />}
        onClick={() => quantityHandler(-1)}
        disabled={quantity == 1 || !product?.stock}
      ></Button>
      <Popconfirm
        title="Are you sure ?"
        onConfirm={removeHandler}
        okText="Yes"
        cancelText="No"
      >
        <Icon name="test44" color="red" size={2} />
      </Popconfirm>
    </Space>
  );
};

export default Quantity;
