import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import "./style.css";
import emailValidation from "../../utilities/emailValidation";
import passwordValidation from "../../utilities/passwordValidation";
import repeatPasswordValidation from "../../utilities/repeatPasswordValidation";

function SignUp() {
  const [signUpValue, setSignUpValue] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [correctlySignUp, setCorrectlySignUp] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState("");

  const { email, password, repeatPassword } = signUpValue;

  const handleChangeSignUpValue = function (e) {
    const { name, value } = e.target;
    setSignUpValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const checkValid = function () {
    if (
      emailValidation(email) &&
      passwordValidation(password) &&
      repeatPasswordValidation(password, repeatPassword)
    ) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  };

  const userSignUp = async function () {
    try {
      const { user, session, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setCorrectlySignUp(false);
        setErrorSignUp(error.message);
      } else {
        setCorrectlySignUp(true);
        setSignUpValue({
          email: "",
          password: "",
          repeatPassword: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickSignUp = function (e) {
    e.preventDefault();

    if (checkValid()) {
      userSignUp();
    } else {
      return null;
    }
  };

  const registerMessagesSuccess = (
    <div
      className={
        correctlySignUp ? "d-block alert alert-success p-2 my-2" : "d-none"
      }
      role="alert"
    >
      Your account has been created, now you can sign in.
    </div>
  );

  const registerMessagesError = (
    <div
      className={
        !correctlySignUp ? "d-block alert alert-danger p-2 my-2" : "d-none "
      }
      role="alert"
    >
      {errorSignUp}
    </div>
  );

  return (
    <>
      <div className="container vh-100">
        <div className="row h-100">
          <form className="border col-md-6 p-5 m-auto form-group">
            <fieldset className="">
              <legend className="fs-3 fw-bold text-primary">Sign Up:</legend>

              <div className="d-flex flex-column">
                <label className="form-label" htmlFor="">
                  Email address:
                </label>
                <input
                  name="email"
                  value={email}
                  onChange={handleChangeSignUpValue}
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
                  onChange={handleChangeSignUpValue}
                  className="form-control"
                  type="text"
                />
              </div>

              <div className="d-flex flex-column">
                <label className="form-label" htmlFor="">
                  Repeat password:
                </label>
                <input
                  name="repeatPassword"
                  value={repeatPassword}
                  onChange={handleChangeSignUpValue}
                  className="form-control"
                  type="text"
                />
              </div>

              {errorSignUp && !correctlySignUp
                ? registerMessagesError
                : registerMessagesSuccess}

              <button
                onClick={handleClickSignUp}
                className="btn btn-primary mt-3"
              >
                Sign Up
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
