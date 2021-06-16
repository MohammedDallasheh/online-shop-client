import * as React from 'react';
import { FC } from 'react';
import {
  ReferenceField,
  ReferenceFieldProps,
  TextField,
} from 'react-admin';

const ProductReferenceField = (props) => (
  // <div>ReferenceField</div>
  <ReferenceField
    label="Product"
    source="_id"
    reference="products"
    {...props}
  >
    <TextField source="id" />
  </ReferenceField>
);

ProductReferenceField.defaultProps = {
  source: 'product_id',
  addLabel: true,
};

export default ProductReferenceField;
