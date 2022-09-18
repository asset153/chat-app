import React from "react";
import "./styleHeader.css";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const AUD = "authenticated";

function Header(props) {
  const navigate = useNavigate();

  const user = supabase.auth.user();
  console.log(user);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const handleClickSignOut = async function () {
    signOut();
    navigate("/SignIn");
  };

  const userIsLogin = (
    <nav className="">
      <span className="fw-bold mx-3">{user?.email}</span>
      <div className="btn-group">
        <button
          onClick={handleClickSignOut}
          type="button"
          className="btn btn-outline-light"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );

  const userIsNotLogin = (
    <nav className="btn-group">
      <button
        onClick={() => navigate("/SignUp")}
        type="button"
        className="btn btn-outline-light"
      >
        Sign Up
      </button>
      <button
        onClick={() => navigate("/SignIn")}
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
      {props.isLogin === props.SIGNED_IN || user?.aud
        ? userIsLogin
        : userIsNotLogin}
    </header>
  );
}

export default Header;
