import React from "react";

import { Card as MuiCard, CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOnOutlined";

import { FilterList, FilterListItem, FilterLiveSearch } from "react-admin";
import {
  endOfYesterday,
  startOfWeek,
  startOfYear,
  subWeeks,
  startOfMonth,
  subMonths,
  subYears,
} from "date-fns";

const Card = withStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      order: -1,
      width: "15em",
      marginRight: "1em",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}))(MuiCard);

const Aside = () => (
  <Card>
    <CardContent>
      <FilterLiveSearch />

      <FilterList
        label="resources.customers.filters.last_register"
        icon={<AccessTimeIcon />}
      >
        <FilterListItem
          label="resources.customers.filters.today"
          value={{
            registered: {
              $gte: endOfYesterday().toISOString(),
            },
          }}
        />
        <FilterListItem
          label="resources.customers.filters.this_week"
          value={{
            registered: {
              $gte: startOfWeek(new Date()).toISOString(),
            },
          }}
        />
        <FilterListItem
          label="resources.customers.filters.last_week"
          value={{
            registered: {
              $gte: subWeeks(startOfWeek(new Date()), 1).toISOString(),
              $lte: startOfWeek(new Date()).toISOString(),
            },
          }}
        />
        <FilterListItem
          label="resources.customers.filters.this_month"
          value={{
            registered: {
              $gte: startOfMonth(new Date()).toISOString(),
            },
          }}
        />
        <FilterListItem
          label="resources.customers.filters.last_month"
          value={{
            registered: {
              $gte: subMonths(startOfMonth(new Date()), 1).toISOString(),
              $lte: startOfMonth(new Date()).toISOString(),
            },
          }}
        />
        <FilterListItem
          label="resources.customers.filters.last_year"
          value={{
            registered: {
              $gte: subYears(startOfYear(new Date()), 1).toISOString(),
              $lte: startOfYear(new Date()).toISOString(),
            },
          }}
        />
      </FilterList>

      <FilterList
        label="resources.customers.filters.role"
        icon={<MonetizationOnIcon />}
      >
        <FilterListItem
          label="resources.customers.filters.admin"
          value={{ role: "admin" }}
        />
        <FilterListItem
          label="resources.customers.filters.seller"
          value={{ role: "seller" }}
        />
        <FilterListItem
          label="resources.customers.filters.customer"
          value={{ role: "subscriber" }}
        />
      </FilterList>
      <FilterList
        label="resources.customers.filters.active"
        icon={<MonetizationOnIcon />}
      >
        <FilterListItem label="ra.boolean.true" value={{ isActive: true }} />
        <FilterListItem label="ra.boolean.false" value={{ isActive: false }} />
      </FilterList>
      <FilterList
        label="resources.customers.filters.lock"
        icon={<MonetizationOnIcon />}
      >
        <FilterListItem
          label="ra.boolean.true"
          value={{ isLock: { $ne: false } }}
        />
        <FilterListItem label="ra.boolean.false" value={{ isLock: false }} />
      </FilterList>
    </CardContent>
  </Card>
);

export default Aside;
