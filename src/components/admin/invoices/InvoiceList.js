import React, { useEffect } from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  NumberField,
  Filter,
  DateInput,
} from 'react-admin';

import { parse } from 'query-string';
import { useDispatch } from 'react-redux';
import { expandInvoices } from '../configuration/actions';
import FullNameField from '../visitors/FullNameField';
import InvoiceShow from './InvoiceShow';

const ListFilters = (props) => (
  <Filter {...props}>
    <DateInput source="updatedAt.$gte" alwaysOn />
    <DateInput source="updatedAt.$lte" alwaysOn />
  </Filter>
);

const InvoiceList = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = parse(props.location.search, {
      arrayFormat: 'comma',
    });
    if (!id) return;
    if (typeof id === 'string') return dispatch(expandInvoices(id));
    if (Array.isArray(id))
      id.forEach((id) => dispatch(expandInvoices(id)));
  }, []);

  return (
    <List
      {...props}
      resource="orders"
      filters={<ListFilters />}
      perPage={25}
      sort={{ field: 'updatedAt', order: 'ASC' }}
      bulkActionButtons={false}
    >
      <Datagrid rowClick="expand" expand={<InvoiceShow />}>
        <TextField source="id" />
        <DateField source="updatedAt" />
        <ReferenceField source="buyerId" reference="customers">
          <FullNameField />
        </ReferenceField>
        <ReferenceField source="sellerId" reference="customers">
          <FullNameField />
        </ReferenceField>
        <TextField
          source="address"
          label="resources.invoices.fields.address"
        />
        {/* <NumberField source="total_ex_taxes" />
        <NumberField source="delivery_fees" />
      <NumberField source="taxes" /> */}
        <NumberField source="payment.amount" />
      </Datagrid>
    </List>
  );
};

export default InvoiceList;
