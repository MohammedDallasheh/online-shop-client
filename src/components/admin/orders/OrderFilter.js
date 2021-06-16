import React from 'react';
import {
  AutocompleteInput,
  DateInput,
  Filter,
  NullableBooleanInput,
  ReferenceInput,
  SearchInput,
  TextInput,
} from 'react-admin';

const OrderFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <ReferenceInput
      source="buyerId"
      reference="customers"
      lable="resources.orders.fields.date_lte.buyer"
    >
      <AutocompleteInput
        optionText={(choice) =>
          choice.id // the empty choice is { id: '' }
            ? `${choice.name.first} ${choice.name.last}`
            : ''
        }
      />
    </ReferenceInput>
    <ReferenceInput
      source="sellerId"
      reference="customers"
      lable="resources.orders.fields.date_lte.seller"
    >
      <AutocompleteInput
        optionText={(choice) =>
          choice.id // the empty choice is { id: '' }
            ? `${choice.name.first} ${choice.name.last}`
            : ''
        }
      />
    </ReferenceInput>
    <DateInput
      label="resources.orders.fields.date_lte"
      source="createdAt.$lte"
    />
    <DateInput
      label="resources.orders.fields.date_gte"
      source="createdAt.$gte"
    />
    <TextInput
      label="resources.orders.fields.total_lte"
      source="payment amount.$lte"
    />
    <TextInput
      label="resources.orders.fields.total_gte"
      source="payment amount.$gte"
    />
    <NullableBooleanInput source="returned" />
  </Filter>
);

export default OrderFilter;
