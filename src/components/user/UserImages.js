import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ImageUpload from './ImageUpload';

const UserImages = () => {
  const { imgs, avatar } = useSelector(({ auth }) => {
    let avatar = auth?.user?.avatar;

    if (avatar && typeof avatar === 'object') {
      avatar.status = 'done';
      avatar.uid = 0;
    } else {
      avatar = undefined;
    }
    return {
      imgs:
        auth?.user?.imgs?.map((img, i) => ({
          ...img,
          status: 'done',
          uid: i,
        })) || [],
      avatar: avatar ? [avatar] : [],
    };
  });
  const userId = useSelector(({ auth }) => auth?.user?._id);

  return (
    // <div className="d-flex align-content-center flex-wrap flex-column ">
    <div className="text-center">
      <h1>User Avatar</h1>
      <ImageUpload
        resource="user"
        itemId={userId}
        path="avatar"
        imgs={avatar}
        maxImage={1}
        dispatchType={['IMAGE_USER_AVATAR_U', 'IMAGE_USER_AVATAR_D']}
      />

      <h1 className="my-4">User Images</h1>
      <ImageUpload
        resource="user"
        itemId={userId}
        path="imgs"
        imgs={imgs}
        dispatchType={['IMAGE_USER_IMGS_U', 'IMAGE_USER_IMGS_D']}
      />
    </div>
  );
};

export default UserImages;
