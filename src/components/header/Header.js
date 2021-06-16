import React, { useEffect } from 'react';
import './header.css';

import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Popover, Avatar } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import SignTabsCard from '../cards/SignTabsCard';
import NavUserMEnu from '../cards/NavUserMenu';
import CartPopup from '../cards/CartPopup';
import Icon from '../layout/Icon';
import NavSearch from './Search';
import { getProductsFilter } from '../../actions/product/index';
const { SubMenu } = Menu;

const stateSelector = ({ auth, products }) => ({
  user: auth.user,
  isAuth: auth.isAuth,
  filters: products.productsFilters?.filter((f) =>
    ['Tags', 'Category', 'Subs'].includes(f.name)
  ),
});

//***************** THE COMPONENT **************************** */
const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user, isAuth, filters } = useSelector(stateSelector);

  useEffect(() => dispatch(getProductsFilter()), []);

  const popupData = isAuth
    ? {
        title: <span>Hello {user?.name?.first || ''}</span>,
        content: <NavUserMEnu />,
        icon: <Avatar src={user?.avatar?.url} />,
      }
    : {
        title: <Link to="/sign">Hello..</Link>,
        content: <SignTabsCard />,
        icon: <Icon name="test35" size={2} />,
      };

  return (
    <Menu
      mode="horizontal"
      className="d-flex align-items-center header"
      selectable={false}
    >
      <Menu.Item key="logo" className="col col-md-2">
        <Link to="/">
          <div className="logo"></div>
        </Link>
      </Menu.Item>

      <SubMenu
        key="SubMenu1"
        className="h5 border-bottom-0 d-none d-lg-block"
        title={<Link to="/products">Products</Link>}
        icon={<DownOutlined />}
      >
        {filters?.map(({ name, value, items }) => (
          <SubMenu
            key={`subMenu-${name}`}
            className="h5 border-bottom-0"
            title={<Link to={`/products`}>{name}</Link>}
          >
            {items?.map((item) => (
              <Menu.Item
                key={`submenu-Products-${item?._id || item}`}
              >
                <Link to={`/products?${value}=${item?._id || item}`}>
                  {item?.name || item}
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </SubMenu>

      <Menu.Item
        key="search"
        className="col-lg-6  mt-2 mx-auto border-bottom-0 d-none d-md-block"
      >
        <NavSearch
          onSelect={(_, { _id, value }) => {
            if (_id) history.push(`/product/${_id}`);
            else history.push(`/products?q=${value}`);
          }}
        />
      </Menu.Item>

      {isAuth && (
        <Menu.Item
          key="cart"
          className="float-right border-bottom-0 order-first order-md-last"
        >
          <CartPopup />
        </Menu.Item>
      )}
      <Menu.Item
        key="user"
        className="float-right border-bottom-0 order-last"
      >
        <Popover
          placement="bottomRight"
          title={popupData.title}
          content={popupData.content}
          trigger="click"
          destroyTooltipOnHide={true}
        >
          <div style={{ width: '100%' }}>{popupData.icon}</div>
        </Popover>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
