import React, { useState } from "react";
import "./style.css";
import emailValidation from "../../utilities/emailValidation";
import passwordValidation from "../../utilities/passwordValidation";

function SignUp() {
  const [signUpValue, setSignUpValue] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [signUpValueErrors, setSignUpValueErrors] = useState({
    emailValidError: false,
    passwordValidError: false,
    repeatPasswordValidError: false,
  });

  const { email, password, repeatPassword } = signUpValue;

  const { emailValidError, passwordValidError, repeatPasswordValidError } =
    signUpValueErrors;

  const handleChangeSignUpValue = function (e) {
    const { name, value } = e.target;
    setSignUpValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    setSignUpValueErrors({
      emailValidError: false,
      passwordValidError: false,
      repeatPasswordValidError: false,
    });
  };

  const handleClickSignUp = function (e) {
    e.preventDefault();
    if (emailValidation(email)) {
      setSignUpValueErrors((prevState) => {
        return {
          ...prevState,
          emailValidError: false,
        };
      });
    } else {
      setSignUpValueErrors((prevState) => {
        return {
          ...prevState,
          emailValidError: true,
        };
      });
    }

    if (passwordValidation(password)) {
      setSignUpValueErrors((prevState) => {
        return {
          ...prevState,
          passwordValidError: false,
        };
      });
    } else {
      setSignUpValueErrors((prevState) => {
        return {
          ...prevState,
          passwordValidError: true,
        };
      });
    }

    if (password === repeatPassword && repeatPassword.length) {
      setSignUpValueErrors((prevState) => {
        return {
          ...prevState,
          repeatPasswordValidError: false,
        };
      });
    } else {
      setSignUpValueErrors((prevState) => {
        return {
          ...prevState,
          repeatPasswordValidError: true,
        };
      });
    }
  };

  return (
    <div className="container vh-100 bg-light">
      <div className="row h-100">
        <form className="border col-md-6 p-5 m-auto form-group">
          <fieldset className="">
            <legend className="fs-3 fw-bold text-primary">Sign Up:</legend>

            <div className="d-flex flex-column">
              <label className="form-label" htmlFor="">
                address e-mail:
              </label>
              <input
                name="email"
                value={email}
                onChange={handleChangeSignUpValue}
                className="form-control"
                type="text"
              />

              <div
                name="emailValidError"
                className={
                  emailValidError
                    ? " d-block alert alert-danger mt-2 p-2"
                    : "d-none"
                }
                role="alert"
              >
                Incorrect address email!
              </div>
            </div>

            <div className="d-flex flex-column my-2">
              <label className="form-label" htmlFor="">
                password:
              </label>
              <input
                name="password"
                value={password}
                onChange={handleChangeSignUpValue}
                className="form-control"
                type="text"
              />

              <div
                className={
                  passwordValidError
                    ? " d-block alert alert-danger mt-2 p-2"
                    : "d-none"
                }
                role="alert"
              >
                Incorrect password!
              </div>
            </div>

            <div className="d-flex flex-column">
              <label className="form-label" htmlFor="">
                repeat password:
              </label>
              <input
                name="repeatPassword"
                value={repeatPassword}
                onChange={handleChangeSignUpValue}
                className="form-control"
                type="text"
              />

              <div
                className={
                  repeatPasswordValidError
                    ? " d-block alert alert-danger mt-2 p-2"
                    : "d-none"
                }
                role="alert"
              >
                Passwords is not the same!
              </div>
            </div>

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
  );
}

export default SignUp;
