import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./App";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // development URL
  axios.defaults.baseURL = `${process.env.REACT_APP_API_SERVER_DEVELOPMENT}`;
} else {
  // production URL
  axios.defaults.baseURL = `${process.env.REACT_APP_API_SERVER_PRODUCTION}`;
}

ReactDOM.render(<App />, document.getElementById("root"));
