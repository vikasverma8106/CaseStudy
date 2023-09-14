import React from 'react';
import {Route, Routes} from "react-router-dom";

import Login from './routes/Login/Login';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Login}/>
      </Routes>
    </div>
  );
}

export default App;
