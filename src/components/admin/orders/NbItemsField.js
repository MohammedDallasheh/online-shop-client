import * as React from 'react';
import { FunctionField, FieldProps } from 'react-admin';

const render = (record) =>
  record &&
  record.products.reduce((prev, { quantity }) => prev + quantity, 0);

const NbItemsField = ({ record }) => (
  <FunctionField record={record} render={render} />
);

NbItemsField.defaultProps = {
  label: 'resources.commands.fields.nb_items',
  textAlign: 'right',
};

export default NbItemsField;
