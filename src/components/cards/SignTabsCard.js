import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Tabs } from 'antd';

import SignIn from './SignIn';
import SignUp from './SignUp';

const { TabPane } = Tabs;

const SignTabsCard = () => {
  const { inOrUp } = useParams();
  const history = useHistory();
  const [activeKey, setActiveKey] = useState('in');

  useEffect(() => {
    console.log({ inOrUp });
    if (['in', 'up'].includes(inOrUp)) setActiveKey(inOrUp);
  }, [inOrUp]);

  const tabHandler = (key) => {
    if (activeKey === key && !inOrUp) history.push(`/sign/${key}`);
    if (inOrUp) history.push(`/sign/${key}`);
    setActiveKey(key);
  };

  return (
    <Tabs activeKey={`${activeKey}`} centered onTabClick={tabHandler}>
      <TabPane tab="Sign In" key="in">
        <SignIn setActiveKey={setActiveKey} />
      </TabPane>
      <TabPane tab="Sign Up" key="up">
        <SignUp />
      </TabPane>
    </Tabs>
  );
};

export default SignTabsCard;
