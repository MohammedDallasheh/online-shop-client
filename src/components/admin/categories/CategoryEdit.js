import React from "react";

import {
  Datagrid,
  DateField,
  Edit,
  EditButton,
  EditProps,
  FormTab,
  NumberInput,
  Pagination,
  ReferenceInput,
  ReferenceManyField,
  required,
  SelectInput,
  TabbedForm,
  TextField,
  TextInput,
  useTranslate,
  ArrayField,
  SingleFieldList,
  ChipField,
  NumberField,
  SelectField,
} from "react-admin";
import CategoryImgCard from "./CategoryImgCard";
import { makeStyles } from "@material-ui/core/styles";

const CategoryTitle = ({ record }) => {
  const translate = useTranslate();
  return record ? (
    <span>
      {translate("resources.categories.name", { smart_count: 1 })} &quot;
      {record.name}&quot;
    </span>
  ) : null;
};

const useStyles = makeStyles({
  comment: {
    maxWidth: "20em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  tab: {
    // maxWidth: '40em',
    width: "100%",
    display: "block",
  },
});
const CategoryEdit = (props) => {
  const classes = useStyles();

  return (
    <Edit {...props} title={<div>CategoryEdit</div>}>
      <TabbedForm>
        <FormTab
          label="resources.products.tabs.image"
          // contentClassName={classes.tab}
        >
          <CategoryImgCard />
        </FormTab>
        <FormTab
          label="resources.products.tabs.details"
          path="details"
          contentClassName={classes.tab}
        >
          <TextInput source="name" fullWidth />
          <TextInput source="title" multiline fullWidth />
          <TextInput source="description" multiline fullWidth />
        </FormTab>
        <FormTab
          label="resources.products.tabs.products"
          // contentClassName={classes.tab}
        >
          <ReferenceManyField
            reference="products"
            target="category"
            label="resources.categories.fields.products"
            perPage={20}
            fullWidth
          >
            <Datagrid>
              <TextField source="title" />
              <NumberField
                source="price"
                options={{ style: "currency", currency: "USD" }}
              />
              <NumberField
                source="offer"
                options={{ style: "currency", currency: "USD" }}
              />
              <NumberField source="stock" />

              <ArrayField source="tags">
                <SingleFieldList linkType={false}>
                  <ChipField source="name" />
                </SingleFieldList>
              </ArrayField>

              <EditButton />
            </Datagrid>
          </ReferenceManyField>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default CategoryEdit;
