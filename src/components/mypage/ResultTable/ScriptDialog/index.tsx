import React from "react";
import "react-responsive-modal/styles.css";
import { Modal, ModalProps } from "react-responsive-modal";

import { replaceKeywordTags } from "./util";

import styled from "@emotion/styled";

const modalStyles: ModalProps["styles"] = {
  root: {
    top: "80px",
  },
  modal: {
    width: "600px",
    height: "400px",
    boxShadow: "var(--box-shadow)",
    borderRadius: "15px",
  },
};

type ScriptDialogProps = {
  questionTitle: string;
  script: string;
  isOpen: boolean;
  handleClose: () => void;
}

const ScriptDialog = (props: ScriptDialogProps) => {
  const {
    questionTitle,
    script,
    isOpen,
    handleClose,
  } = props;

  return (
    <Modal
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      styles={modalStyles}
    >
      <StyledQuestion>{questionTitle}</StyledQuestion>
      <StyledScriptWrap
        dangerouslySetInnerHTML={{
          __html: replaceKeywordTags({
            script,
            tag: "strong",
          })
          || "<span>작성된 내용이 없습니다.</span>",
        }}
      />
    </Modal>
  );
};

export default ScriptDialog;

const StyledScriptWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: calc(100% - 60px);
  margin: 0 auto;

  & strong {
    display: inline;
    box-shadow: inset 0 -10px 0 #a0ec2e90;
  }
`;

const StyledQuestion = styled.p`
  font-weight: 500;
  font-size: 20px;
  padding-top: 20px;
  margin: 0;
`;
