import React from "react";
import { Route, Redirect } from "react-router-dom";
import InvoiceList from "./invoices/InvoiceList";

export default [
  <Route
    exact
    path="/invoices/:id"
    render={({ match }) => {
      return (
        <Redirect
          to={{
            pathname: "/invoices",
            search: `?id=${match.params.id}`,
          }}
        />
      );
    }}
  />,
];
