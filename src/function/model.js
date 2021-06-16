import { Modal } from "antd";

const landingModal = () =>
  Modal.info({
    width: "50vw",
    closable: true,
    maskClosable: true,
    title: "E-commerce Project",
    content: (
      <div>
        <p>
          My name is <b>Mohammed Dallasheh</b>, and this is my final project in
          Exprise FULLSTACK course.
          <br />
          In this project i created an e-commerce site, that people can buy and
          sell there products.
        </p>
        <h6>
          <b>Technologies I used:</b>
        </h6>
        <ul style={{ listStyle: "disc", listStylePosition: "inside" }}>
          <li>FrontEnd: React, Ant-Design And Bootstrap</li>
          <li>BackEnd : Express</li>
          <li>DataBase: MongoDB</li>
        </ul>
      </div>
    ),
  });

export { landingModal };
