import React from "react";
import './Modal.css'

type ModalProps = {
  children: React.ReactNode;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
};

export default function Modal({ children, setShow, show }: ModalProps): JSX.Element {
  return (
    <div className='modal'>
      <button
        className='modal-close'
        onClick={ () => setShow(!show) }
      >
        X
      </button>
      <div className='modal-main'>
        <div className='modal-children'>
          { children }
        </div>
      </div>
    </div>
  )
};
