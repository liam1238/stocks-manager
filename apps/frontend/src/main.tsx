import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import 'antd/dist/reset.css'; // optional styling reset

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
