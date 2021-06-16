import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Divider, Skeleton, Spin } from "antd";

import { getProduct, unloadProduct } from "../../actions/product/index";
import { addToUserList } from "../../actions/user/index";

import ProductSkeleton from "./ProductSkeleton";
import ProductReview from "./ProductReview";
import ProductGalary from "./productGalary";
import ProductInfo from "./ProductInfo";
import ProductCard from "../cards/ProductCard";
import CardSlider from "../layout/CardSlider";

const stateSelector = ({ auth, products }) => {
  const user = auth?.user;
  const { product, loading } = products;

  return { product, loading, user, isAuth: !!user?._id };
};

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, user, loading, isAuth } = useSelector(stateSelector);
  const { _id, imgs, stock, description, relatedProduct } = product;

  useEffect(() => {
    dispatch(getProduct(id));
    return () => dispatch(unloadProduct());
  }, [id]);

  useEffect(() => {
    if (isAuth && id && product._id)
      dispatch(addToUserList("lastViewed", product));
  }, [id, product, isAuth]);

  return loading ? (
    <ProductSkeleton />
  ) : (
    <div className="container text-center text-lg-left">
      <div className="row mt-5 justify-content-center">
        <div className="col-12 col-lg-6 pr-5 position-relative">
          <ProductGalary imgs={imgs} soldOut={!stock} />
        </div>
        <div className="col-12 col-lg-6 pr-5">
          <ProductInfo product={product} />
        </div>
      </div>
      <Divider>
        <span className="h4">Description</span>
      </Divider>
      <p className="text-dark mt-2">{description}</p>
      {relatedProduct && (
        <>
          <Divider className="my-5">Related products</Divider>
          <CardSlider items={relatedProduct} Component={ProductCard} />
        </>
      )}

      <Divider className="my-5" id="productReviews">
        Reviews
      </Divider>
      <ProductReview product={product} user={user} />
    </div>
  );
};

export default Product;
