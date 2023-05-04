import React, { createRef, useState } from 'react';
import { firebaseErrorConstants } from '../../../constants/firebaseErrorConstants';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingDots from '../../LoadingDots/LoadingDots';

function ForgotPasswordModal({closeModal}) {
    const emailRef = createRef();
    const [firebaseError, setFirebaseError] = useState("");
    const [showLoadingDotsOnButton, setShowLoadingDotsOnButton] = useState(false);
    const { sendPasswordResetEmail } = useAuth();
    const [validationError, setValidationError ] = useState("");
    const [requiredFieldIsSet, setRequiredFieldIsSet] = useState(false);

    const handleForgotPassword = async () => {
        setFirebaseError("");
        if(!emailIsFormattedCorrectly(emailRef.current.value)){
            setValidationError("Invalid email");
            return;
        }

        setShowLoadingDotsOnButton(true);

        try {
            await sendPasswordResetEmail(emailRef.current.value);
            closeModal();
        } catch (error) {
            setFirebaseError(firebaseErrorConstants[error.code]);
        }

        setShowLoadingDotsOnButton(false);
    }

    const onInputChange = () => {
        if(emailRef.current.value !== ""){
            setRequiredFieldIsSet(true);
        }
        setFirebaseError("");
        setValidationError("");
    }

    const emailIsFormattedCorrectly = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

    const closeModalHandler = () => {
        setFirebaseError("");
        setValidationError("");
        emailRef.current.value = "";
        closeModal();
    }
    
  return (
    <>
    <div className="modal__header-wrapper">
      <h2>Forgot password</h2>
      <span style={{paddingBottom: '20px', color: '#ffffffb3'}}>A link allowing you to reset your password will be sent to your email.</span>
      <div className="input-wrapper">
        <label htmlFor="email">
            Email
            {" "}
                <span className="required-field-text">
                {validationError}
                </span>
        </label>
        <input
            onChange={onInputChange}
            ref={emailRef}
            className="sign-in__input"
            name="email"
            type="text"
        />
      </div>
     
    </div>
    <div className="modal__footer-wrapper">
      {firebaseError ? <p className="firebase-error">{firebaseError}</p> : null}
      <div className="modal__buttons-wrapper">
          <button onClick={closeModalHandler}>Cancel</button>
          <button disabled={!requiredFieldIsSet} onClick={() => handleForgotPassword()}>
              {showLoadingDotsOnButton ? <LoadingDots /> : "Submit"}
          </button>
      </div>
    </div>
  </>
  )
}

export default ForgotPasswordModal
