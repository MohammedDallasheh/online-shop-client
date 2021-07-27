import React, { useState, useEffect, useRef } from "react";
import { AutoComplete } from "antd";
import { useFetch } from "../../function/useFetch";

const Search = ({
  resource = "product",
  onSelect,
  select = "title",
  valueParse,
  addCurrentSearch = true,
  ...rest
}) => {
  const { data, setUrl } = useFetch({
    defaultData: { docs: [] },
    dataMap: (data) =>
      data.docs.map((doc) => ({
        label: valueParse?.(doc) || doc[select],
        value: doc._id,
      })),
  });

  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState();
  const ref = useRef();

  useEffect(() => {
    setValue("");
    setOptions([]);
    setSearchText("");
    // onSearch('');
  }, [resource]);

  useEffect(() => {
    if (addCurrentSearch && searchText)
      setOptions([{ label: searchText, value: "currentSearch" }, ...data]);
    else setOptions(data);
  }, [data]);

  const onSearch = (text) => {
    setUrl(`/api/constants/auto-complate/${resource}?filter={"q":"${text}"}`);
    addCurrentSearch && setSearchText(text);
  };

  const internalOnSelect = (data, options) => {
    setValue("");
    setSearchText("");

    if (onSelect) onSelect(data, options);
    setOpen(false);
    onSearch("");
    ref.current.blur();
  };
  const onChange = (data) => {
    setValue(data);
  };
  return (
    <div className="pb-1">
      <AutoComplete
        value={value}
        options={options}
        onSelect={internalOnSelect}
        onSearch={onSearch}
        onChange={onChange}
        open={open}
        onFocus={() => {
          onSearch("");
          setOpen(true);
        }}
        onBlur={() => setOpen(false)}
        placeholder="input search text"
        className="w-100 "
        allowClear
        backfill
        defaultActiveFirstOption
        ref={(input) => (ref.current = input)}
        {...rest}
      />
    </div>
  );
};

export default Search;
