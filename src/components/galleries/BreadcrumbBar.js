import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const BreadcrumbBar = ({ path = [] }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/">
          <HomeOutlined />
        </Link>
      </Breadcrumb.Item>
      {path.map(({ name, url }, key) => (
        <Breadcrumb.Item key={key}>
          <Link to={url}>
            {/* <UserOutlined /> */}
            <span>{name}</span>
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbBar;
