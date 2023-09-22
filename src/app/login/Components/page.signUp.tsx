import { useState } from "react";
import Modal from "react-modal";

export function SignUp() {
  const [isOpen, setIsOpen] = useState(false);
  const [onRequestClose, setOnRequestClose] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      contentLabel='Signup Modal'
      style={styles.signUp}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={false}
    >
    </Modal>
  );
}