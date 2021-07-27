import React, { useState } from "react";

import { useSelector } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";

import { useMediaQuery, Theme, Box } from "@material-ui/core";
import { useTranslate, DashboardMenuItem, MenuItemLink } from "react-admin";

import visitors from "../visitors";
import orders from "../orders";
import invoices from "../invoices";
import products from "../products";
import categories from "../categories";
import SubMenu from "./SubMenu";
import PrivateComponent from "./PrivateComponent";

const Menu = ({ onMenuClick, dense = false }) => {
  const [state, setState] = useState({
    menuCatalog: true,
    menuSales: true,
    menuCustomers: true,
  });
  const translate = useTranslate();
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  const open = useSelector((state) => state.admin.ui.sidebarOpen);

  const handleToggle = (menu) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box mt={1}>
      <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
      <SubMenu
        handleToggle={() => handleToggle("menuSales")}
        isOpen={state.menuSales}
        sidebarIsOpen={open}
        name="pos.menu.sales"
        icon={<orders.icon />}
        dense={dense}
      >
        <MenuItemLink
          to={`/orders`}
          primaryText={translate(`resources.orders.name`, {
            smart_count: 2,
          })}
          leftIcon={<orders.icon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/invoices`}
          primaryText={translate(`resources.invoices.name`, {
            smart_count: 2,
          })}
          leftIcon={<invoices.icon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
      </SubMenu>
      <PrivateComponent roles={["admin", "seller"]}>
        <SubMenu
          handleToggle={() => handleToggle("menuCatalog")}
          isOpen={state.menuCatalog}
          sidebarIsOpen={open}
          name="pos.menu.catalog"
          icon={<products.icon />}
          dense={dense}
        >
          <MenuItemLink
            to={`/products`}
            primaryText={translate(`resources.products.name`, {
              smart_count: 2,
            })}
            leftIcon={<products.icon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
          />

          <MenuItemLink
            to={`/categories`}
            primaryText={translate(`resources.categories.name`, {
              smart_count: 2,
            })}
            leftIcon={<categories.icon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
          />
        </SubMenu>
      </PrivateComponent>
      <PrivateComponent roles={["admin", "seller"]}>
        <SubMenu
          handleToggle={() => handleToggle("menuCustomers")}
          isOpen={state.menuCustomers}
          sidebarIsOpen={open}
          name="pos.menu.users"
          icon={<visitors.icon />}
          dense={dense}
        >
          <MenuItemLink
            to={`/customers`}
            primaryText={translate(`resources.customers.name`, {
              smart_count: 2,
            })}
            leftIcon={<visitors.icon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
          />
        </SubMenu>
      </PrivateComponent>
      <PrivateComponent roles={["admin"]}>
        <SubMenu
          handleToggle={() => handleToggle("menuHomePage")}
          isOpen={state.menuCustomers}
          sidebarIsOpen={open}
          name="pos.menu.site"
          icon={<HomeIcon />}
          dense={dense}
        >
          <MenuItemLink
            to={`/site/`}
            primaryText={translate(`resources.site.homePage.name`)}
            leftIcon={<HomeIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
          />
        </SubMenu>
      </PrivateComponent>
    </Box>
  );
};

export default Menu;
