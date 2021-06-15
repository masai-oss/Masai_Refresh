import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { store } from "./store";
import { axiosInterceptor } from "./Utils/axiosInterceptor";
import "./index.css";
import { BlurModalContextProvider } from "./ContextProviders/BlurModalContextProvider";
axiosInterceptor(); //used to track request

const rootElement = document.getElementById("root");
ReactDom.render(
  <BlurModalContextProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </BlurModalContextProvider>,
  rootElement
);
