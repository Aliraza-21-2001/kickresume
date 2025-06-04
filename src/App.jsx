import React, { useState } from 'react';
import MainPage from './components/MainPage';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return <MainPage />;
};

export default App;
