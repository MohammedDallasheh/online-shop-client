import * as React from 'react';
import {
  BooleanField,
  Datagrid,
  DateField,
  DateInput,
  EmailField,
  TextField,
  SelectField,
  Filter,
  FilterProps,
  List,
  ListProps,
  FunctionField,
  NullableBooleanInput,
  NumberField,
  SearchInput,
} from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import CustomerLinkField from './CustomerLinkField';
import MobileGrid from './MobileGrid';
import VisitorListAside from './VisitorListAside';
import FullNameField from './FullNameField';

const VisitorFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <DateInput source="last_seen_gte" />
    <NullableBooleanInput source="has_ordered" />
    <NullableBooleanInput source="has_newsletter" defaultValue />
  </Filter>
);

const useStyles = makeStyles((theme) => ({
  nb_commands: { color: 'purple' },
  hiddenOnSmallScreens: {
    display: 'table-cell',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

const VisitorList = (props) => {
  const role = useSelector(({ auth }) => auth?.user?.role);

  const classes = useStyles();
  const isXsmall = useMediaQuery((theme) =>
    theme.breakpoints.down('xs')
  );
  const isSmall = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );
  return (
    <List
      {...props}
      filters={isSmall ? <VisitorFilter /> : undefined}
      sort={{ field: 'last_seen', order: 'DESC' }}
      perPage={25}
      aside={<VisitorListAside />}
      bulkActionButtons={false}
    >
      {isXsmall ? (
        <MobileGrid />
      ) : (
        <Datagrid optimized rowClick={role === 'admin' ? 'edit' : ''}>
          <FullNameField />
          {/* <CustomerLinkField /> */}
          <EmailField source="email" />
          <TextField source="role" />
          {/* <DateField source="last_seen" /> */}
          <FunctionField
            label="isLock"
            render={(record) =>
              record.isLock ? (
                <DateField record={record} source="isLock" />
              ) : (
                <BooleanField record={record} source="isLock" />
              )
            }
          />
          <BooleanField source="isActive" />
        </Datagrid>
      )}
    </List>
  );
};

export default VisitorList;
