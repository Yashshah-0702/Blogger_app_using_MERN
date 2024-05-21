// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/UserSignup";
import HomePage from "./components/HomePage";
import AdminSignup from "./components/AdminSignup";
import UserProfiles from "./components/UserProfiles";
import UserProfile from "./components/UserProfile";
import Navbar from "./components/Navbar";
import UpdateProfile from "./components/UpdateProfile";

const App = () => {
  const [usertype, setUserType] = useState("");
  useEffect(() => {
    const user_type = localStorage.getItem("user_type");
    setUserType(user_type);
  }, []);
  
  return (
    <BrowserRouter>
      <Navbar user_type={usertype} /> <br></br> <br></br>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userProfiles" element={<UserProfiles />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/user" element={<Signup />} />
        <Route path="/signup/admin" element={<AdminSignup />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="*" element={<h1>Error..., Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     {view === 'login' ? (
    //       <Login setView={setView} />
    //     ) : (
    //       <Signup setView={setView} />
    //     )}
    //   </header>
    // </div>
  );
};

export default App;
