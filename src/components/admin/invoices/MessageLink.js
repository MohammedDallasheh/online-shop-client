import React from 'react';

import { useAuthProvider } from 'react-admin';
import { Button } from 'antd';

const MessageLink = ({ record, order }) => {
  const { getHome } = useAuthProvider();

  const onClickHandler = () => {
    const email = record?.email;
    const to = record?._id;
    const subject = `Message about order: ${order?._id}` || '';
    getHome(
      `user/message/new?email=${email}&to=${to}&subject=${subject}&type=afterOrder`
    );
  };

  return record ? (
    <Button type="primary" shape="round" onClick={onClickHandler}>
      Message
    </Button>
  ) : null;
};

export default MessageLink;
