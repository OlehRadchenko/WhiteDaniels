import React from 'react';
import ReactDOM from 'react-dom/client';
//import Form from './Form'; <Form style="login"/>
//import LoginForm from './FormLogin';
//import RegisterForm from './FormRegister';
import Form from './LoginAndRegisterForm';

const root = ReactDOM.createRoot(document.getElementById('MainMainDiv'));
root.render(
  <React.StrictMode>
    <Form/>
  </React.StrictMode>
);
