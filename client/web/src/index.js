import React from 'react';
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './App';
import { store } from "./store"
import { axiosInterceptor } from "./Utils/axiosInterceptor"

axiosInterceptor() //used to track request 

const rootElement = document.getElementById("root")
ReactDom.render(
  <Provider store = {store}>
      <App />
  </Provider>,
  rootElement
)