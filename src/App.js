import React from "react";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./components/ProtectedRoute/protectedroute";
import Navigation from "./components/navbar/navigation";
import Login from "./routes/Login/Login";
import BookingPage from "./routes/booking/booking";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./components/footer/footer.jsx";
import Analytics from "./routes/adminDashboard/analytics";
import Dashboard from "./routes/customerDashboard/dashboard";
import AdminPage from "./routes/adminDashboard/dashboard"

function App() {
  return (
    <div className="App">
      <body></body>
      <Navigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/book/:stationid" element={<BookingPage/>}/>
        <Route path="/admin/dashboard/:id" element={<AdminPage/>}/>
        <Route path="/admin/analytics/:id" element={<Analytics/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
