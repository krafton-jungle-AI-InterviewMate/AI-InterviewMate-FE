import { ModalProps } from "react-responsive-modal";
import styled from "@emotion/styled";

export const modalStyles: ModalProps["styles"] = {
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

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const Message = styled.p`
  font-size: 24px;
  text-align: center;
  line-height: 1.5;
  font-weight: 500;
`;

export const CancelButton = styled.button`
  border-radius: 5px;
  padding: 10px;
  margin: 0 auto;
  font-size: 16px;
  font-weight: 500;
  color: var(--main-white);
  transition: all 200ms;
  background-color: var(--main-gray);

  &:hover {
    background-color: var(--font-gray);
  }
  &:active {
    background-color: var(--font-gray);
  }
`;
