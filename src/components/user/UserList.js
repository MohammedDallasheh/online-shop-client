import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteOutlined } from '@ant-design/icons';

import ProductCard from '../cards/ProductCard';
import Gallery from '../galleries/Gallery';

import {
  getUserList,
  deleteFromUserList,
  deleteUserList,
} from '../../actions/user/index';

const useStyles = makeStyles({
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
    transform: 'translate(-50%,50%)',
  },
});

const cards = (handleDelete) => (props) => {
  const classes = useStyles();
  return (
    <div>
      <Button
        className={classes.deleteIcon}
        shape="circle"
        icon={<DeleteOutlined />}
        onClick={() => handleDelete(props?.items?._id)}
      />
      <ProductCard {...props} />
    </div>
  );
};

const UserList = ({ listName = 'lastViewed' }) => {
  const dispatch = useDispatch();

  const data = useSelector(
    ({ auth }) => auth?.user?.[listName] || []
  );

  useEffect(() => {
    dispatch(getUserList(listName));
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteFromUserList(listName, id));
  };
  const handleDeleteAll = () => {
    dispatch(deleteUserList(listName));
  };

  return (
    <>
      <div className="text-center">
        <Button type="primary" onClick={handleDeleteAll}>
          Clear All
        </Button>
      </div>
      <Gallery
        items={data}
        Component={cards(handleDelete)}
        loading={false}
      />
    </>
  );
};

export default UserList;
