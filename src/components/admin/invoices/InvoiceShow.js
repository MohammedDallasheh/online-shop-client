import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  useShowController,
  ReferenceField,
  useAuthProvider,
} from 'react-admin';

import Basket from '../orders/Basket';
import FullNameField from '../visitors/FullNameField';
import MessageLink from './MessageLink';

const InvoiceShow = (props) => {
  const { record } = useShowController(props);
  const classes = useStyles();
  if (!record) return null;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h6>
              <b>Seller ID</b> {record.sellerId}
            </h6>
          </Grid>
          <Grid item xs={6}>
            <h6>
              <b>Order ID</b> {record.id}
            </h6>
          </Grid>
        </Grid>
        <div className={classes.spacer}>&nbsp;</div>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ReferenceField
              resource="orders"
              reference="customers"
              source="buyerId"
              basePath="/orders"
              record={record}
              link={false}
            >
              <FullNameField record={record} />
            </ReferenceField>
            <div>{record?.address}</div>
          </Grid>

          <Grid item xs={6}>
            <Typography gutterBottom>
              <b> Date </b>
              {new Date(record.createdAt).toLocaleDateString()}
            </Typography>
            <ReferenceField
              resource="orders"
              reference="customers"
              source="sellerId"
              basePath="/orders"
              record={record}
              link={false}
            >
              <MessageLink order={record} />
            </ReferenceField>
          </Grid>
        </Grid>
        <div className={classes.spacer}>&nbsp;</div>

        <div className={classes.invoices}>
          <ReferenceField
            resource="orders"
            reference="orders"
            source="id"
            basePath="/orders"
            record={record}
            link={false}
          >
            <Basket />
          </ReferenceField>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceShow;

const useStyles = makeStyles({
  root: { width: 600, margin: 'auto' },
  spacer: { height: 20 },
  invoices: { margin: '10px 0' },
});
