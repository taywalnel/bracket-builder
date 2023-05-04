import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import React, { createRef, useState } from "react";
import LoadingDots from "../../components/LoadingDots/LoadingDots";
import ForgotPasswordModal from "../../components/Modals/ForgotPasswordModal/ForgotPasswordModal";
import ModalWrapper from "../../components/Modals/ModalWrapper/ModalWrapper";
import { firebaseErrorConstants } from "../../constants/firebaseErrorConstants";
import "./SignInPage.css";

function SignInPage() {
  const { currentUser, signUp, signIn, signInAsGuest } = useAuth();
  const [signInType, setSignInType] = useState("sign-in");
  const [firebaseError, setFirebaseError] = useState("");
  const [showLoadingDotsOnButton, setShowLoadingDotsOnButton] = useState("");
  const [formHasRequiredFieldsSet, setFormHasRequiredFieldsSet] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const emailRef = createRef();
  const passwordRef = createRef();
  const confirmPasswordRef = createRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const handleSwitchSignType = (newSignInType) => {
    if (signInType === newSignInType) return;
    setSignInType(newSignInType);
    handleInputChange(newSignInType);
  }

  const submitFormHandler = () => {
    setFirebaseError("");
    const validationErrors = getValidationErrors();

    if(errorsExist(validationErrors)){
      setValidationErrors(validationErrors);
    }else{
      handleAuthenticate(signInType);
    }
  }

  const getValidationErrors = () => {
    const validationErrors = {
      email: "",
      password: "",
      confirmPassword: ""
    };

    if(!emailIsFormattedCorrectly(emailRef.current.value)){
      validationErrors.email = "Invalid email";
    }

    if(passwordRef.current.value.length < 6){
      validationErrors.password = "Password must be at least 6 characters";
      validationErrors.confirmPassword = "Password must be at least 6 characters";
    }

    if(signInType === "sign-up"){
      if(passwordRef.current.value !== confirmPasswordRef.current.value){
        validationErrors.password = "Passwords do not match";
        validationErrors.confirmPassword = "Passwords do not match";
      }
    }
    return validationErrors;
  }

  const errorsExist = (validationErrors) => {
    return Object.values(validationErrors).some(error => error);
  }

  const handleAuthenticate = async (authenticationType) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setShowLoadingDotsOnButton(authenticationType);

    try {
      if(authenticationType === "sign-in") await signIn(email, password);
      if(authenticationType === "sign-up") await signUp(email, password);
      if(authenticationType === "guest") await signInAsGuest();
    } catch (error) {
      setFirebaseError(firebaseErrorConstants[error.code]);
    }
    setShowLoadingDotsOnButton("");
  }

  const openPasswordResetModal = () => {
    setIsModalOpen(true);
    setModalContent(<ForgotPasswordModal closeModal={() => setIsModalOpen(false)}/>);
  }

  const emailIsFormattedCorrectly = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleInputChange = (newSignInType) => {
    setFirebaseError("");
    setValidationErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });
    setFormHasRequiredFieldsSet(getFormHasRequiredFieldsSetForType(newSignInType));
  }

  const getFormHasRequiredFieldsSetForType = (newSignInType) => {
    let formHasRequiredFieldsSet = true;

    if(emailRef.current.value === ""){
      formHasRequiredFieldsSet = false;
    }
    if(passwordRef.current.value === ""){
      formHasRequiredFieldsSet = false;
    }
    if(newSignInType === "sign-up" && confirmPasswordRef.current.value === ""){
      formHasRequiredFieldsSet = false;
    }    
    return formHasRequiredFieldsSet;
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && formHasRequiredFieldsSet) {
      submitFormHandler();
    }
  }

  return (
    <>
    <ModalWrapper isOpen={isModalOpen}>{modalContent}</ModalWrapper>
    <div className="sign-in__root" onKeyPress={handleKeyPress}>
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
            onChange={() => handleInputChange(signInType)}
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
              {validationErrors.password}
            </span>
          </label>
          <div className="input-inner-wrapper">
            <input
              onChange={() => handleInputChange(signInType)}
              ref={passwordRef}
              className="sign-in__input"
              name="password"
              type="password"
            />
             <button disabled={signInType !== "sign-in"} className="icon-wrapper" style={{flexShrink: '0', backgroundColor: "#ccc", height: '35px', width: '35px'}} onClick={openPasswordResetModal}>
              <img style={{height: '20px', width: '20px'}} alt="forgot password icon" className="icon" src="/assets/question-mark.svg"></img>
            </button>
          </div>
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
              {validationErrors.confirmPassword}
            </span>
          </label>
          <input
            onChange={handleInputChange}
            ref={confirmPasswordRef}
            className="sign-in__input"
            name="password"
            type="password"
          />
        </div>
        <div className="firebase-error">{firebaseError}</div>
        <button
          disabled={!formHasRequiredFieldsSet}
          onClick={submitFormHandler}
          className="submit-button sign-in__button"
        >
          {showLoadingDotsOnButton === "sign-in" || showLoadingDotsOnButton === "sign-up" ? <LoadingDots /> : "Sign in"}
        </button>
        <div className="sign-in__divider">
          <div className="sign-in__divider-line"></div>
          <span className="sign-in__divider-text">or</span>
          <div className="sign-in__divider-line"></div>
        </div>
        <button
          onClick={() => handleAuthenticate('guest')}
          className="alternate-button sign-in__button"
        >
          {showLoadingDotsOnButton === "guest" ? (
            <LoadingDots color="#333" />
          ) : (
            "Sign in as guest"
          )}
        </button>
      </div>
    </div>
    </div>
    </>
  
  );
}

export default SignInPage;
