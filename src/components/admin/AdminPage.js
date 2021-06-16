import React, { useEffect } from "react";
import { Admin, Resource, useRedirect } from "react-admin";
import { BrowserRouter } from "react-router-dom";

import polyglotI18nProvider from "ra-i18n-polyglot";
import authProvider from "./authProvider";
import { Layout } from "./layout";
import { Dashboard } from "./dashboard";
import customRoutes from "./routes";
import englishMessages from "./i18n/en";

import visitors from "./visitors";
import orders from "./orders";
import products from "./products";
import invoices from "./invoices";
import categories from "./categories";
import siteSettings from "./site";
import dataProvider from "./dataProvider/dataProvider";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createHashHistory } from "history";
import { createBrowserHistory } from "history";
import { ConnectedRouter } from "connected-react-router";
import { push } from "connected-react-router";
import { changeLocation } from "./configuration/actions";

const history = createHashHistory({});
const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === "fr") {
    return import("./i18n/fr").then((messages) => messages.default);
  }
  // Always fallback on english
  return englishMessages;
}, "en");

const AdminPage = ({ history: homeHistory }) => {
  const dispatch = useDispatch();
  const role = useSelector(({ auth }) => auth?.user?.role);

  // useEffect(() => {
  //   console.log({ history, homeHistory });
  //   history.push(
  //     homeHistory.location.pathname.replace('/user-mangment', '')
  //   );
  //   console.log(
  //     homeHistory.location.pathname.replace('/user-mangment', '')
  //   );
  // }, []);

  useEffect(() => {
    dispatch(
      changeLocation({
        location: {
          pathname: homeHistory.location.pathname.slice(15),
          search: "",
          hash: "",
          state: null,
        },
        action: "PUSH",
        isFirstRendering: false,
      })
    );

    console.log({ history, homeHistory });
    return () => {
      dispatch(changeLocation());
    };
  }, []);

  const resourcesComp = {
    visitors: { ...visitors },
    orders: { ...orders },
    products: { ...products },
    invoices: { ...invoices },
    categories: { ...categories },
    siteSettings: { ...siteSettings },
  };

  if (role === "seller") {
    resourcesComp.categories.create = null;
    resourcesComp.categories.edit = null;
    resourcesComp.visitors.create = null;
    resourcesComp.visitors.edit = null;
  }
  if (role === "subscriber") {
    resourcesComp.categories = null;
    resourcesComp.products = null;
    resourcesComp.visitors = null;
    resourcesComp.orders.edit = null;
  }
  const resourceByRole = () => {
    const resources = {
      admin: [
        <Resource key="site" name="site" {...resourcesComp.siteSettings} />,
      ],
      seller: [
        <Resource
          key="categories"
          name="categories"
          {...resourcesComp.categories}
        />,
      ],
      subscriber: [
        <Resource key="orders" name="orders" {...resourcesComp.orders} />,
        <Resource key="products" name="products" {...resourcesComp.products} />,
        <Resource
          key="customers"
          name="customers"
          {...resourcesComp.visitors}
        />,
        <Resource key="invoices" name="invoices" {...resourcesComp.invoices} />,
        <Resource key="subs" name="subs" />,
        <Resource key="constants" name="constants" />,
        <Resource key="products" name="products/autocomplete" />,
      ],
    };

    if (role == "admin")
      return [...resources.admin, ...resources.seller, ...resources.subscriber];
    if (role == "seller") return [...resources.seller, ...resources.subscriber];
    if (role == "subscriber") return resources.subscriber;
    return [];
  };

  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider({}, (str = "") => {
        homeHistory.push("/" + str);
      })}
      dashboard={Dashboard}
      layout={Layout}
      i18nProvider={i18nProvider}
      history={history}
      disableTelemetry
      customRoutes={customRoutes}
    >
      {resourceByRole()}
    </Admin>
  );
};

export default AdminPage;
