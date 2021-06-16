import React from "react";

import { Create, FormTab, TabbedForm, TextInput } from "react-admin";

import CategoryImgCard from "./CategoryImgCard";
import { makeStyles } from "@material-ui/core/styles";

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
const CategoryCreate = (props) => {
  const classes = useStyles();

  return (
    <Create {...props} title={<div>CategoryCreate</div>}>
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
      </TabbedForm>
    </Create>
  );
};

export default CategoryCreate;
