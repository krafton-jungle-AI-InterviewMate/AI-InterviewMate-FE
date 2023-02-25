import "react-responsive-modal/styles.css";
import { Modal, ModalProps } from "react-responsive-modal";

const modalStyles: ModalProps["styles"] = {
  root: {
    top: "80px",
  },
  modal: {
    position: "relative",
    width: "500px",
    height: "250px",
    padding: "69px 67px",
    boxShadow: "var(--box-shadow)",
    borderRadius: "15px",
    overflow: "hidden",
  },
};

type PopupProps = ModalProps & {
  w?: number;
  h?: number;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  children: React.ReactNode;
};

const Popup = (props: PopupProps) => {
  const {
    open,
    onClose,
    closeOnOverlayClick,
    w,
    h,
    confirmText,
    cancelText,
    onConfirm,
    children,
  } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
      styles={{
        ...modalStyles,
        modal: {
          ...modalStyles.modal,
          width: w ?? modalStyles.modal!["width"],
          height: h ?? modalStyles.modal!["height"],
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default Popup;
