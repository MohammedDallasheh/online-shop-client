import React, { useState, useEffect } from "react";

import Scroll from "react-scroll";
import { Comment, Avatar, Form, Button } from "antd";
import { List, Input, Rate } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  addReviewToProduct,
  removeReviewToProduct,
} from "../../actions/product/index";

import Icon from "../layout/Icon";
const { TextArea } = Input;
const { Element, scroller } = Scroll;

const CommentFeild = (props) => {
  const dispatch = useDispatch();
  const { author, avatar, order, hasDeletePermission } = props;
  const { productId, commentId, commentText, datetime } = props;
  const defaultAvatar =
    "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

  return (
    <Comment
      datetime={datetime}
      author={author}
      avatar={avatar?.url || defaultAvatar}
      content={
        <div key={commentId}>
          {typeof order?.rate == "number" && (
            <Rate defaultValue={order?.rate} disabled />
          )}
          {/* {!!order && hasDeletePermission && (
            <Link to={`/user-mangment/invoices/${order?.orderId}`}>
              <Icon className="float-right btn" name="test83" size={1.5} />
            </Link>
          )} */}
          {hasDeletePermission && (
            <Icon
              className="float-right btn"
              name="test44"
              size={1.5}
              onClick={() =>
                dispatch(removeReviewToProduct(productId, commentId))
              }
            />
          )}
          <p>{commentText}</p>
        </div>
      }
    />
  );
};

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <CommentFeild {...props} />}
    pagination={{
      onChange: () =>
        scroller.scrollTo("product-review-section", {
          duration: 1000,
          delay: 50,
          smooth: true,
        }),
    }}
  />
);

const Editor = ({ onChange, onSubmit, submitting, text }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={text} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const ProductReview = ({ product, user }) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [submitting, setsubmitting] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    const comment = product?.reviews?.map(
      ({ _id, name, createdAt, text, user }) => ({
        author: user?.name?.first + " " + user?.name?.last,
        avatar: user?.avatar,
        order: userOrder(user?._id),
        hasDeletePermission: hasDeletePermission(user?._id),
        productId: product._id,
        commentId: _id,
        commentText: text,
        datetime: moment(createdAt?.slice(0, 16)).fromNow(),
      })
    );
    setComments(comment);
    setsubmitting(false);
  }, [product, user]);

  const hasDeletePermission = (userId) =>
    userId == user?._id || user?.role == "admin";

  const userOrder = (userId) =>
    product.orders.find(({ buyerId }) => buyerId == userId);

  const hasEditorPermission = () => user?._id;

  const handleSubmit = () => {
    if (!text) return;

    dispatch(addReviewToProduct(product._id, text));
    setsubmitting(true);
    setText("");
    scroller.scrollTo("product-review-section", {
      duration: 1000,
      delay: 50,
      smooth: true,
    });
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <Element name="product-review-section" />
      {comments?.length > 0 && <CommentList comments={comments} />}
      {hasEditorPermission() && (
        <Comment
          avatar={<Avatar src={user?.avatar?.url} alt={user?.avatar?.alt} />}
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              text={text}
            />
          }
        />
      )}
    </>
  );
};

export default ProductReview;
