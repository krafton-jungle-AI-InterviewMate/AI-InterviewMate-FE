import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { aiInterviewNextProcessAtom, aiRoomResponseAtom } from "store/interview/atom";

import { useDeleteInterviewRooms } from "hooks/queries/interview";

import Popup from "components/common/Popup";
import InterviewAiContainer from "components/interview/InterviewAiContainer";
import styled from "@emotion/styled";
import { commonButtonStyle } from "styles/common";

const InterviewAi = () => {
  const navigate = useNavigate();
  const aiRoomResponse = useRecoilValue(aiRoomResponseAtom);
  const [ aiInterviewNextProcess, setAiInterviewNextProcess ] = useRecoilState(aiInterviewNextProcessAtom);

  const [ isConfirmPopupOpen, setIsConfirmPopupOpen ] = useState(false);

  const { mutate: deleteRoom } = useDeleteInterviewRooms();

  const handleLeave = () => {
    if (!aiRoomResponse) {
      return;
    }

    deleteRoom(
      aiRoomResponse.data.roomIdx,
      {
        onSuccess: () => {
          setAiInterviewNextProcess("ready");
          navigate("/lobby", { replace: true });
        },
      },
    );
  };

  useEffect(() => {
    if (aiInterviewNextProcess !== "ongoing") {
      navigate("/lobby", { replace: true });
    }
    else {
      setAiInterviewNextProcess("end");
    }

    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <StyledWrap>
      {isConfirmPopupOpen && (
        <Popup
          open={isConfirmPopupOpen}
          onClose={() => setIsConfirmPopupOpen(false)}
          confirmText="네!"
          cancelText="취소"
          onConfirm={handleLeave}
        >
          <StyledConfirmText>
            면접을 취소 하시겠습니까?
            <br />
            현재 면접방도 삭제됩니다.
          </StyledConfirmText>
        </Popup>
      )}
      <StyledFeedbackSection />
      <InterviewAiContainer />
      <StyledExitButton type="button" onClick={() => setIsConfirmPopupOpen(true)}>
        면접 나가기
      </StyledExitButton>
    </StyledWrap>
  );
};

export default InterviewAi;

const StyledWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100vw;
  min-width: 1000px;
`;

const StyledConfirmText = styled.p`
  font-size: 2rem;
  text-align: center;
`;

const StyledFeedbackSection = styled.section`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 120px;
  background-color: transparent;

  & span {
    display: inline;
    margin-left: 60px;
    font-size: 20px;
    color: var(--font-gray);
    box-shadow: inset 0 -14px 0 #fffb006e;
  }
`;

const StyledExitButton = styled.button`
  ${commonButtonStyle}
  margin-right: 28px;
  align-self: flex-end;
  font-size: 1.4rem;
  font-weight: 500;

  background-color: var(--main-white);
  border: 1px solid var(--main-gray);
  box-shadow: var(--box-shadow);

  &:hover {
    background-color: var(--light-alert);
    color: var(--main-white);
  }
  &:active {
    background-color: var(--push-alert);
  }
`;
