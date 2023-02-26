import "react-responsive-modal/styles.css";
import { Modal, ModalProps } from "react-responsive-modal";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

const modalStyles: ModalProps["styles"] = {
  root: {
    top: "24%",
  },
  modal: {
    position: "relative",
    width: "500px",
    padding: "50px 35px",
    boxSizing: "border-box",
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
      showCloseIcon={false}
      styles={{
        ...modalStyles,
        modal: {
          ...modalStyles.modal,
          width: w ?? modalStyles.modal!["width"],
          height: h ?? modalStyles.modal!["height"],
        },
      }}
    >
      <StyledContents>
        {children}
        <StyledButtonWrap>
          <StyledConfirmButton type="button" onClick={onConfirm}>
            {confirmText}
          </StyledConfirmButton>
          <StyledCancelButton type="button" onClick={onClose}>
            {cancelText}
          </StyledCancelButton>
        </StyledButtonWrap>
      </StyledContents>
    </Modal>
  );
};

export default Popup;

const StyledContents = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: var(--main-black);
`;

const StyledButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 57px;
  width: 100%;
`;

const commonButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms;
  border-radius: var(--button-border-radius);
  width: 200px;
  height: 42px;
  font-size: 20px;
`;

const StyledConfirmButton = styled.button`
  ${commonButtonStyle}
  color: var(--main-white);
  background-color: var(--main-orange);
  margin-right: 30px;

  &:hover {
    background-color: var(--light-orange);
  }
  &:active {
    background-color: var(--push-orange);
  }
`;

const StyledCancelButton = styled.button`
  ${commonButtonStyle}
  color: var(--main-black);
  background-color: var(--main-white);
  border: 1px solid var(--main-gray);
  box-shadow: var(--box-shadow);

  &:hover {
    background-color: var(--main-alert);
    color: var(--main-white);
  }
  &:active {
    background-color: var(--push-alert);
  }
`;
