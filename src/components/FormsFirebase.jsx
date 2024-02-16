import React from "react";
import CreateUser from "../context/CreateUser";
import Login from "../context/Login";
import { useAuth } from "../context/AuthContext";

function FormsFirebase() {
  const auth = useAuth();
  const { displayName } = auth.user;

  const handleLogout = () => {
    auth.logout();
  }

  return (
    <div className="App">
      {displayName && <h5>welcome : {displayName}</h5>}
      <CreateUser />
      <Login />

      <button onClick={() => handleLogout()} className="button">Logout</button>
    </div>
  );
}

export default FormsFirebase;
