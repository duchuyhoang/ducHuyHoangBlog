import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import { AiOutlineClose } from 'react-icons/fa';
import { MdClose } from "react-icons/md";
export interface IModal {
  isOpen: boolean;
  children: React.ReactElement;
  handleClose: () => void;
  title?: string;
}

const Modal = ({ children, isOpen, handleClose, title = "" }: IModal) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);
  if (!mounted) return null;

  return (
    <>
      {ReactDOM.createPortal(
        <div
          id="modal-wrapper"
          style={{ transition: "all 0.3s" }}
          className={`backdrop ${isOpen ? "show" : "overlay-hide"}`}
        ></div>,
        document.querySelector("body") as HTMLBodyElement
      )}
      {ReactDOM.createPortal(
        <div className={`modalOverLay ${!isOpen && "overlay-hide"}`}>
          <div
            className={`modalContainer ${
              isOpen ? "modal-open" : "modal-close"
            }`}
          >
            <div className="modalHeaderContainer">
              <div className="modalTitle">{title}</div>
              <div className="modalIcon" onClick={handleClose}>
                <MdClose />
              </div>
            </div>
            {children}
          </div>
        </div>,
        document.querySelector("body") as HTMLBodyElement
      )}
    </>
  );
};

export default Modal;
