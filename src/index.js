import React from 'react';
import ReactDOM from 'react-dom/client';
import Form from './LoginAndRegisterForm';
import Blackjack from './Blackjack';
import Blackjack2 from './Blackjack2';
import Lobby from './Lobby';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('MainMainDiv'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Form/>} />
      <Route path="/betowanie_wersja_robocza" element={<Blackjack/>} />
      <Route path="/blackjack" element={<Blackjack2/>} />
      <Route path="/lobby" element={<Lobby/>} />
    </Routes>
  </BrowserRouter>
);