import React, { useState } from 'react';
import { firebaseErrorConstants } from '../../../constants/firebaseErrorConstants';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingDots from '../../LoadingDots/LoadingDots';

function DeleteAccountModal({closeModal}) {
  const { deleteAccount } = useAuth();
  const [loading, setLoading] = useState(false);
  const [deleteFirebaseError, setDeleteFirebaseError] = useState(null);

  async function handleDeleteAccount(){
    setDeleteFirebaseError("");
    try {
       setLoading(true);
       await deleteAccount().then(() => {
          closeModal();
       });
    } catch (error) {
      setDeleteFirebaseError(firebaseErrorConstants[error.code]);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="modal__header-wrapper">
        <h2>Delete account</h2>
        <p>Are you sure you want to delete your account? This will permanently delete your saved brackets.</p>
      </div>
      <div className="modal__footer-wrapper">
        {deleteFirebaseError ? <p className="firebase-error">{deleteFirebaseError}</p> : null}
        <div className="modal__buttons-wrapper">
            <button onClick={closeModal}>Cancel</button>
            <button onClick={handleDeleteAccount} className="profile-page__delete-button">
                {loading ? <LoadingDots /> : "Delete account"}
            </button>
        </div>
      </div>
    </>
  )
}

export default DeleteAccountModal;
