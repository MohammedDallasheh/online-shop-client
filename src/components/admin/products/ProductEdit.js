import React from 'react';
import {
  Edit,
  FormTab,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  TabbedForm,
  TextInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Poster from './Poster';
import { styles as createStyles } from './ProductCreate';

const useStyles = makeStyles({
  ...createStyles,
  comment: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  tab: {
    display: 'block',
  },
});

const ProductEdit = (props) => {
  const classes = useStyles();

  return (
    <Edit {...props} title={<div>ProductEdit</div>}>
      <TabbedForm syncWithLocation={false}>
        <FormTab
          label="resources.products.tabs.image"
          // contentClassName={classes.tab}
        >
          <Poster />
        </FormTab>
        <FormTab
          label="resources.products.tabs.details"
          path="details"
          contentClassName={classes.tab}
        >
          <TextInput
            source="title"
            validate={requiredValidate}
            fullWidth
            multiline
          />
          <NumberInput
            source="price"
            className={classes.price}
            formClassName={classes.widthFormGroup}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">€</InputAdornment>
              ),
            }}
            validate={requiredValidate}
          />
          <NumberInput
            source="offer"
            className={classes.price}
            formClassName={classes.heightFormGroup}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">€</InputAdornment>
              ),
            }}
          />
          <NumberInput
            source="stock"
            validate={required()}
            className={classes.stock}
          />
          <ReferenceInput
            source="category"
            reference="categories"
            formClassName={classes.heightFormGroup}
            validate={requiredValidate}
          >
            <SelectInput source="name" />
          </ReferenceInput>

          <Tags />

          <ReferenceArrayInput source="subs" reference="subs">
            <AutocompleteArrayInput optionText="name" fullWidth />
          </ReferenceArrayInput>

          <ReferenceArrayInput
            source="relatedProduct"
            reference="products/autocomplete"
            fullWidth
          >
            <AutocompleteArrayInput optionText="title" />
          </ReferenceArrayInput>
        </FormTab>
        <FormTab
          label="resources.products.tabs.description"
          path="description"
          contentClassName={classes.tab}
        >
          <TextInput
            source="description"
            validate={requiredValidate}
            multiline
            fullWidth
          />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

const Tags = (props) => (
  <AutocompleteArrayInput
    source="tags"
    inputText="name"
    format={(tags) => tags.map((tag) => tag?.name)}
    parse={(tags) => tags.map((tag) => ({ name: tag }))}
    choices={[
      { id: 'Sales', name: 'Sales' },
      { id: 'Specials', name: 'Specials' },
      { id: 'Hot', name: 'Hot' },
      { id: 'Trends', name: 'Trends' },
      { id: 'New', name: 'New' },
    ]}
    translateChoice={false}
  />
);
const requiredValidate = [required()];

export default ProductEdit;
