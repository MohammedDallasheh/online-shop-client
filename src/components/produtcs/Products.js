import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';

import Loading from '../layout/Loading';
import Gallery from '../galleries/Gallery';
import ProductCard from '../cards/ProductCard';

import {
  getProducts,
  getProductsFilter,
} from '../../actions/product/index';

const Products = () => {
  let location = useLocation();
  const params = useParams();

  const dispatch = useDispatch();

  const { products, productsFilters, productsSorts } = useSelector(
    ({ products }) => products
  );

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    //check if the route is /user/:id/products
    dispatch(getProducts({ ...parsed, ...params }));
  }, [location]);

  useEffect(() => {
    dispatch(getProductsFilter());
  }, []);

  // return !products.docs ? (
  //   <Loading />
  // ) : (
  return (
    <Gallery
      items={products.docs}
      itemsNumber={products.totalDocs}
      Component={ProductCard}
      filtersOptions={productsFilters}
      sortsOptions={productsSorts}
      loading={false}
    />
  );
};

export default Products;
