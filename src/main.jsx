// src/main.jsx
// The starting point of the app. It does three things:
//   1. Loads the CSS (Bootstrap, Bootstrap Icons, then our own styles).
//   2. Wraps the app in <BrowserRouter> so we can have multiple "pages".
//   3. Puts the <App /> component into <div id="root"> in index.html.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './styles/global.css'; // ours loads LAST so it can override Bootstrap

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
