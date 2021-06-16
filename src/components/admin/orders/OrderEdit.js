import React from "react";
import {
  DateField,
  Edit,
  FormWithRedirect,
  Labeled,
  ReferenceField,
  SelectInput,
  TextField,
  Toolbar,
  useTranslate,
} from "react-admin";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  Grid,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Basket from "./Basket";
import Totals from "./Totals";
import { tabs as statuses } from "./OrderList";

const OrderTitle = ({ record }) => {
  const translate = useTranslate();
  return record ? (
    <span>
      {translate("resources.commands.title", {
        reference: record.id,
      })}
    </span>
  ) : null;
};

const CustomerDetails = ({ record }) => (
  <Box display="flex" flexDirection="column">
    <Typography
      component={RouterLink}
      color="primary"
      to={`/customers/${record?.id}`}
      style={{ textDecoration: "none" }}
    >
      {record?.name?.first} {record?.name?.last}
    </Typography>
    <Typography
      component={Link}
      color="primary"
      href={`mailto:${record?.email}`}
      style={{ textDecoration: "none" }}
    >
      {record?.email}
    </Typography>
  </Box>
);

const CustomerAddress = ({ record }) => (
  <Box>
    <Typography>
      {record?.name?.first} {record?.name?.last}
    </Typography>
    <Typography>{record?.address}</Typography>
  </Box>
);

const useEditStyles = makeStyles({
  root: { alignItems: "flex-start" },
});

const Spacer = () => <Box m={1}>&nbsp;</Box>;

const OrderForm = (props) => {
  const translate = useTranslate();
  return (
    <FormWithRedirect
      {...props}
      render={(formProps) => (
        <Box maxWidth="70em" className="mx-auto">
          <Card>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    {translate("resources.commands.section.order")}
                  </Typography>
                  <Grid container>
                    <Grid>
                      <Labeled source="createdAt" resource="orders">
                        <DateField
                          source="createdAt"
                          resource="orders"
                          record={formProps.record}
                        />
                      </Labeled>
                    </Grid>
                    <Grid>
                      <Labeled source="updatedAt" resource="orders">
                        <DateField
                          source="updatedAt"
                          resource="orders"
                          record={formProps.record}
                        />
                      </Labeled>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Labeled source="id" resource="orders">
                      <TextField
                        source="id"
                        resource="orders"
                        record={formProps.record}
                      />
                    </Labeled>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                      <SelectInput
                        resource="orders/statusupdate"
                        source="status.statusType"
                        choices={statuses}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        {translate("resources.commands.section.buyer")}
                      </Typography>
                      <ReferenceField
                        source="buyerId"
                        resource="orders"
                        reference="customers"
                        basePath="/customers"
                        record={formProps.record}
                        link={false}
                      >
                        <CustomerDetails />
                      </ReferenceField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        {translate("resources.commands.section.seller")}
                      </Typography>
                      <ReferenceField
                        source="sellerId"
                        resource="orders"
                        reference="customers"
                        basePath="/customers"
                        record={formProps.record}
                        link={false}
                      >
                        <CustomerDetails />
                      </ReferenceField>
                    </Grid>
                  </Grid>
                  <Spacer />

                  <Typography variant="h6" gutterBottom>
                    {translate("resources.commands.section.shipping_address")}
                  </Typography>
                  <ReferenceField
                    source="buyerId"
                    resource="orders"
                    reference="customers"
                    basePath="/customers"
                    record={formProps.record}
                    link={false}
                  >
                    <CustomerAddress />
                  </ReferenceField>
                </Grid>
              </Grid>
              <Spacer />

              <Typography variant="h6" gutterBottom>
                {translate("resources.commands.section.items")}
              </Typography>
              <Box>
                <Basket record={formProps.record} />
              </Box>
              <Spacer />

              <Typography variant="h6" gutterBottom>
                {translate("resources.commands.section.total")}
              </Typography>
              <Box>
                <Totals record={formProps.record} />
              </Box>
            </CardContent>
            <Toolbar
              record={formProps.record}
              basePath={formProps.basePath}
              undoable={true}
              invalid={formProps.invalid}
              handleSubmit={formProps.handleSubmit}
              saving={formProps.saving}
              resource="orders"
            />
          </Card>
        </Box>
      )}
    />
  );
};
const OrderEdit = (props) => {
  const classes = useEditStyles();
  return (
    <Edit
      title={<OrderTitle />}
      classes={classes}
      {...props}
      transform={(data) => data}
      mutationMode="pessimistic"
      component="div"
    >
      <OrderForm />
    </Edit>
  );
};

export default OrderEdit;
