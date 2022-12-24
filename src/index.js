import React from "react";
import { store } from './store'
import { Provider } from 'react-redux'
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from 'react-hot-toast';
import SnowStorm from 'react-snowstorm';  
import 'moment/locale/tr' 

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
      <Provider store={store}>
      <App />
      <Toaster toastOptions={{duration: 3000, position: "top-right"}}/>
      <SnowStorm snowColor="#bababa" excludeMobile={false}/>
      </Provider>,
);
