import * as React from 'react';
import { FC } from 'react';
import { FieldProps } from 'react-admin';

const AddressField = ({ record }) =>
  record ? (
    <span>
      {/* {record.address}, {record.city}, {record.stateAbbr}
      {record.zipcode} */}
      {record.address}
    </span>
  ) : null;

export default AddressField;
