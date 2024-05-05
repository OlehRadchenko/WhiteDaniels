import React from 'react';
import ReactDOM from 'react-dom/client';
//import Form from './Form'; <Form style="login"/>
//import LoginForm from './FormLogin';
//import RegisterForm from './FormRegister';
import Form from './LoginAndRegisterForm';
import Blackjack from './Blackjack';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('MainMainDiv'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Form/>} />
      <Route path="/blackjack" element={<Blackjack/>} />
    </Routes>
  </BrowserRouter>
);
