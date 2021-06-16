import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs, Badge } from 'antd';
import { useSelector } from 'react-redux';

import MessagesList from './MessagesList';
import NewMessage from './NewMessage';

export const MessageTabs = () => {
  const history = useHistory();

  const { inbox, sent } = useSelector(({ auth }) => {
    const { _id, messages } = auth.user || {};
    const data = {
      inbox: { messages: [], unread: 0 },
      sent: { messages: [], unread: 0 },
    };

    let inboxOrSent = '';
    messages?.forEach((message) => {
      inboxOrSent = message?.from?._id == _id ? 'sent' : 'inbox';
      data[inboxOrSent].messages.push(message);
      message.unread && data[inboxOrSent].unread++;
    });

    return data;
  });

  const [activeKey, setActiveKey] = useState('inbox');

  const [userTab, messageTab] = history.location.pathname
    .split('/')
    .slice(2, 4);

  useEffect(() => {
    if (userTab != 'message') return;

    if (['inbox', 'sent', 'new'].includes(messageTab)) {
      setActiveKey(messageTab);
    } else {
      history.replace(`/user/message/inbox`);
      setActiveKey('inbox');
    }
  }, [messageTab]);

  const onTabClick = (key) => {
    history.push(`/user/message/${key}`);
    setActiveKey(key);
  };

  const badge = (count, text) => (
    <Badge count={count} offset={[8, -5]} style={{ zIndex: 99 }}>
      {text}
    </Badge>
  );

  return (
    <Tabs activeKey={activeKey} onTabClick={onTabClick} centered>
      <Tabs.TabPane tab={badge(inbox.unread, 'Inbox')} key="inbox">
        <MessagesList data={inbox.messages} />
      </Tabs.TabPane>

      <Tabs.TabPane tab={badge(sent.unread, 'Sent')} key="sent">
        <MessagesList data={sent.messages} />
      </Tabs.TabPane>

      <Tabs.TabPane tab="New" key="new">
        <NewMessage />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default MessageTabs;
