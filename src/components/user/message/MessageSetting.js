import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { useDispatch } from 'react-redux';

import {
  setUnread,
  deleteMessage,
} from '../../../actions/user/index';
import { replayRedirectUrl, forwardRedirectUrl } from './function';

const MessageSetting = ({ message, children, ...rest }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const setting = {
    Replay: () => {
      history.push(replayRedirectUrl(message));
      if (message?.unread) setting.Unread(false);
    },
    Forward: () => {
      history.push(forwardRedirectUrl(message));
      if (message?.unread) setting.Unread(false);
    },
    Delete: () => dispatch(deleteMessage(message._id)),
    Unread: (unread) =>
      dispatch(setUnread(message._id, unread ?? !message?.unread)),
  };

  const menu = (
    <Menu>
      {Object.entries(setting)?.map(([name, action], i) => (
        <Menu.Item
          key={i}
          type="button"
          className={'list-group-item list-group-item-action'}
          onClick={({ domEvent }) => {
            domEvent.stopPropagation();
            action();
          }}
        >
          {name}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} {...rest}>
      <div>{children}</div>
    </Dropdown>
  );
};

export default MessageSetting;
