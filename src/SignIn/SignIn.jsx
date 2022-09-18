import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [signInValue, setSignInValue] = useState({
    email: "mat@mat.pl",
    password: "123456",
  });

  const { email, password } = signInValue;

  const handleChangeSignInValue = function (e) {
    const { name, value } = e.target;
    setSignInValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const userSignIn = async function () {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickSignIn = async function () {
    userSignIn();
    navigate("/Chat");
  };

  return (
    <>
      <div className="container vh-100">
        <div className="row h-75">
          <form className="border col-md-6 col-xxl-4  p-5 m-auto form-group">
            <fieldset className="">
              <legend className="fs-3 fw-bold text-primary">Sign In:</legend>

              <div className="d-flex flex-column">
                <label className="form-label" htmlFor="">
                  Email address:
                </label>
                <input
                  name="email"
                  value={email}
                  onChange={handleChangeSignInValue}
                  className="form-control"
                  type="text"
                />
              </div>

              <div className="d-flex flex-column my-2">
                <label className="form-label" htmlFor="">
                  Password:
                </label>
                <input
                  name="password"
                  value={password}
                  onChange={handleChangeSignInValue}
                  className="form-control"
                  type="text"
                />
              </div>

              <button
                onClick={handleClickSignIn}
                type="button"
                className="btn btn-primary mt-3"
              >
                Sign In
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
