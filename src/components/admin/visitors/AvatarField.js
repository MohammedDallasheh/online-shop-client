import * as React from 'react';
import { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { FieldProps } from 'react-admin';

const AvatarField = ({ record, size = '25', className }) =>
  record ? (
    <Avatar
      // src={`${record.avatar}?size=${size}x${size}`}
      src={`https://ui-avatars.com/api/?name=${record?.name?.first}+${record?.name?.last}size=${size}x${size}`}
      // src={`https://robohash.org/${record.name.first}${record.name.last}`}
      style={{
        width: parseInt(size, 10),
        height: parseInt(size, 10),
      }}
      className={className}
    />
  ) : null;

export default AvatarField;
