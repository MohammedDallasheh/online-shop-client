import React, { useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Modal } from "antd";

import { store } from "./store";

import initialSetup from "./utils/initialSetup";

import ScrollToTop from "./components/layout/ScrollToTop";
import Header from "./components/header/Header";
import Routes from "./components/routing/Routes";
import Footer from "./components/layout/Footer";

import { landingModal } from "./function/model";

const App = () => {
  useEffect(() => {
    initialSetup();
    landingModal();
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <div style={{ minHeight: "100vh" }}>
          <Header />
          <Routes />
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
