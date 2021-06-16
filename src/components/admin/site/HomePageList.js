import React from "react";
import { Fragment, useCallback, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { List, useDataProvider } from "react-admin";
import { Divider, Tabs, Tab } from "@material-ui/core";
import { Table, Button } from "antd";
import Search from "../../header/Search";
const tabsNames = ["Carousel", "Sales", "Categories", "Users"];

export const tabs = tabsNames.map((tab) => ({
  id: "homepage" + tab,
  name: tab,
}));

const objectFilter = (properties) => (obj) =>
  properties?.length
    ? properties.reduce((newObj, property) => {
        if (typeof property === "string") newObj[property] = obj[property];
        if (typeof property === "object")
          newObj[property?.name] = property.parse(obj);
        return newObj;
      }, {})
    : obj;

const dataMap = (data, tab) => {
  const tabsMap = {
    homepageCarousel: ["title", "price", "offer", "id"],
    homepageSales: ["title", "price", "id"],
    homepageCategories: ["name", "title", "id"],
    homepageUsers: [
      {
        name: "name",
        parse: ({ name }) => `${name.first} ${name.last}`,
      },
      "email",
      "role",
      "id",
    ],
  };

  return data.map(objectFilter(tabsMap[tab]));
};

const tabToResource = (tab) => {
  const resources = {
    homepageCarousel: "product",
    homepageSales: "product",
    homepageCategories: "category",
    homepageUsers: "user",
  };
  return resources[tab] ?? "";
};

const searchValueParse = (tab) => {
  const valueParses = {
    homepageCarousel: ({ title }) => title,
    homepageSales: ({ title }) => title,
    homepageCategories: ({ name }) => name,
    homepageUsers: ({ name, email, role }) =>
      `${role.padStart(10, "*")}  || ${name.first}  ${
        name.last
      } ------  ${email}`,
  };
  return valueParses[tab] ?? ((a) => a);
};

const TabbedDatagrid = () => {
  const dataProvider = useDataProvider();
  const [selectedTab, setSelectedTab] = useState("homepageCarousel");
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const [resource, setResource] = useState("product");

  useEffect(() => {
    fetchData();
  }, [selectedTab]);

  const fetchData = useCallback(async () => {
    let { data: displayArray } = await dataProvider.getList("display", {
      filter: { name: selectedTab },
      sort: {},
      pagination: { page: 1, perPage: 50 },
    });
    displayArray = dataMap(displayArray, selectedTab);
    const columns = Object.keys(displayArray[0]).map((key) => ({
      title: key.toUpperCase(),
      dataIndex: key,
      key,
    }));

    columns.push({
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Button onClick={() => onDelete(record)}>Delete</Button>
      ),
    });

    setColumns(columns);
    setData(displayArray);
  }, [selectedTab]);

  const onDelete = async ({ id }) => {
    await dataProvider.delete(`display/${selectedTab}`, { id });
    fetchData();
  };

  const handleTabChange = (e, value) => {
    setSelectedTab(value);
    setResource(tabToResource(value));
  };
  const onSearchSelect = async (data, options) => {
    await dataProvider.create(`display/${selectedTab}/${options._id}`, {});
    fetchData();
  };
  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={selectedTab}
        indicatorColor="primary"
        onChange={handleTabChange}
      >
        {tabs.map(({ name, id }, i) => (
          // <Tab key={id + "-" + i} label={name} value={id} />
          <Tab key={uuidv4()} label={name} value={id} />
        ))}
      </Tabs>
      <Divider />
      <h4 className="text-primary text-center mt-2">
        {resource.toUpperCase()}
      </h4>
      <div className="py-3 text-center bg-light">
        <Search
          resource={resource}
          onSelect={onSearchSelect}
          valueParse={searchValueParse(selectedTab)}
          addCurrentSearch={false}
        />
      </div>
      <Table
        columns={columns}
        rowKey={() => uuidv4()}
        // rowKey="uid"
        // rowKey={(record) => {
        //   console.log({ record });
        //   // return `${record.id}-${resource}`;
        //   return uuidv4();
        // }}
        dataSource={data}
        pagination={{ position: ["none", "none"] }}
      />
    </Fragment>
  );
};

const HomePage = (props) => (
  <List
    {...props}
    pagination={null}
    bulkActionButtons={false}
    resource="display"
    filterDefaultValues={{ name: "homepageCarousel" }}
  >
    <TabbedDatagrid />
  </List>
);

export default HomePage;
