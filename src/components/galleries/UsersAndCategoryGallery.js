import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";

import { useFetch } from "../../function/useFetch";

import Gallery from "../galleries/Gallery";
import UserCard from "../cards/UserCard";
import CategoryCard from "../cards/CategoryCard";

const UsersAndCategoryGallery = () => {
  const { status, data, setFetch } = useFetch();
  let location = useLocation();

  useEffect(() => {
    const { page = 1, limit = 12 } = parse(location.search);

    const [from, to] = [(page - 1) * limit, page * limit - 1];

    const userFilter =
      location.pathname == "/users" ? 'filter={"role":"seller"}&' : "";

    setFetch(`/api${location.pathname}?${userFilter}range=[${from},${to}]`);
  }, [location.search]);

  const componentGenerator = () =>
    location.pathname.includes("users") ? UserCard : CategoryCard;
  return (
    !status && (
      <Gallery
        items={data.docs}
        itemsNumber={data.totalDocs}
        Component={componentGenerator()}
        filtersOptions={data.filters}
        sortsOptions={data.sortOption}
        loading={status}
      />
    )
  );
};

export default UsersAndCategoryGallery;
