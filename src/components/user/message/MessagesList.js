import React from 'react';
import { useHistory } from 'react-router-dom';
import { Collapse, Avatar, Tooltip, Popover, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { SettingOutlined } from '@ant-design/icons';

import MessageSetting from './MessageSetting';

import { setUnread } from '../../../actions/user/index';
import { useStyles } from './style';
import { replayRedirectUrl, forwardRedirectUrl } from './function';

const { Panel } = Collapse;

const MyMessage = ({ message }) => {
  const classes = useStyles();

  const { from, to, messageType, subject, body, createdAt } = message;
  const { name, avatar, email } = from || {};

  const actions = [
    <Link to={replayRedirectUrl(message)}>
      <span>Reply</span>
    </Link>,
    <Link to={forwardRedirectUrl(message)}>
      <span>Forward</span>
    </Link>,
  ];

  return (
    <div className="row">
      <div className="col-1 p-2">
        <Avatar src={avatar?.url} alt={avatar?.alt} />
      </div>
      <div className="col-11 p-2">
        {/* <div className="d-flex flex-wrap"> */}
        <div className={classes.messageHeader}>
          <span className="message-name">
            {`${name?.first} ${name?.last}`}
          </span>
          <span className="message-time">
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(createdAt).fromNow()}</span>
            </Tooltip>
          </span>
          <span className="w-100"></span>
          <span className="message-emails">
            <span>
              <b>From: </b>
              <Link to={`new?email=${email}`}>{email}</Link>
            </span>
            <span>
              <b>To: </b>
              {to?.map(({ email, _id }, i) => (
                <Link key={i} to={`new?email=${email}&to=${_id}`}>
                  {email}
                </Link>
              ))}
            </span>
          </span>
          <span className="message-time">
            <b>Type:</b> {messageType?.fromCamel()}
          </span>
        </div>
        <div className="ant-comment-content-detail">
          <h5>{subject}</h5>
          <p>{body}</p>
        </div>
        <ul className="ant-comment-actions">
          {actions.map((action, i) => (
            <li className="mx-2" key={i}>
              {action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const MyPanel = (props) => {
  const dispatch = useDispatch();

  const { message, onItemClick, ...panelProps } = props;
  const { unread, subject, from, createdAt, _id } = message;
  const panelSetting = {
    header: (
      <MessageSetting message={message} trigger={['contextMenu']}>
        <div
          className={`row text-center ${unread && 'text-warning'}`}
        >
          <span className="col-12 col-sm-4">{subject}</span>
          <span className="col-12 col-sm-4">{from?.email}</span>
          <span className="col-12 col-sm-4">
            {moment(createdAt).format('YYYY-MM-DD HH:mm')}
          </span>
          <div
            className="position-absolute"
            style={{ right: '1rem' }}
          >
            <MessageSetting message={message}>
              <SettingOutlined />
            </MessageSetting>
          </div>
        </div>
      </MessageSetting>
    ),
    key: _id,
  };
  return (
    <Panel
      {...panelProps}
      {...panelSetting}
      onItemClick={(key) => {
        if (!panelProps.isActive && message.unread)
          dispatch(setUnread(message._id));

        onItemClick(key);
      }}
    />
  );
};

/*********************************************************************** */

const MessagesList = ({ data: messages }) => {
  return (
    <div className="w-75 mx-auto">
      {!messages?.length ? (
        <Empty className="border" />
      ) : (
        <Collapse accordion>
          {messages.map((message) => (
            <MyPanel message={message} key={message._id}>
              <MessageSetting
                message={message}
                trigger={['contextMenu']}
              >
                <MyMessage message={message} />
              </MessageSetting>
            </MyPanel>
          ))}
        </Collapse>
      )}
    </div>
  );
};

export default MessagesList;
