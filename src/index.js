import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store/index";
import { BrowserRouter as Router } from "react-router-dom";
import RoutePage from './RoutePage';
import './assets/styles/bara.css';
import './assets/styles/login.css';
import 'antd/dist/antd.css';

// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RoutePage />
      </Router>    
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
