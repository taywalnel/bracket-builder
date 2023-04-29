import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./SignInPage.css";
import SignInForm from "../../components/SignInForm/SignInForm";

function SignInPage() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="sign-in__root">
      <SignInForm />
    </div>
  );
}

export default SignInPage;
