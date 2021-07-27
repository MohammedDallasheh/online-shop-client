import React from "react";

import { Link } from "react-router-dom";
import { Image } from "antd";

import { imageFallback } from "../../utils/imageFallback";

const UserCard = ({ items = {} }) => {
  const { _id, name, avatar, description, email } = items;
  return (
    // <Link to={`/users/${_id}/products`}>
    <Link to={`/products?user=${_id}`}>
      <div className="card" style={{ height: "30rem", overflow: "hidden" }}>
        <Image
          className="card-img-top"
          alt={avatar?.alt}
          src={process.env.REACT_APP_API_SERVER + avatar?.url}
          width="100%"
          height="15rem"
          fallback={imageFallback}
        />
        <div className="card-body">
          <h5 className="card-title">
            {name?.first} {name?.last}
          </h5>
          <p
            className="card-text"
            style={{
              height: "7rem",
              overflow: "hidden",
            }}
          >
            {description?.slice(0, 150)}{" "}
          </p>
        </div>
        <div
          className="card-footer  text-center"
          style={{
            height: "5rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: " nowrap",
          }}
        >
          <small className="text-muted ">{email}</small>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
