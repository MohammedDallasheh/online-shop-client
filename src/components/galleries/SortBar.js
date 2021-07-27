import React, { Fragment } from "react";

import { useHistory } from "react-router-dom";
import { parse, stringify } from "query-string";
import { Select } from "antd";

// The component
const SortBar = ({ sortsOptions }) => {
  const history = useHistory();
  const query = parse(history.location.search);

  const selectedSorts = query.sort || [];

  const options = sortsOptions
    ?.map((sort) => [
      { label: `${sort} ↑`, value: sort },
      { label: `${sort} ↓`, value: `-${sort}` },
    ])
    .flat();

  const search = (values) => {
    const lastSelected = values[values.length - 1];
    const sort = values.filter(
      (value) => !value.endsWith(lastSelected.slice(1))
    );
    sort.unshift(lastSelected);
    history.push(`?${stringify({ ...query, sort, page: 1 })}`);
  };

  return !sortsOptions ? (
    <Fragment></Fragment>
  ) : (
    <Select
      mode="multiple"
      placeholder="Sort"
      value={[selectedSorts].flat()}
      style={{ width: 200 }}
      notFoundContent={null}
      allowClear
      maxTagCount={2}
      onChange={search}
      options={options}
    />
  );
};

export default SortBar;
