import React from "react";
import "./styleHeader.css";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigation = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const handleClickSignOut = async function () {
    signOut();
  };

  const userIsLogin = (
    <nav className="btn-group">
      <button
        onClick={handleClickSignOut}
        type="button"
        className="btn btn-outline-light"
      >
        Sign Out
      </button>
    </nav>
  );

  const userIsNotLogin = (
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
  );

  console.log("props.isLogin", props.isLogin);

  return (
    <header className="messChat__header container-fluid bg-primary text-light d-flex justify-content-between align-items-center">
      <h1>MessChat</h1>
      {props.isLogin === props.SIGNED_IN ? userIsLogin : userIsNotLogin}
    </header>
  );
}

export default Header;
