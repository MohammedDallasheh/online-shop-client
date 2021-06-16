import React from 'react';
import { Link } from 'react-router-dom';

const tagColorClass = (name) => {
  if (typeof name != 'string') return 'badge-dark';
  const specialTags = {
    Specials: 'badge-secondary',
    Sales: 'badge-success',
    Hot: 'badge-warning',
    Trends: 'badge-info',
    New: 'badge-primary',
  };

  if (specialTags[name]) return specialTags[name];

  const colors = [
    'badge-danger',
    'badge-success',
    'badge-warning',
    'badge-info',
    'badge-primary',
    'badge-secondary',
    'badge-light',
    'badge-dark',
  ];
  const nameToNumber = [...name]?.reduce(
    (total, c) => total + c.charCodeAt(0),
    0
  );
  return colors[nameToNumber % 8];
};
const Tags = ({ tags, ...rest }) => {
  return (
    <div
      style={{ fontSize: '1rem' }}
      onClick={(e) => e.stopPropagation()}
      {...rest}
    >
      {tags?.map(({ name }, index) => (
        <Link
          to={`/products?tags.name=${name}`}
          key={index}
          className={`badge badge-pill text-light 
                      ${tagColorClass(name)} m-2`}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};

export default Tags;
