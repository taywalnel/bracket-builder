import React from 'react';
import './ModalWrapper.css';

function ModalWrapper({isOpen, children}) {
  return (
    <div className={`modal-wrapper ${isOpen ? 'show' : ''}`}>
        <div className="modal-wrapper__animation-wrapper">
            <div className="modal-wrapper__content-outlet">{children}</div>
        </div>
    </div>
  )
}

export default ModalWrapper;
