import * as React from "react";
import { FC } from "react";
import Avatar from "@material-ui/core/Avatar";
import { FieldProps } from "react-admin";

const AvatarField = ({ record, size = "25", className }) =>
  record ? (
    <Avatar
      src={`${process.env.REACT_APP_API_SERVER + record?.avatar?.url}`}
      style={{
        width: parseInt(size, 10),
        height: parseInt(size, 10),
      }}
      className={className}
    />
  ) : null;

export default AvatarField;
