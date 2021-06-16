import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs } from 'antd';

import UserSetting from './UserSetting';
import MessageTabs from './message/MessageTabs';
import UserList from './UserList';
import UserImages from './UserImages';

const { TabPane } = Tabs;

const WishList = () => <UserList listName="wishlist" />;
const lastViewed = () => <UserList listName="lastViewed" />;

const tabList = {
  setting: UserSetting,
  'user-images': UserImages,
  message: MessageTabs,
  'recently-viwed': lastViewed,
  wishlist: WishList,
};

const StringDisplay = ({ str = '' }) => (
  <span className="text-capitalize">{str?.replace('-', ' ')}</span>
);

export const UserTabs = () => {
  const history = useHistory();

  const [activeKey, setActiveKey] = useState('user-images');

  const userTab = history.location.pathname
    .split('/')?.[2]
    ?.toLowerCase();

  useEffect(() => {
    if (!!tabList[userTab]) {
      setActiveKey(userTab);
    } else {
      history.replace(`/user/setting`);
      setActiveKey('setting');
    }
  }, [userTab]);

  const onTabClick = (key) => {
    history.push(`/user/${key}`);
    setActiveKey(key);
  };
  return (
    <Tabs
      activeKey={activeKey}
      centered
      onTabClick={onTabClick}
      destroyInactiveTabPane
      className="mb-5"
      style={{ minHeight: '80vh' }}
    >
      {Object.entries(tabList).map(([key, Component]) => (
        <TabPane tab={<StringDisplay str={key} />} key={key}>
          <Component />
        </TabPane>
      ))}
    </Tabs>
  );
};

export default UserTabs;
