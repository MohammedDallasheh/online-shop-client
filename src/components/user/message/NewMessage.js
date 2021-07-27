import React, { useState, useEffect } from "react";

import { Tag, Input, Tooltip, Button, Select } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { parse } from "query-string";

import { PlusOutlined } from "@ant-design/icons";
import Search from "../../header/Search";
import { sendMessage } from "../../../actions/user/index";

const messageTypeOptions = [
  { value: "general", label: "General" },
  { value: "report", label: "Report" },
  { value: "afterOrder", label: "After Order" },
  { value: "beforeOrder", label: "Before Order" },
];

const NewMessage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();

  const [tags, setTags] = useState({});
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [messageType, setMessageType] = useState(messageTypeOptions[0]?.value);

  useEffect(() => {
    handleReset();
    const { email, to, subject, body, type } = parse(search);
    if (email && to) setTags({ [email]: to });
    if (subject) setSubject(subject);
    if (body) setBody(body);

    if (messageTypeOptions.some(({ value }) => type === value))
      setMessageType(type);
  }, [search]);

  const handleSearch = (data, { value, label }) => {
    setTags({ ...tags, [label]: value });
  };

  const handleTagClose = (e, key) => {
    const { [key]: todelete, ...newTags } = tags;
    setTags(newTags);
  };

  const handleReset = async () => {
    setTags({});
    setSubject("");
    setBody("");
    setMessageType("general");
  };

  const handleSend = async () => {
    const isSuccess = await dispatch(
      sendMessage({
        to: Object.values(tags),
        subject,
        body,
        messageType,
      })
    );
    if (!isSuccess) return;
    history.push("sent");
    handleReset();
  };
  return (
    <div className="container w-75 mx-auto border position-relative">
      <div className="row border-bottom">
        <div className="col-2 border-right ">To:</div>
        <div className="col-3 m-0 p-0">
          <Search
            resource="user"
            onSelect={handleSearch}
            select="email"
            addCurrentSearch={false}
            placeholder="Add Email"
            className="w-100 h-100"
          />
        </div>
        <div className="col">
          {Object.entries(tags)?.map(([key, value]) => (
            <Tag key={key} closable onClose={(e) => handleTagClose(e, key)}>
              {key}
            </Tag>
          ))}
        </div>
      </div>
      <div className="row border-bottom">
        <div className="col-2 border-right ">Subject:</div>
        <div className="col">
          <Input
            bordered={false}
            value={subject}
            onChange={({ target }) =>
              target?.value?.length < 50 && setSubject(target?.value)
            }
          />
        </div>
        <Select
          className="col-2"
          value={messageType}
          onSelect={setMessageType}
          options={messageTypeOptions}
        />
      </div>
      <div className="row border-bottom">
        <div className="col-2 border-right ">Message:</div>
        <div className="col">
          <Input.TextArea
            bordered={false}
            autoSize={{ minRows: 9, maxRows: 15 }}
            value={body}
            onChange={({ target }) => setBody(target.value)}
            maxLength={800}
          />
        </div>
      </div>
      <div
        className="position-absolute"
        style={{
          right: 0,
          button: 0,
          transform: "translate(-20px,calc( -100% - 20px) )",
        }}
      >
        <Button type="primary" shape="round" onClick={handleReset}>
          Reset
        </Button>
        <Button
          className="ml-2"
          type="primary"
          shape="round"
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
export default NewMessage;
