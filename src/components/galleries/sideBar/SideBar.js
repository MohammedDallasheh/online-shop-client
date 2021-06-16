import React, { useState, useEffect, useMemo } from 'react';
import './sideBar.css';

import { useLocation, useHistory } from 'react-router-dom';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

import RangeFilter from './RangeFilter';
import ValueFilter from './ValueFilter';
import MySider from './MySider';
import SideBarHeader from './SideBarHeader';
import {
  mapFiltersOptions,
  parseUrlFilters,
  stringifyFilters,
} from './sideBarUtils';

const { Panel } = Collapse;

const expandIcon = ({ isActive }) => (
  <CaretRightOutlined rotate={isActive ? 90 : 0} />
);

const SideBar = ({ filtersOptions = [] }) => {
  const history = useHistory();
  const { search } = useLocation();
  const [selectedFilters, setSelectedFilters] = useState({});

  filtersOptions = useMemo(mapFiltersOptions(filtersOptions), [
    search,
    filtersOptions,
  ]);

  useEffect(() => {
    setSelectedFilters(parseUrlFilters({ search, filtersOptions }));
  }, [filtersOptions]);

  const setValueFilter = (filterName) => (filterValue) => {
    handleState({
      ...selectedFilters,
      [filterName]: filterValue,
    });
  };
  const setRangeFilter = (filterName, label) => (range) => {
    handleState({
      ...selectedFilters,
      [filterName]: range && {
        range: { _id: range, name: `${label} Range` },
      },
    });
  };

  const handleState = (newSelectedFilters) => {
    setSelectedFilters(newSelectedFilters);
    history.push(stringifyFilters(newSelectedFilters));
  };

  return (
    <MySider>
      <SideBarHeader
        filtersOptions={filtersOptions}
        selectedFilters={selectedFilters}
        setSelectedFilters={handleState}
      />

      <Collapse
        expandIconPosition="right"
        className="text-center"
        expandIcon={expandIcon}
        defaultActiveKey="0"
        accordion
      >
        {filtersOptions.map(({ name, value, type, items }, key) => (
          <Panel
            header={name}
            key={key}
            className={`sidebar-collapse ${
              selectedFilters[value] ? 'sidebar-collapse-active' : ''
            }`}
          >
            {type === 'range' && (
              <RangeFilter
                maxMin={items}
                selectedRange={selectedFilters[value]}
                setSelectedRange={setRangeFilter(value, name)}
              />
            )}
            {type === 'value' && (
              <ValueFilter
                list={items}
                selectedFilter={selectedFilters[value]}
                setSelectedFilter={setValueFilter(value)}
              />
            )}
          </Panel>
        ))}
      </Collapse>
    </MySider>
  );
};

export default SideBar;
