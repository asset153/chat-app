import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import "./style.css";
import emailValidation from "../../utilities/emailValidation";
import passwordValidation from "../../utilities/passwordValidation";
import repeatPasswordValidation from "../../utilities/repeatPasswordValidation";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [signUpValue, setSignUpValue] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [signUpValid, setSignUpValid] = useState(null);

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
      setSignUpValid(true);
      return true;
    } else {
      setSignUpValid(false);
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
        console.log(error);
      } else {
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
      navigate("/");
    } else {
      return null;
    }
  };

  const registerMessagesSuccess = (
    <div className={"d-block alert alert-success p-2 my-2"} role="alert">
      <p>Your account has been created, now you can sign in.</p>
    </div>
  );

  const registerMessagesError = (
    <div className={"d-block alert alert-danger p-2 my-2"} role="alert">
      <p>
        Incorrect password or Address email. Email should contain expected
        chars, and password should be longer then 6 chars.
      </p>
    </div>
  );

  const test = function () {
    if (signUpValid === null) {
      return null;
    } else if (signUpValid) {
      return registerMessagesSuccess;
    } else if (!signUpValid) {
      return registerMessagesError;
    }
  };

  return (
    <>
      <div className="container signUp_wrapper">
        <div className="row h-100">
          <form className="border col-md-6 col-xxl-4 p-5 m-auto form-group">
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
                  className={
                    !emailValidation(email) && email.length !== 0
                      ? "form-control border border-danger"
                      : "form-control"
                  }
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
                  onChange={handleChangeSignUpValue}
                  className={
                    !passwordValidation(password) && password.length !== 0
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  type="password"
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
                  className={
                    !repeatPasswordValidation(password, repeatPassword) &&
                    repeatPassword.length !== 0
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  type="password"
                />
              </div>

              {test()}

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
