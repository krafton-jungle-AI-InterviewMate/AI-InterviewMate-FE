import React from "react";
import { useRecoilState } from "recoil";
import { aiInterviewerAtom } from "store/interview/atom";
import "react-responsive-modal/styles.css";
import { Modal, ModalProps } from "react-responsive-modal";

import { AiInterviewers } from "constants/interview";
import { AiInterviewerTypes } from "types/interview";
import { getAiInterviewerMiniThumbnail } from "lib/interview";

import styled from "@emotion/styled";

const modalStyles: ModalProps["styles"] = {
  root: {
    top: "80px",
  },
  modal: {
    width: "800px",
    height: "600px",
    boxShadow: "var(--box-shadow)",
    borderRadius: "15px",
  },
};

type SelectModalProps = {
  isOpen: boolean;
  handleClose: () => void;
}

const InterviewerSelectModal = (props: SelectModalProps) => {
  const {
    isOpen,
    handleClose,
  } = props;

  const [ aiInterviewer, setAiInterviewer ] = useRecoilState(aiInterviewerAtom);

  const handleClick = (ai: AiInterviewerTypes) => {
    setAiInterviewer(ai);
    handleClose();
  };

  return (
    <Modal
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      styles={modalStyles}
    >
      <StyledTitle>면접관을 선택해 주세요.</StyledTitle>
      <StyledWrap>
        <StyledList>
          {AiInterviewers.map((ai) =>
            <StyledInterviewer key={ai}>
              <button type="button" onClick={() => handleClick(ai)}>
                <StyledThumbnail bgImg={getAiInterviewerMiniThumbnail(ai)} />
                <span>{ai}</span>
              </button>
            </StyledInterviewer>,
          )}
        </StyledList>
      </StyledWrap>
    </Modal>
  );
};

export default InterviewerSelectModal;

const StyledWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: calc(100% - 60px);
  margin: 0 auto;
  overflow-y: auto;
`;

const StyledTitle = styled.p`
  font-weight: 500;
  font-size: 1.8rem;
  padding-top: 20px;
  margin: 0;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
`;

const StyledInterviewer = styled.li`
  margin-right: 6px;

  &:last-of-type {
    margin-right: 0;
  }

  & > button {
    background-color: transparent;
    padding: 5px;
    border-radius: 6px;
    transition: background-color 300ms;

    & span {
      font-size: 1.4rem;
      font-weight: 500;
    }

    &:hover {
      background-color: var(--main-gray);
    }
  }
`;

const StyledThumbnail = styled.span<{ bgImg: string }>`
  display: block;
  width: 120px;
  height: 120px;
  border-radius: 999px;
  background-image: ${({ bgImg }) => `url(${bgImg})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
`;
