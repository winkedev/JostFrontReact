import React, { useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from './Routes';

import UserContextProvider from './contexts/UserContext';

import { SecurityConfig } from './services/SecurityConfig';

const App = () => {

  useEffect(async () => {
    SecurityConfig.writeLogs("*APP*", "Set initial config.")
    await SecurityConfig.setConfigWS();
  }, [])

  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  )
}

export default App;