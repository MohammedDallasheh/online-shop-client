import React from 'react';

const ValueFilter = ({
  list,
  selectedFilter = {},
  setSelectedFilter,
}) => {
  const handleClick = (_id) => {
    if (selectedFilter[_id]) {
      const { [_id]: toDelete, ...rest } = selectedFilter;
      const isEmpty = !Object.keys(rest).length;
      setSelectedFilter(!isEmpty && rest);
    } else {
      setSelectedFilter({ ...selectedFilter, [_id]: list[_id] });
    }
  };

  return (
    <div className="filter-container">
      {Object.values(list).map(({ _id, name }, key) => (
        <span
          key={key}
          className={`filter-row ${
            selectedFilter[_id] ? 'filter-row-active' : ''
          }`}
          onClick={() => handleClick(_id)}
        >
          {name}
        </span>
      ))}
    </div>
  );
};

export default ValueFilter;
