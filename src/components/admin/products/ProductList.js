import React from "react";
import { Box, Chip, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  CreateButton,
  ExportButton,
  ListBase,
  Pagination,
  SortButton,
  TopToolbar,
  useListContext,
  useTranslate,
  useAuthProvider,
} from "react-admin";
import { useSelector } from "react-redux";
import GridList from "./GridList";
import Aside from "./Aside";

const useQuickFilterStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
}));

const QuickFilter = ({ label }) => {
  const translate = useTranslate();
  const classes = useQuickFilterStyles();
  return <Chip className={classes.root} label={translate(label)} />;
};

const ListActions = ({ isSmall }) => (
  <TopToolbar>
    <SortButton fields={["price", "rate", "offer"]} />
    <CreateButton basePath="/products" />
    <ExportButton />
  </TopToolbar>
);

const ProductList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { getIdentity } = useAuthProvider();
  const { role, _id: userId } = useSelector(({ auth }) => auth?.user);

  return (
    <ListBase
      perPage={20}
      sort={{ field: "reference", order: "ASC" }}
      {...props}
      // filterDefaultValues={{
      //   user: role != 'admin' ? userId : undefined,
      // }}
      // resource="products/me"
    >
      <ProductListView isSmall={isSmall} />
    </ListBase>
  );
};

const ProductListView = ({ isSmall }) => {
  const { defaultTitle, ...rest } = useListContext();
  return (
    <>
      <ListActions isSmall={isSmall} />
      <Box display="flex">
        <Aside />
        <Box width={isSmall ? "auto" : "calc(100% - 16em)"}>
          <GridList />
          <Pagination rowsPerPageOptions={[10, 20, 40]} />
        </Box>
      </Box>
    </>
  );
};
export default ProductList;
