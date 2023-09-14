import React from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "./components/navbar/navigation";
import Login from "./routes/Login/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./components/footer/footer.jsx";


function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
