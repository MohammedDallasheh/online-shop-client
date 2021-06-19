import React, { useState, useEffect } from "react";

import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { Pagination, BackTop, Empty } from "antd";

import SideBar from "./sideBar/SideBar";
import SortBar from "./SortBar";
import BreadcrumbBar from "./BreadcrumbBar";

const ItemsList = ({ items, Component, loading }) => (
  <div className="row">
    {items?.map((p, key) => (
      <div
        className="col-xl-3 col-lg-4 col-md-6  col-xs-12 p-2"
        key={`${key}-${p._id}`}
      >
        <Component items={p} loading={loading} />
      </div>
    ))}
  </div>
);
const EmptyList = ({ isEmpty = true }) =>
  isEmpty && (
    <div className="row" style={{ minHeight: "50vh" }}>
      <div className="col-12">
        <Empty />
      </div>
    </div>
  );

const Gallery = ({
  items = Array(12).fill(0),
  itemsNumber,
  Component,
  filtersOptions,
  sortsOptions,
  loading,
}) => {
  const [pagination, setPagination] = useState([1, 12]);
  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    setPagination([+parsed.page || 1, +parsed.limit || 12]);
    window.scrollTo(0, 0);
  }, [location]);

  const paginationHandler = async (page, limit) => {
    const parsed = queryString.parse(location.search);
    // parsed.range = [page * limit,(page+1)*limit];
    parsed.page = page;
    parsed.limit = limit;
    history.push(`?${queryString.stringify(parsed)}`);
  };

  return (
    <div className="d-flex flex-nowrap">
      {filtersOptions && <SideBar filtersOptions={filtersOptions} />}
      <div className="container" style={{ maxWidth: "100%" }}>
        <div className="row  justify-content-end p-3">
          {/* <BreadcrumbBar /> */}
          <SortBar sortsOptions={sortsOptions} />
        </div>

        <ItemsList items={items} Component={Component} loading={loading} />
        <EmptyList isEmpty={!items.length} />

        {!!itemsNumber && (
          <div className="row justify-content-center my-5">
            <Pagination
              current={pagination[0]}
              pageSize={pagination[1]}
              total={itemsNumber}
              className="d-none d-xl-flex"
              pageSizeOptions={[12, 16, 20, 24]}
              onChange={paginationHandler}
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
            />
            <Pagination
              current={pagination[0]}
              pageSize={pagination[1]}
              total={itemsNumber}
              className="d-none d-md-flex d-xl-none"
              pageSizeOptions={[12, 16, 20, 24]}
              onChange={paginationHandler}
              showQuickJumper
              size="small"
            />
            <Pagination
              current={pagination[0]}
              pageSize={pagination[1]}
              total={itemsNumber}
              className="d-md-none"
              pageSizeOptions={[12, 16, 20, 24]}
              onChange={paginationHandler}
              simple
            />
          </div>
        )}
        <BackTop />
      </div>
    </div>
  );
};

export default Gallery;
