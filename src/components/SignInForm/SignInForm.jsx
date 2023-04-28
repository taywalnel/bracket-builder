import React, { createRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseErrorConstants } from "../../constants/firebaseErrorConstants";
import { useAuth } from "../../contexts/AuthContext";
import "./SignInForm.css";

function SignInForm({ setShowSignInForm }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState("");
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const emailRef = createRef();
  const passwordRef = createRef();
  const confirmPasswordRef = createRef();
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const confirmPasswordElement = (
    <div className="sign-form__field-wrapper">
      <div className="sign-form__label-wrapper">
        <label htmlFor="confirm-password">Confirm password</label>
        <span className="validation-error">
          {passwordMismatchError || confirmPasswordError}
        </span>
      </div>

      <input
        onClick={onConfirmPasswordInputChange}
        ref={confirmPasswordRef}
        type="password"
        name="confirm-password"
      />
    </div>
  );

  async function handleSignIn() {
    if (loading) return;
    if (!fieldsAreValid()) return;

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      setLoading(true);
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      setFirebaseError(
        firebaseErrorConstants[error.code] || "Failed to sign in"
      );
    }
    setLoading(false);
  }

  async function handleSignUp() {
    if (loading) return;
    if (!fieldsAreValid()) return;

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      setLoading(true);
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      setFirebaseError(
        firebaseErrorConstants[error.code] || "Failed to sign up"
      );
    }
    setLoading(false);
  }

  function fieldsAreValid() {
    let fieldsAreValid = true;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("Invalid email");
      fieldsAreValid = false;
    }
    if (!password) {
      setPasswordError("Required");
      fieldsAreValid = false;
    }

    if (!isSignIn) {
      const passwordConfirm = confirmPasswordRef.current.value;
      if (!passwordConfirm) {
        setConfirmPasswordError("Required");
        fieldsAreValid = false;
      }
      if (password !== passwordConfirm) {
        setPasswordMismatchError("Passwords do not match");
        fieldsAreValid = false;
      }
    }
    return fieldsAreValid;
  }

  function changeSignType(type) {
    const currentType = isSignIn ? "sign-in" : "sign-up";
    if (currentType === type) return;
    setIsSignIn(!isSignIn);
    resetErrors();
    clearInputFields();
  }

  function clearInputFields() {
    emailRef.current.value = "";
    passwordRef.current.value = "";
    if (confirmPasswordRef.current) {
      confirmPasswordRef.current.value = "";
    }
  }

  function resetErrors() {
    setFirebaseError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setPasswordMismatchError("");
  }

  function onEmailInputChange() {
    setFirebaseError("");
    const email = emailRef.current.value;
    if (email) {
      setEmailError("");
    }
  }

  function onPasswordInputChange() {
    setFirebaseError("");
    const password = passwordRef.current.value;
    if (password) {
      setPasswordError("");
    }

    setPasswordMismatchError("");
  }

  function onConfirmPasswordInputChange() {
    setFirebaseError("");
    const passwordConfirm = confirmPasswordRef.current.value;
    if (passwordConfirm) {
      setConfirmPasswordError("");
    }
    setPasswordMismatchError("");
  }

  function onBackButtonClick() {
    resetErrors();
    clearInputFields();
    setShowSignInForm(false);
  }

  return (
    <div className="sign-form__wrapper">
      <div className="sign-form__top-section-wrapper">
        <div className="sign-form__button-wrapper">
          <button
            onClick={() => changeSignType("sign-in")}
            className={`sign-form__button sign-form__type-button sign-in-button ${
              isSignIn ? "active-form-type-button" : ""
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => changeSignType("sign-up")}
            className={`sign-form__button sign-form__type-button sign-up-button ${
              !isSignIn ? "active-form-type-button" : ""
            }`}
          >
            Sign up
          </button>
        </div>
        <div className="sign-form__form-wrapper">
          <div className="sign-form__field-wrapper">
            <div className="sign-form__label-wrapper">
              <label htmlFor="email">Email</label>
              <span className="validation-error">{emailError}</span>
            </div>

            <input
              onChange={onEmailInputChange}
              ref={emailRef}
              type="text"
              name="email"
            />
          </div>
          <div className="sign-form__field-wrapper">
            <div className="sign-form__label-wrapper">
              <label htmlFor="password">Password</label>
              <span className="validation-error">
                {passwordMismatchError || passwordError}
              </span>
            </div>

            <input
              onChange={onPasswordInputChange}
              ref={passwordRef}
              type="password"
              name="password"
            />
          </div>
          {isSignIn ? null : confirmPasswordElement}
        </div>
      </div>
      <div className="sign-form__bottom-section-wrapper">
        <div className="firebase-error">{firebaseError}</div>
        <div className="sign-form__button-wrapper">
          <button
            onClick={onBackButtonClick}
            className="sign-form__button sign-form__back-button"
          >
            Back
          </button>
          <button
            onClick={isSignIn ? handleSignIn : handleSignUp}
            className="sign-form__button sign-form__confirm-button"
          >
            {isSignIn ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
