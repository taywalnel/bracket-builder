import React, { useState, createRef } from "react";
import "./SignInForm.css";
import { useAuth } from "../../contexts/AuthContext";
import { firebaseErrorConstants } from "../../constants/firebaseErrorConstants";
import LoadingDots from "../LoadingDots/LoadingDots";

function SignInForm() {
  const { signUp, signIn, signInAsGuest } = useAuth();
  const [signInType, setSignInType] = useState("sign-in");
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    passwordMismatch: "",
  });
  const [firebaseError, setFirebaseError] = useState("");
  const [loading, setLoading] = useState("");

  const emailRef = createRef();
  const passwordRef = createRef();
  const confirmPasswordRef = createRef();

  function handleSwitchSignType(type) {
    if (signInType === type) return;
    setSignInType(type);
    setValidationErrors({
      email: "",
      password: "",
      confirmPassword: "",
      passwordMismatch: "",
    });
    setFirebaseError("");
  }

  function submitHandler() {
    setFirebaseError("");
    if (!determineIfFormValidAndSetErrors()) return;
    if (signInType === "sign-up") {
      handleSignUp();
    }
    if (signInType === "sign-in") {
      handleSignIn();
    }
  }

  async function handleSignUp() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      setLoading("sign-button");
      await signUp(email, password);
    } catch (error) {
      setFirebaseError(firebaseErrorConstants[error.code]);
    }
    setLoading("");
  }

  async function handleSignIn() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      setLoading("sign-button");
      await signIn(email, password);
    } catch (error) {
      setFirebaseError(firebaseErrorConstants[error.code]);
    }
    setLoading("");
  }

  async function handleSignInAsGuest() {
    try {
      setLoading("guest-button");
      await signInAsGuest();
    } catch (error) {
      setFirebaseError(firebaseErrorConstants[error.code]);
    }
    setLoading("");
  }

  function determineIfFormValidAndSetErrors() {
    let formIsValid = true;
    const errors = {
      email: "",
      password: "",
      confirmPassword: "",
      passwordMismatch: "",
    };

    if (!emailRef.current.value) {
      errors.email = "Required field";
      formIsValid = false;
    }
    if (!emailIsFormattedCorrectly(emailRef.current.value)) {
      errors.email = "Invalid email";
      formIsValid = false;
    }
    if (!passwordRef.current.value) {
      errors.password = "Required field";
      formIsValid = false;
    }
    if (signInType === "sign-up") {
      if (!confirmPasswordRef.current.value) {
        errors.confirmPassword = "Required field";
        formIsValid = false;
      }
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        errors.passwordMismatch = "Passwords do not match";
        formIsValid = false;
      }
    }
    setValidationErrors(errors);
    return formIsValid;
  }

  function emailIsFormattedCorrectly(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function emailInputChange() {
    if (validationErrors.email)
      setValidationErrors({ ...validationErrors, email: "" });
  }

  function passwordInputChange() {
    if (validationErrors.password)
      setValidationErrors({ ...validationErrors, password: "" });
  }

  function confirmPasswordInputChange() {
    if (validationErrors.confirmPassword)
      setValidationErrors({ ...validationErrors, confirmPassword: "" });
    if (validationErrors.passwordMismatch)
      setValidationErrors({ ...validationErrors, passwordMismatch: "" });
  }

  return (
    <div className="sign-in__form-wrapper">
      <div className="sign-in__form-inner-wrapper">
        <div className="sign-in__title-wrapper">
          <img src="/assets/trophy.svg" alt="title icon" />
          <h3>bracket builder</h3>
        </div>
        <div className="sign-in__sign-in-buttons">
          <button
            onClick={() => handleSwitchSignType("sign-in")}
            className={`sign-in-type-button ${
              signInType === "sign-in" ? "selected-button" : ""
            }`}
          >
            <div className="selected-icon__outline">
              <div className="selected-icon__fill"></div>
            </div>
            Sign in
          </button>
          <button
            onClick={() => handleSwitchSignType("sign-up")}
            className={`sign-in-type-button ${
              signInType === "sign-up" ? "selected-button" : ""
            }`}
          >
            <div className="selected-icon__outline">
              <div className="selected-icon__fill"></div>
            </div>
            Sign up
          </button>
        </div>
        <div className="input-wrapper">
          <label className="sign-in__label" htmlFor="email">
            Email{" "}
            <span className="required-field-text">
              {validationErrors.email}
            </span>
          </label>
          <input
            onChange={emailInputChange}
            ref={emailRef}
            className="sign-in__input"
            name="email"
            type="text"
          />
        </div>
        <div className="input-wrapper">
          <label className="sign-in__label" htmlFor="password">
            Password{" "}
            <span className="required-field-text">
              {validationErrors.password || validationErrors.passwordMismatch}
            </span>
          </label>
          <input
            onChange={passwordInputChange}
            ref={passwordRef}
            className="sign-in__input"
            name="password"
            type="password"
          />
        </div>
        <div
          className={`input-wrapper ${
            signInType === "sign-up"
              ? "show-confirm-password"
              : "hide-confirm-password"
          }`}
        >
          <label className="sign-in__label" htmlFor="password">
            Confirm password{" "}
            <span className="required-field-text">
              {validationErrors.confirmPassword ||
                validationErrors.passwordMismatch}
            </span>
          </label>
          <input
            onChange={confirmPasswordInputChange}
            ref={confirmPasswordRef}
            className="sign-in__input"
            name="password"
            type="password"
          />
        </div>
        <div className="sign-in__firebase-error">{firebaseError}</div>
        <button
          onClick={submitHandler}
          className="submit-button sign-in__button"
        >
          {loading === "sign-button" ? <LoadingDots /> : "Sign in"}
        </button>
        <div className="sign-in__divider">
          <div className="sign-in__divider-line"></div>
          <span className="sign-in__divider-text">or</span>
          <div className="sign-in__divider-line"></div>
        </div>
        <button
          onClick={handleSignInAsGuest}
          className="alternate-button sign-in__button"
        >
          {loading === "guest-button" ? (
            <LoadingDots color="#333" />
          ) : (
            "Sign in as guest"
          )}
        </button>
      </div>
    </div>
  );
}

export default SignInForm;
