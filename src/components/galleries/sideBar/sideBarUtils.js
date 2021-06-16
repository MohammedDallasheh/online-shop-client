import { parse, stringify } from 'query-string';

export const mapFiltersOptions = (filtersOptions) => () =>
  filtersOptions?.map((filter) => {
    if (filter.type !== 'value') return filter;
    return {
      ...filter,
      items: filter?.items?.reduce(
        (prev, curr) => ({ ...prev, [curr._id]: curr }),
        {}
      ),
    };
  });

export const parseUrlFilters = ({ search, filtersOptions }) => {
  const parseFilters = { ...parse(search), page: 1 };

  filtersOptions.forEach(({ type, value, name, items }) => {
    const parsedfilter = parseFilters[value];
    if (!parsedfilter?.length) return;
    if (type === 'range') {
      parseFilters[value] = {
        range: {
          name: `${name} Range`,
          _id: parsedfilter,
        },
      };
    }
    if (type === 'value') {
      parseFilters[value] = {};
      if (typeof parsedfilter === 'string') {
        parseFilters[value][parsedfilter] = items[parsedfilter];
      } else {
        parsedfilter?.forEach((filterId) => {
          parseFilters[value][filterId] = items[filterId];
        });
      }
    }
  });
  if (parseFilters.q)
    parseFilters.q = {
      q: { _id: parseFilters.q, name: parseFilters.q },
    };

  return parseFilters;
};

export const stringifyFilters = (selectedFilters) => {
  const newSelectedFilters = Object.fromEntries(
    Object.entries(selectedFilters).map(([type, filters]) => {
      if (typeof filters === 'string' || Array.isArray(filters))
        return [type, filters];
      if (typeof filters === 'object')
        return [type, Object.values(filters).map(({ _id }) => _id)];
      return [type, null];
    })
  );
  return `?${stringify(newSelectedFilters, { skipNull: true })}`;
};
