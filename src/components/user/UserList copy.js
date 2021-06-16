import React, { useEffect } from 'react';

import { Table, Rate, Button, Popconfirm } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProductCard from '../cards/ProductCard';
import Gallery from '../galleries/Gallery';
import Tags from '../product/Tags';
import {
  getUserList,
  deleteFromUserList,
  deleteUserList,
} from '../../actions/user/index';

const columnsShowBreakPoints = ['xxl', 'xl', 'lg'];
const columns = (listName, dispatch) => [
  {
    title: 'Title',
    render: ({ title, _id }) => (
      <Link to={`/product/${_id}`}>{title}</Link>
    ),
    sorter: {
      compare: (a, b) => a.title.localeCompare(b.title),
    },
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    render: (tags) => (
      <div className="d-inline-flex">
        <Tags tags={tags} />
      </div>
    ),
    responsive: columnsShowBreakPoints,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: {
      compare: (a, b) => a.price - b.price,
    },
    responsive: columnsShowBreakPoints,
  },
  {
    title: 'Offer',
    dataIndex: 'offer',
    render: (offer) => +offer?.toFixed(2) || '---',
    sorter: {
      compare: (a, b) => (a.offer || 0) - (b.offer || 0),
    },
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    render: (rate) => <Rate value={rate} disabled />,
    sorter: {
      compare: (a, b) => a.rate - b.rate,
    },
    responsive: columnsShowBreakPoints,
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    sorter: {
      compare: (a, b) => a.stock - b.stock,
    },
  },
  {
    title: () => (
      <Popconfirm
        title="Are you sure to delete all history?"
        onConfirm={() => dispatch(deleteUserList(listName))}
        okText="Yes"
        cancelText="No"
      >
        <Button className="bg-primary text-light">DELETE ALL</Button>
      </Popconfirm>
    ),
    key: 'action',
    width: 1,
    render: ({ _id }) => (
      <Button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(deleteFromUserList(listName, _id));
        }}
      >
        Delete
      </Button>
    ),
  },
];

const UserList = ({ listName = 'lastViewed' }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector(
    ({ auth }) => auth?.user?.[listName] || []
  );
  console.log({ data });
  useEffect(() => {
    dispatch(getUserList(listName));
  }, []);

  const handleDelete = () => {
    dispatch(deleteUserList(listName));
  };

  return (
    <div>
      <div className="float-right my-3"></div>
      <div>
        <Button>Clear All</Button>
      </div>
      <Gallery items={data} Component={ProductCard} loading={false} />

      {/* <Table
        columns={columns(listName, dispatch)}
        dataSource={data.map((pro, i) => ({ ...pro, key: i }))}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => history.push(`/product/${record?._id}`),
          };
        }}
      /> */}
    </div>
  );
};

export default UserList;
