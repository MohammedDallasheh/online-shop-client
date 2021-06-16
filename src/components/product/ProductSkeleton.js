import React from 'react';

import { Divider, Skeleton, Spin } from 'antd';

const ProductSkeleton = () => {
  return (
    <Spin tip="Loading..." size="large" delay={500}>
      <div className="container text-center text-lg-left position-relative">
        <div className="row mt-5 justify-content-center">
          <div className="col-12 col-lg-6 pr-5 position-relative">
            <Skeleton.Image className="w-100 h-100" />
          </div>
          <div className="col-12 col-lg-6 pr-5">
            <Skeleton paragraph={{ rows: 3 }} />
            <Skeleton paragraph={{ rows: 2 }} />
          </div>
        </div>
        <Divider>
          <span className="h4">Description</span>
        </Divider>
        <div className="text-dark mt-2">
          <Skeleton paragraph={{ rows: 3 }} />
        </div>

        <Divider className="my-5">Related products</Divider>
        <div className="row ">
          <Skeleton.Image className="col-4 mx-auto" />
          <Skeleton.Image className="col-4 mx-auto" />
          <Skeleton.Image className="col-4 mx-auto" />
        </div>

        <Divider className="my-5">Reviews</Divider>
        <Skeleton paragraph={{ rows: 3 }} />
      </div>
    </Spin>
  );
};

export default ProductSkeleton;
