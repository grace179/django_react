import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import 'antd/dist/antd.css';
import Root from './pages/index';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './store';

ReactDOM.render(
  <BrowserRouter>
    <AppProvider>
      <Root />
    </AppProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
