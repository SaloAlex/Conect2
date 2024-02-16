// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRole from "./context/UserRole";
import Login from "./context/Login";
import { AuthProvider } from "./context/AuthContext";
import UserTypeSelection from "./context/UserType";
import Home from "./context/Home";
import Riot from "./components/Riot";
import UserForm from "./context/UserForm";
import ResetPassword from "./context/ResetPassword";
import OrganizationType from "./context/OrganizationType";
import UserProfile from "./context/UserProfile";
import OrganizationForm from "./context/OrganizationForm"

const App = () => {
 
  return (
    <Router>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-role" element={<UserRole />} />
            <Route path="/user-type" element={<UserTypeSelection />} />
            <Route path="/user-form" element={<UserForm />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/organization-type" element={<OrganizationType />} />
            <Route path="/user-profile" element={<UserProfile/>} />
            <Route path="/riot-account" element={<Riot />} />
            <Route path="/organization-form" element={<OrganizationForm />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
};

export default App;
