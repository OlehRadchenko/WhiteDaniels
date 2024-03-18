import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Form from './LoginForm';

const root = ReactDOM.createRoot(document.getElementById('MainMainDiv'));
root.render(
  <React.StrictMode>
    <App />
    <Form />
  </React.StrictMode>
);
