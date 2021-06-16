import React, { useState, useEffect, useMemo } from 'react';

import { useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
import { Select, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const SideBarHeader = ({
  filtersOptions,
  selectedFilters,
  setSelectedFilters,
}) => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');

  // useEffect(() => handleSearch(), [selectedFilters]);

  const options = useMemo(
    () =>
      [...filtersOptions, { value: 'q' }]
        .filter(({ value }) => selectedFilters[value])
        .map(({ value }) => {
          return Object.values(selectedFilters[value]).map(
            ({ _id, name }) => ({
              label: name,
              value: _id,
              type: value,
            })
          );
        })
        .flat(),
    [selectedFilters]
  );

  const handleDeselect = (_, option) => {
    const { value, type } = option;
    const { range, q, [value]: __, ...rest } = selectedFilters[type];

    const isEmpty = !Object.keys(rest).length;

    setSelectedFilters({
      ...selectedFilters,
      [type]: !isEmpty && rest,
    });
  };

  const handleClear = () => {
    const newSelectedFilters = { ...selectedFilters };
    options.forEach(({ type }) => {
      newSelectedFilters[type] = false;
    });
    setSelectedFilters(newSelectedFilters);
  };

  const handleFreeText = (value) => {
    setSelectedFilters({
      ...selectedFilters,
      q: !!value && { q: { _id: value, name: value } },
    });
    setSearchValue('');
  };

  const handleSearch = () => {
    const newSelectedFilters = Object.fromEntries(
      Object.entries(selectedFilters).map(([type, filters]) => {
        if (typeof filters === 'string' || Array.isArray(filters))
          return [type, filters];
        if (typeof filters === 'object')
          return [type, Object.values(filters).map(({ _id }) => _id)];
        return [type, null];
      })
    );
    history.push(
      `?${stringify(newSelectedFilters, { skipNull: true })}`
    );
  };

  const config = {
    search: {
      placeholder: 'Free Text',
      className: 'mb-3',
      allowClear: true,
      value: searchValue,
      onChange: ({ target }) => setSearchValue(target.value),
      onSearch: handleFreeText,
    },
    searchBtn: {
      type: 'primary',
      icon: <SearchOutlined />,
      className: 'w-100',
      onClick: handleSearch,
    },

    select: {
      mode: 'multiple',
      open: false,
      allowClear: true,
      className: 'w-100',
      placeholder: 'Filters',
      notFoundContent: null,
      showSearch: true,
      value: options.map(({ value }) => value),
      options: options,
      onDeselect: handleDeselect,
      onClear: handleClear,
    },
  };

  return (
    <div>
      <Search {...config.search} />
      <Select {...config.select} />
      <Button {...config.searchBtn}>Search</Button>
    </div>
  );
};

export default SideBarHeader;
