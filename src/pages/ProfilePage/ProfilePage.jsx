import { format } from "date-fns";
import React, { useState } from "react";
import LoadingDots from "../../components/LoadingDots/LoadingDots";
import ChangePasswordModal from "../../components/Modals/ChangePasswordModal/ChangePasswordModal";
import DeleteAccountModal from "../../components/Modals/DeleteAccountModal/DeleteAccountModal";
import { useAuth } from "../../contexts/AuthContext";
import "./ProfilePage.css";

function ProfilePage({ setIsModalOpen, setModalContent }) {
  const { signOut, currentUser } = useAuth();
  const [loading, setLoading] = useState("");
  const [userEmailText] = useState(handleSetUserEmail());
  const [accountCreatedOnText] = useState(handleGetAccountCreatedOn());

  function handleSetUserEmail() {
    if (currentUser.email) return currentUser.email;
    if (currentUser.isAnonymous) return "Guest account";
    return "No email found";
  }

  function handleGetAccountCreatedOn() {
    if (currentUser.isAnonymous) return "N/A";

    return formatDateNumber(currentUser.metadata.creationTime);
  }

  function formatDateNumber(dateNumber) {
    const date = new Date(dateNumber);
    const formattedDate = format(date, "MM/dd/yyyy");
    return formattedDate;
  }

  function openDeleteModal() {
    setModalContent(<DeleteAccountModal closeModal={() => setIsModalOpen(false)}/>)
    setIsModalOpen(true);
  }

  function openChangePasswordModal() {
    setModalContent(<ChangePasswordModal closeModal={() => setIsModalOpen(false)}/>)
    setIsModalOpen(true);
  }

  function handleSignOut() {
    try {
      setLoading("sign-out");
      signOut();
    } catch (error) {
      console.log(error);
    }
    setLoading("");
  }
 
  return (
    <div className="page__root">
      <h1>Profile</h1>
      <div className="profile-page__content-wrapper">
        <div className="profile-page__info-wrapper">
          <div className="profile-page__info-item-wrapper">
            <label>Email</label>
            <p>{userEmailText}</p>
          </div>
          <div className="profile-page__info-item-wrapper">
            <label>Account created on</label>
            <p>{accountCreatedOnText}</p>
          </div>
        </div>
        <div className="profile-page__actions-wrapper">
          <div className="profile-page__actions-row">
            <button onClick={handleSignOut}>
              {loading === "sign-out" ? <LoadingDots /> : "Sign out"}
            </button>
            {currentUser.isAnonymous ? null : <button onClick={openChangePasswordModal}>Change password</button>}
          </div>
          {currentUser.isAnonymous ? null : (
            <button onClick={openDeleteModal} className="profile-page__delete-button">
              Delete account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
