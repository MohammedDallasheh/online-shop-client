import * as React from 'react';
import { FC } from 'react';
import inflection from 'inflection';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LocalOfferIcon from '@material-ui/icons/LocalOfferOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  useGetList,
  useGetIdentity,
  useAuthProvider,
} from 'react-admin';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      width: '15em',
      marginRight: '1em',
      overflow: 'initial',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const Aside = () => {
  // const { identity } = useGetIdentity();
  const { data, ids, ...rest } = useGetList(
    'categories',
    { page: 1, perPage: 100 },
    { field: 'updatedAt', order: 'ASC' },
    {}
  );
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <FilterLiveSearch />

        {/* <FilterList
          label="resources.products.filters.my"
          icon={<AttachMoneyIcon />}
        >
          <FilterListItem
            label="resources.products.filters.my"
            value={{ user: identity?._id }}
          />
        </FilterList> */}
        <FilterList
          label="resources.products.filters.sales"
          icon={<AttachMoneyIcon />}
        >
          <FilterListItem
            label="resources.products.filters.best_sellers"
            value={{
              sold: {
                $lte: undefined,
                $gte: 25,
              },
            }}
          />
          <FilterListItem
            label="resources.products.filters.average_sellers"
            value={{
              sold: {
                $lte: 25,
                $gte: 10,
              },
            }}
          />
          <FilterListItem
            label="resources.products.filters.low_sellers"
            value={{
              sold: {
                $lte: 10,
                $gte: 0,
              },
            }}
          />
          <FilterListItem
            label="resources.products.filters.never_sold"
            value={{ sold: 0 }}
          />
        </FilterList>

        <FilterList
          label="resources.products.filters.stock"
          icon={<BarChartIcon />}
        >
          <FilterListItem
            label="resources.products.filters.no_stock"
            value={{
              stock: 0,
            }}
          />
          <FilterListItem
            label="resources.products.filters.low_stock"
            value={{
              stock: {
                $lte: 10,
                $gte: 0,
              },
            }}
          />
          <FilterListItem
            label="resources.products.filters.average_stock"
            value={{
              stock: {
                $lte: 50,
                $gte: 9,
              },
            }}
          />
          <FilterListItem
            label="resources.products.filters.enough_stock"
            value={{
              stock: {
                $lte: undefined,
                $gte: 49,
              },
            }}
          />
        </FilterList>

        <FilterList
          label="resources.products.filters.categories"
          icon={<LocalOfferIcon />}
        >
          {ids &&
            data &&
            ids.map((id) => (
              <FilterListItem
                label={inflection.humanize(data[id].name)}
                key={data[id].id}
                value={{ category: data[id].id }}
              />
            ))}
        </FilterList>
      </CardContent>
    </Card>
  );
};

export default Aside;
