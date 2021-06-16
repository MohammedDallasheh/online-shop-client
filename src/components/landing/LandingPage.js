import React from "react";

import { Divider } from "antd";
import { Link } from "react-router-dom";

import Loading from "../layout/Loading";
import Carousel from "./Carousel";
import CardSlider from "../layout/CardSlider";
import UserCard from "../cards/UserCard";
import CategoryCard from "../cards/CategoryCard";
import ProductCard from "../cards/ProductCard";

import { useFetch } from "../../function/useFetch";

const LandingPage = () => {
  const { status, data } = useFetch("api/display/landingpage");
  return status ? (
    <Loading />
  ) : (
    <>
      <Carousel items={data?.homepageCarousel?.items} />

      <Divider className="my-5">
        <Link to="/products">
          <span className="h2 text-primary font-weight-bold">Sales</span>
        </Link>
      </Divider>
      <CardSlider items={data?.homepageSales?.items} Component={ProductCard} />
      <Divider className="my-5">
        <Link to="/categories">
          <span className="h2 text-primary font-weight-bold">Categories</span>
        </Link>
      </Divider>
      <CardSlider
        items={data?.homepageCategories?.items}
        Component={CategoryCard}
      />
      <Divider className="my-5">
        <Link to="/users">
          <span className="h2 text-primary font-weight-bold">Users</span>
        </Link>
      </Divider>
      <CardSlider items={data?.homepageUsers?.items} Component={UserCard} />
      <div className="my-5" />
    </>
  );
};

export default LandingPage;
