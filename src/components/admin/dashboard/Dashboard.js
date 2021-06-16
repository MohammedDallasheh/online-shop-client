import React, { useState, useEffect, useCallback } from "react";
import { useVersion, useDataProvider } from "react-admin";
import { useMediaQuery, Theme } from "@material-ui/core";
import { subDays } from "date-fns";

import MonthlyRevenue from "./MonthlyRevenue";
import NbNewOrders from "./NbNewOrders";
import PendingOrders from "./PendingOrders";
import NewCustomers from "./NewCustomers";
import OrderChart from "./OrderChart";
import PrivateComponent from "../layout/PrivateComponent";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Spacer = () => <span style={{ width: "1em" }} />;
const VerticalSpacer = () => <span style={{ height: "1em" }} />;

const Dashboard = () => {
  const [state, setState] = useState({});
  const version = useVersion();
  const dataProvider = useDataProvider();
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const fetchOrders = useCallback(async () => {
    const aMonthAgo = subDays(new Date(), 30);

    const { data: recentOrders } = (await dataProvider.getList("orders", {
      filter: { createdAt: { $gte: aMonthAgo.toISOString() } },
      sort: { field: "createdAt", order: "DESC" },
      pagination: { page: 1, perPage: 50 },
    })) || { data: [] };
    const aggregations = recentOrders
      .filter((order) => order?.status?.statusType !== "Cancelled")
      .reduce(
        (stats, order) => {
          if (order?.status?.statusType !== "Cancelled") {
            // console.log(order, order.payment.amount);
            stats.revenue += order.payment.amount;
            stats.nbNewOrders++;
          }
          if (order.status.statusType === "Not Processed") {
            stats?.pendingOrders?.push(order);
          }
          return stats;
        },
        {
          revenue: 0,
          nbNewOrders: 0,
          pendingOrders: [],
        }
      );
    setState((state) => ({
      ...state,
      recentOrders,
      revenue: aggregations?.revenue?.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
      nbNewOrders: aggregations.nbNewOrders,
      pendingOrders: aggregations.pendingOrders,
    }));
    try {
      var { data: customers } = await dataProvider.getMany("customers", {
        ids: aggregations.pendingOrders.map((order) => order?.buyerId),
      });
    } catch (err) {
      console.log(err);
    }
    setState((state) => ({
      ...state,
      pendingOrdersCustomers: customers.reduce((prev, customer) => {
        prev[customer.id] = customer; // eslint-disable-line no-param-reassign
        return prev;
      }, {}),
    }));
  }, [dataProvider]);

  useEffect(() => {
    fetchOrders();
  }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    nbNewOrders,
    pendingOrders,
    pendingOrdersCustomers,
    revenue,
    recentOrders,
  } = state;
  return isXSmall ? (
    <div>
      <div style={styles.flexColumn}>
        <MonthlyRevenue value={revenue} />
        <VerticalSpacer />
        <NbNewOrders value={nbNewOrders} />
        <VerticalSpacer />
        <PendingOrders
          orders={pendingOrders}
          customers={pendingOrdersCustomers}
        />
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn}>
      <div style={styles.flex}>
        <MonthlyRevenue value={revenue} />
        <Spacer />
        <NbNewOrders value={nbNewOrders} />
      </div>
      <div style={styles.singleCol}>
        <OrderChart orders={recentOrders} />
      </div>
      <div style={styles.singleCol}>
        <PendingOrders
          orders={pendingOrders}
          customers={pendingOrdersCustomers}
        />
      </div>
    </div>
  ) : (
    <>
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            <MonthlyRevenue value={revenue} />
            <Spacer />
            <NbNewOrders value={nbNewOrders} />
          </div>
          <div style={styles.singleCol}>
            <OrderChart orders={recentOrders} />
          </div>
          <div style={styles.singleCol}>
            <PendingOrders
              orders={pendingOrders}
              customers={pendingOrdersCustomers}
            />
          </div>
        </div>
        <PrivateComponent roles="admin">
          <div style={styles.rightCol}>
            <div style={styles.flex}>
              <Spacer />
              <NewCustomers />
            </div>
          </div>
        </PrivateComponent>
      </div>
    </>
  );
};

export default Dashboard;
