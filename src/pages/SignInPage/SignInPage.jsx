import React, { useState } from "react";
import "./SignInPage.css";
import SignInForm from "../../components/SignInForm/SignInForm";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function SignInPage() {
  const [showSignInForm, setShowSignInForm] = useState(false);
  const { signInAsGuest, currentUser } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const signInOptionsElement = (
    <div className="authentication-page-type-button-container">
      <div className="auth-page__sign-buttons-wrapper">
        <button
          className="authentication-page-type-button sign-in-button"
          onClick={() => setShowSignInForm(true)}
        >
          Sign in
        </button>
        <button
          className="authentication-page-type-button sign-up-button"
          onClick={() => setShowSignInForm(true)}
        >
          Sign up
        </button>
      </div>

      <button
        className="authentication-page-type-button"
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
    <div className="authentication-page-root">
      <div className="authentication-page-container">
        <div className="authentication-page-content-container">
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
