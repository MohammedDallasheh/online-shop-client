import React from "react";
import "./Carousel.css";

import { Link } from "react-router-dom";
import { Image } from "antd";

const defaultItems = [
  {
    imgs: [{ url: "", alt: "" }],
    title: "Welcome To Our Site",
    description: "Welcome To Our Site",
  },
];

const Carousel = ({ items = defaultItems }) => (
  <div
    id="carouselIndicators"
    className="carousel slide"
    data-ride="carousel"
    data-interval={false}
  >
    <ol className="carousel-indicators">
      {items?.map((_, key) => (
        <li
          data-target="#carouselIndicators"
          data-slide-to={key}
          className={`mx-2 mx-md-3 mx-xl-5 ${!key ? "active" : ""}`}
          key={key}
        />
      ))}
    </ol>
    <div className="carousel-inner">
      {items?.map((product, key) => (
        <div className={`carousel-item ${!key ? "active" : ""}`} key={key}>
          <Image
            className="d-block w-100"
            width="100%"
            height="500px"
            src={product?.imgs?.[0]?.url}
            alt={product?.imgs?.[0]?.alt}
            preview={false}
            placeholder
          />
          <Link to={`product/${product?._id}`}>
            <div className="carousel-caption  d-md-block text-danger">
              <h5>{product?.title}</h5>
              <p className="d-none d-lg-block">{product?.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
    <a
      className="carousel-control-prev"
      href="#carouselIndicators"
      role="button"
      data-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="sr-only">Previous</span>
    </a>
    <a
      className="carousel-control-next"
      href="#carouselIndicators"
      role="button"
      data-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="sr-only">Next</span>
    </a>
  </div>
);

export default Carousel;
