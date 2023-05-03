import React, { createRef, useState } from 'react';
import { firebaseErrorConstants } from '../../../constants/firebaseErrorConstants';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingDots from '../../LoadingDots/LoadingDots';

function ChangePasswordModal({closeModal}) {
    const { changePassword } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [requiredFieldsAreFilled, setRequiredFieldsAreFilled] = useState(false);
    const newPasswordRef = createRef();
    const confirmNewPasswordRef = createRef();
    const [validationErrors, setValidationErrors] = useState({
        password: "",
        confirmPassword: "",
    });
   
    async function handleChangePassword(){
        if(!passwordsPassValidation()){
            setValidationErrors(getValidationErrors());
            return;
        }

        try {
            setLoading(true);
            await changePassword(newPasswordRef.current.value);
        } catch (error) {
            setError(firebaseErrorConstants[error.code]);
            setLoading(false);
        }
    }

    function passwordsPassValidation(){
        if(newPasswordRef.current.value !== confirmNewPasswordRef.current.value) return false;
        if(newPasswordRef.current.value.length < 6) return false;
        return true;
    }

    function getValidationErrors(){
        const validationErrors = {
            password: "",
            confirmPassword: "",
        };
        if(newPasswordRef.current.value !== confirmNewPasswordRef.current.value){
            validationErrors.password = "Passwords do not match";
            validationErrors.confirmPassword = "Passwords do not match";
        }
        else if (newPasswordRef.current.value.length < 6){
            validationErrors.password = "Password must be at least 6 characters long";
            validationErrors.confirmPassword = "Password must be at least 6 characters long";
        }
        return validationErrors;
    }

    function getRequiredFieldsAreFilled(){
        return (
            newPasswordRef.current.value.length > 0 &&
            confirmNewPasswordRef.current.value.length > 0
        );
    }

    function onInputChange(){
        setValidationErrors(
            {
                password: "",
                confirmPassword: "",
            }
        );
        setRequiredFieldsAreFilled(getRequiredFieldsAreFilled());
    }
  
    return (
      <>
        <div className="modal__header-wrapper">
          <h2>Change Password</h2>
          
          <div className="input-wrapper">
            <label htmlFor="new-password">
                New password{" "}
                <span className="required-field-text">
                {validationErrors.password}
                </span>
            </label>
            <input
                onChange={onInputChange}
                ref={newPasswordRef}
                className="sign-in__input"
                name="new-password"
                type="password"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="confirm-new-password">
                Confirm new password{" "}
                <span className="required-field-text">
                {validationErrors.confirmPassword}
                </span>
            </label>
            <input
                onChange={onInputChange}
                ref={confirmNewPasswordRef}
                className="sign-in__input"
                name="confirm-new-password"
                type="password"
            />
          </div>
        </div>
        <div className="modal__footer-wrapper">
          {error ? <p className="firebase-error">{error}</p> : null}
          <div className="modal__buttons-wrapper">
              <button onClick={closeModal}>Cancel</button>
              <button disabled={!requiredFieldsAreFilled} onClick={() => handleChangePassword()}>
                  {loading ? <LoadingDots /> : "Change password"}
              </button>
          </div>
        </div>
      </>
    )
  }

export default ChangePasswordModal;
