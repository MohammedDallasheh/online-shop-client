import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomerIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import { useTranslate, useQueryWithStore } from 'react-admin';
import { subDays, subYears } from 'date-fns';

import CardWithIcon from './CardWithIcon';
import AvatarField from '../visitors/AvatarField';

const NewCustomers = () => {
  const translate = useTranslate();
  const classes = useStyles();

  const aMonthAgo = subDays(new Date(), 30);
  aMonthAgo.setDate(aMonthAgo.getDate() - 30);
  aMonthAgo.setHours(0);
  aMonthAgo.setMinutes(0);
  aMonthAgo.setSeconds(0);
  aMonthAgo.setMilliseconds(0);

  const aYearAgo = subYears(new Date(), 3);
  aYearAgo.setDate(aYearAgo.getDate() - 356);
  aYearAgo.setHours(0);
  aYearAgo.setMinutes(0);
  aYearAgo.setSeconds(0);
  aYearAgo.setMilliseconds(0);

  const { loaded, data: visitors } = useQueryWithStore({
    type: 'getList',
    resource: 'customers',
    payload: {
      filter: {
        registered: { $gte: aYearAgo.toISOString() },
      },
      sort: { field: 'registered', order: 'DESC' },
      pagination: { page: 1, perPage: 100 },
    },
  });

  if (!loaded) return null;

  const nb = visitors ? visitors.reduce((nb) => ++nb, 0) : 0;
  return (
    <CardWithIcon
      to="/customers"
      icon={CustomerIcon}
      title={translate('pos.dashboard.new_customers')}
      subtitle={nb}
    >
      <List>
        {visitors
          ? visitors.map((record) => (
              <ListItem
                button
                to={`/customers/${record.id}`}
                component={Link}
                key={record.id}
              >
                <ListItemAvatar>
                  {/* <Avatar src={`${record.avatar}?size=32x32`} /> */}
                  <AvatarField record={record} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${record.name.first} ${record.name.last}`}
                />
              </ListItem>
            ))
          : null}
      </List>
      <Box flexGrow="1">&nbsp;</Box>
      <Button
        className={classes.link}
        component={Link}
        to="/customers"
        size="small"
        color="primary"
      >
        <Box p={1} className={classes.linkContent}>
          {translate('pos.dashboard.all_customers')}
        </Box>
      </Button>
    </CardWithIcon>
  );
};

const useStyles = makeStyles((theme) => ({
  link: {
    borderRadius: 0,
  },
  linkContent: {
    color: theme.palette.primary.main,
  },
}));

export default NewCustomers;
