import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Tabs } from "antd";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignInRandom from "./SignInRandom";

const { TabPane } = Tabs;

const SignTabsCard = () => {
  //inOrUp => signIn OR signUp
  const { inOrUp } = useParams();
  const history = useHistory();
  const [activeKey, setActiveKey] = useState("in");

  useEffect(() => {
    if (["in", "up", "Random"].includes(inOrUp)) setActiveKey(inOrUp);
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
      <TabPane tab="Random" key="Random">
        <SignInRandom />
      </TabPane>
    </Tabs>
  );
};

export default SignTabsCard;
