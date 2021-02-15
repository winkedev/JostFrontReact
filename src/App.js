import React, { useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from './Routes';

import { SecurityConfig } from './services/SecurityConfig';

const App = () => {

  useEffect(async () => {
    console.log("Executing Config..");
    await SecurityConfig.setConfigWS();
  }, [])

  return (
    <Routes />
  )
}

export default App;