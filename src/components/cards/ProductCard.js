import React from 'react';

import { Card, Rate, Image, Tooltip } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Icon from '../layout/Icon';
import { imageFallback } from '../../utils/imageFallback';
import Tags from '../product/Tags';
import { rateTooltips } from '../../function/rateCounter';
import {
  addProductToCart,
  removeProductFromCart,
  addToUserList,
  deleteFromUserList,
} from '../../actions/user/index';

const { Meta } = Card;

const PreviewMask = ({ tags }) => (
  <div>
    <div>OPEN</div>
    <Tags
      tags={tags}
      style={{
        fontSize: '0.8rem',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 30,
      }}
    />
  </div>
);

const stateSelect = (_id) => {
  return ({ auth }) => {
    const { cart = [], wishlist = [] } = auth?.user || {};
    const check = (arr) => arr?.some((product) => product._id == _id);
    return [check(cart), check(wishlist)];
  };
};

const saveCalc = (price, offer) =>
  `Save: ${0 | ((1 - offer / price) * 100)}%`;

//***************** THE COMPONENT **************************** */
const ProductCard = ({ items = {} }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const product = items;
  const { _id, title, description, rate } = product;
  const { price, offer, tags, stock, orders } = product;
  const img = product?.imgs?.[0] || {};

  const [isInCart, isInWishlist] = useSelector(stateSelect(_id));
  const isAuth = useSelector(({ auth }) => !!auth?.user?._id);

  return (
    <Card
      loading={!product}
      cover={
        <div>
          <Image
            alt={img?.alt}
            src={`${img?.url}`}
            width="100%"
            height="250px"
            fallback={imageFallback}
            onClick={() => history.push(`/product/${_id}`)}
            preview={{
              mask: <PreviewMask tags={tags} />,
            }}
          />
        </div>
      }
      actions={
        !isAuth
          ? [
              <Link to={`/product/${_id}`}>
                <Icon name="test63" size={2} />
              </Link>,
            ]
          : [
              stock ? (
                <Icon
                  name="test10"
                  key={`test10-${_id}`}
                  size={2}
                  color={isInCart ? 'red' : 'black'}
                  hover={false}
                  clickable={false}
                  onClick={() =>
                    dispatch(
                      isInCart
                        ? removeProductFromCart(_id)
                        : addProductToCart(product, 1)
                    )
                  }
                />
              ) : (
                <Tooltip title="OUT OF STOCK">
                  <Icon
                    name="test46"
                    key={`test46-${_id}`}
                    size={2}
                  />
                </Tooltip>
              ),
              <Link to={`/product/${_id}`}>
                <Icon name="test63" size={2} />
              </Link>,
              <Icon
                name="test54"
                key={`test54-${_id}`}
                size={2}
                color={isInWishlist ? 'red' : 'black'}
                hover={false}
                clickable={false}
                onClick={() =>
                  dispatch(
                    isInWishlist
                      ? deleteFromUserList('wishlist', _id)
                      : addToUserList('wishlist', product)
                  )
                }
              />,
            ]
      }
    >
      <Meta //css class
        title={
          <Link to={`/product/${_id}`} className="p-card-title w-100">
            {title}
          </Link>
        }
        description={description}
        style={{
          height: '10rem',
          overflow: 'hidden',
        }}
      />
      <div className="text-center mt-3">
        <Rate
          disabled
          defaultValue={rate}
          tooltips={rateTooltips(orders)}
        />
        <div>
          <span className="h5 float-right mt-1 w-100">
            price:{' '}
            <span className={`${offer && 'line-through'}`}>
              {+price?.toFixed(2)}
            </span>
            {offer && (
              <Tooltip title={saveCalc(price, offer)}>
                <span className="ml-2">{+offer?.toFixed(2)}</span>
              </Tooltip>
            )}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
