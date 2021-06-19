import * as React from "react";
import { Fragment, useCallback, useEffect, useState } from "react";
import {
  Datagrid,
  DateField,
  List,
  ListContextProvider,
  NumberField,
  ReferenceField,
  TextField,
  useListContext,
  useDataProvider,
  useGetOne,
  useGetList,
  useNotify,
  useQuery,
} from "react-admin";
import { useSelector } from "react-redux";
import { useMediaQuery, Divider, Tabs, Tab } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import NbItemsField from "./NbItemsField";
import CustomerReferenceField from "../visitors/CustomerReferenceField";
import AddressField from "../visitors/AddressField";
import MobileGrid from "./MobileGrid";
import OrderFilter from "./OrderFilter";
import axios from "axios";

const useDatagridStyles = makeStyles({
  total: { fontWeight: "bold" },
});

const statusTypes = [
  "Not Processed",
  "Processing",
  "Shippeng",
  "Arrive",
  "Completed",
  "Cancelled",
];
export const tabs = statusTypes.map((status) => ({
  id: status,
  name: status,
}));

const useGetTotals = (enabled) => {
  const { data } = useQuery({
    type: "fetchData",
    resource: "orders",
    payload: "info/statuses",
  });
  if (data)
    statusTypes.forEach((status) => {
      // console.log(data, status);
      if (!data[status]) data[status] = "0";
    });
  return { ...data };
};

const TabbedDatagrid = (props) => {
  const role = useSelector(({ auth }) => auth?.user?.role);

  const listContext = useListContext();
  const { ids, filterValues, setFilters, displayedFilters } = listContext;

  const classes = useDatagridStyles();
  const dataProvider = useDataProvider();
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  // const [totals, setTotals] = useState({});
  // useGetTotals().then((data) => setTotals(data));
  const totals = useGetTotals();

  // console.log(`totals`, totals);

  const [idsState, setIdsState] = useState({
    selected: "",
  });

  useEffect(() => {
    if (ids && ids !== filterValues.status) {
      setIdsHandler(ids);
      // console.log(`useEffect`);
    }
    // return () => {
    //   ids.length = 0;
    //   setIdsState({
    //     selected: '',
    //   });
    // };
  }, [ids, filterValues.status]);

  function setIdsHandler(ids) {
    setIdsState((state) => ({ ...idsState, [state.selected]: ids }));
  }
  function getIdsHandler() {
    return idsState[idsState.selected];
  }

  const handleChange = useCallback(
    (event, value) => {
      if (value === idsState.selected) value = "";
      setIdsState((state) => ({ ...state, selected: value }));
      setFilters &&
        setFilters(
          { ...filterValues, "status.statusType": value },
          displayedFilters
        );
    },
    [displayedFilters, filterValues, setFilters, ids.selected]
  );
  // console.log(`ids`, ids);
  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={idsState.selected || false}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map(({ id, name }, i) => (
          <Tab
            key={id + "-" + i}
            label={`${name} (${totals[name] || "..."})`}
            value={id}
          />
        ))}
      </Tabs>
      <Divider />
      {isXSmall ? (
        <ListContextProvider value={{ ...listContext, ids: idsState.selected }}>
          <MobileGrid {...props} ids={ids} />
        </ListContextProvider>
      ) : (
        <div>
          <ListContextProvider
            value={{
              ...listContext,
            }}
          >
            <Datagrid {...props} rowClick={role !== "subscriber" ? "edit" : ""}>
              <DateField source="createdAt" showTime />
              <DateField source="updatedAt" showTime />
              {/* <TextField source="reference" /> */}
              <CustomerReferenceField
                source="buyerId"
                link={role === "admin"}
              />
              <CustomerReferenceField
                source="sellerId"
                link={role === "admin"}
              />
              {/* <ReferenceField
                source="buyerId"
                reference="customers"
                link={false}
                label="resources.orders.fields.address"
              >
                <AddressField />
              </ReferenceField> */}
              <TextField
                source="address"
                label="resources.orders.fields.address"
              />

              <NbItemsField />
              <NumberField
                source="payment.amount"
                label="resources.orders.fields.amount"
                options={{
                  style: "currency",
                  currency: "USD",
                }}
                className={classes.total}
              />
              <TextField
                source="status.statusType"
                label="resources.orders.fields.status"
              />
            </Datagrid>
          </ListContextProvider>
        </div>
      )}
    </Fragment>
  );
};

const OrderList = (props) => (
  <List
    {...props}
    sort={{ field: "updatedAt", order: "DESC" }}
    perPage={25}
    filters={<OrderFilter />}
    bulkActionButtons={false}
  >
    <TabbedDatagrid />
  </List>
);

export default OrderList;
