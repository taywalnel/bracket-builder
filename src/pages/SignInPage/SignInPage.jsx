import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SignInForm from "../../components/SignInForm/SignInForm";
import { useAuth } from "../../contexts/AuthContext";
import "./SignInPage.css";

function SignInPage() {
  const [showSignInForm, setShowSignInForm] = useState(false);
  const { signInAsGuest, currentUser } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const signInOptionsElement = (
    <div className="sign-in-page__type-button-container">
      <div className="sign-in-page__sign-buttons-wrapper">
        <button
          className="sign-in-page__type-button sign-in-button"
          onClick={() => setShowSignInForm(true)}
        >
          Sign in
        </button>
        <button
          className="sign-in-page__type-button sign-up-button"
          onClick={() => setShowSignInForm(true)}
        >
          Sign up
        </button>
      </div>

      <button
        className="sign-in-page__type-button"
        onClick={handleSignInAsGuest}
      >
        Continue as guest
      </button>
    </div>
  );

  async function handleSignInAsGuest() {
    try {
      await signInAsGuest();
      navigate("/");
    } catch {}
  }

  return (
    <div className="sign-in-page__root">
      <div className="sign-in-page__container">
        <div className="sign-in-page__content-container">
          <h1>Bracket builder</h1>
          {showSignInForm ? (
            <SignInForm setShowSignInForm={setShowSignInForm} />
          ) : (
            signInOptionsElement
          )}
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
