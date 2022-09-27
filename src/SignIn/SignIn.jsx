import React, { useState } from "react";
import "./style.css";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [signInValue, setSignInValue] = useState({
    email: "mat@mat.pl",
    password: "123456",
  });

  const [errorValid, setErrorValid] = useState(false);

  const { email, password } = signInValue;

  const handleChangeSignInValue = function (e) {
    const { name, value } = e.target;
    setSignInValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    setErrorValid(false);
  };

  const userSignIn = async function () {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (!error && email.length !== 0 && password.length !== 0) {
        setErrorValid(false);
        navigate("/Chat");
      } else {
        setErrorValid(true);
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container signIn_wrapper">
        <div className="row h-100">
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
                  type="email"
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
                  type="password"
                />
              </div>

              <div
                className={errorValid ? "alert alert-danger p-2" : "d-none"}
                role="alert"
              >
                Incorrect email or password!
              </div>

              <button
                onClick={userSignIn}
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
