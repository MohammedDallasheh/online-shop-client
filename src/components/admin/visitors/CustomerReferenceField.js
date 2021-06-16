import * as React from 'react';
import { FC } from 'react';
import { ReferenceField, ReferenceFieldProps } from 'react-admin';

import FullNameField from './FullNameField';

const CustomerReferenceField = (props) => (
  <ReferenceField reference="customers" {...props}>
    <FullNameField />
  </ReferenceField>
);

export default CustomerReferenceField;
