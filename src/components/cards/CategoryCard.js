import React from "react";

import { Link } from "react-router-dom";
import { Image } from "antd";
import { imageFallback } from "../../utils/imageFallback";

const CategoryCard = ({ items = {} }) => {
  const { _id, name, title, img } = items;
  return (
    // <Link to={`/category/${_id}/products`}>
    <Link to={`/products?category=${_id}`}>
      <div className="card" style={{ height: "28rem", overflow: "hidden" }}>
        <Image
          className="card-img-top"
          alt={img?.alt}
          src={img?.url}
          width="100%"
          height="15rem"
          fallback={imageFallback}
        />

        <div className="card-body text-center">
          <p className="card-text">{title?.slice(0, 150)} </p>
        </div>
        <div className="card-footer  text-center">
          <small className="text-muted ">{name}</small>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
