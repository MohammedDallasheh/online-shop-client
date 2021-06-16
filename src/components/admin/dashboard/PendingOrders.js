import * as React from 'react';
import { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useTranslate } from 'react-admin';
import AvatarField from '../visitors/AvatarField';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  cost: {
    marginRight: '1em',
    color: theme.palette.text.primary,
  },
}));

const PendingOrders = ({ orders = [], customers = {} }) => {
  const classes = useStyles();
  const translate = useTranslate();
  return (
    <Card className={classes.root}>
      <CardHeader title={translate('pos.dashboard.pending_orders')} />
      <List dense={true}>
        {orders.map((record) => (
          <ListItem
            key={record.id}
            button
            component={Link}
            to={`/orders/${record.id}`}
          >
            <ListItemAvatar>
              {customers[record.buyerId] ? (
                <AvatarField record={customers[record.buyerId]} />
              ) : (
                // <Avatar
                //   src={`${
                //     customers[record.buyerId].avatar
                //   }?size=32x32`}
                // />
                // <Avatar />
                <AvatarField record={customers[record.buyerId]} />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={new Date(record.createdAt).toLocaleString(
                'en-GB'
              )}
              secondary={translate('pos.dashboard.order.items', {
                smart_count: record.products.length,
                nb_items: record.products.length,
                customer_name: customers[record.buyerId]
                  ? `${customers[record.buyerId].name.first} ${
                      customers[record.buyerId].name.last
                    }`
                  : '',
              })}
            />
            <ListItemSecondaryAction>
              <span className={classes.cost}>
                {record?.payment?.amount?.toFixed(2)}$
              </span>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default PendingOrders;
