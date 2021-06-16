import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import NotFound from "../layout/NotFound";
import PrivateRoute from "../routing/PrivateRoute";
import LandingPage from "../landing/LandingPage";
import SignInProvider from "../auth/SignInProvider";
import SignTabs from "../auth/SignTabs";
import CheckOut from "../checkOut/CheckOut";
import Cart from "../cart/Cart";
import UserTabs from "../user/UserTabs";
import Products from "../produtcs/Products";
import Product from "../product/Product";
import UsersAndCategoryGallery from "../galleries/UsersAndCategoryGallery";
import AdminPage from "../admin/AdminPage";
import About from "../layout/About";
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/about" component={About} />

      <Route exact path="/SignInProvider" component={SignInProvider} />
      <Redirect exact from="/sign" to="/sign/in" />
      <Route exact path="/sign/:inOrUp" component={SignTabs} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/users/:user/products" component={Products} />
      <Route exact path="/category/:category/products" component={Products} />
      <Route exact path="/product/:id" component={Product} />
      <Route exact path="/users" component={UsersAndCategoryGallery} />
      <Route exact path="/categories" component={UsersAndCategoryGallery} />
      <PrivateRoute exact path="/cart" component={Cart} />
      <PrivateRoute exact path="/checkout/:sellerId" component={CheckOut} />

      <PrivateRoute from="/user" component={UserTabs} />

      <Route path="/user-mangment" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
