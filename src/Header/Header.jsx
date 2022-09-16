import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigation = useNavigate();

  return (
    <header className="messChat__header container-fluid bg-primary text-light d-flex justify-content-between align-items-center">
      <h1>MessChat</h1>
      <nav className="btn-group">
        <button
          onClick={() => navigation("/SignUp")}
          type="button"
          className="btn btn-outline-light"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigation("/SignIn")}
          type="button"
          className="btn btn-outline-light"
        >
          Sign In
        </button>
      </nav>
    </header>
  );
}

export default Header;
