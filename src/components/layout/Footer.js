import React from "react";

import { Button } from "antd";
import {
  FacebookOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import Icon from "./Icon";

const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-light text-center">
      <div className="row col-12 col-lg-10  mx-auto py-5">
        <div className="col-12 col-md-5 col-xl-4 ">
          <h4 className="text-light">LOCATION</h4>
          <div>Yohannan Hassandlar Israel 63827, Tel Aviv</div>
          <div>
            <Icon name="test2" size={1.2} className=" text-light p-0 mx-3" />
            blabla@gmail.com
          </div>
          <div>
            <Icon name="test24" size={1.2} className=" text-light p-0 mx-3" />
            +972-54-255-4444
          </div>
          <div>
            <Icon name="test33" size={1.2} className=" text-light p-0 mx-3" />
            +972-3-629-9367
          </div>
          <div className="d-block d-md-none  w-75 mx-auto border-bottom my-4  " />
        </div>
        <div className="col-12 col-md-2 col-xl-4 ">
          <h4 className="text-light d-block d-md-none d-xl-block">
            SOCIAL NETWORK
          </h4>
          <div className="d-block d-md-flex d-xl-block flex-column align-items-center">
            <Button
              className="m-3"
              shape="circle"
              icon={<FacebookOutlined />}
            />
            <Button className="m-3" shape="circle" icon={<YoutubeOutlined />} />
            <Button className="m-3" shape="circle" icon={<TwitterOutlined />} />
            <Button
              className="m-3"
              shape="circle"
              icon={<InstagramOutlined />}
            />
          </div>
          <div className="d-block d-md-none  w-75 mx-auto border-bottom my-4  " />
        </div>
        <div className="col-12 col-md-5 col-xl-4 ">
          <h4 className="text-light">ABOUT</h4>
          <p className="col-9 mx-auto">
            Sit excepteur voluptate deserunt voluptate eiusmod aliqua ex
            proident irure consequat aliqua est. Id nisi ex officia consectetur
            enim reprehenderit eu adipisicing elit voluptate occaecat tempor
            nisi consectetur. .
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 p-3" style={{ backgroundColor: "#323232" }}>
          Copyright © Mohammed Dallasheh 2021
        </div>
      </div>
    </div>
  );
};

export default Footer;
