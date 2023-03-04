import { useState } from "react";

import Popup from "components/common/Popup";
import { roomPasswordRegex } from "./regex";

import { a11yHidden } from "styles/common";
import styled from "@emotion/styled";
import { usePostJoinRoom } from "hooks/queries/interview";
import { useSetRecoilState } from "recoil";
import { interviewDataAtom, isInterviewerAtom } from "store/interview/atom";
import { useNavigate } from "react-router-dom";

type RoomPasswordPopupProps = {
  open: boolean;
  onClose: () => void;
  roomIdx: number;
};

const RoomPasswordPopup = (props: RoomPasswordPopupProps) => {
  const { open, onClose, roomIdx } = props;
  const navigate = useNavigate();
  const setUserInterviewData = useSetRecoilState(interviewDataAtom);
  const setIsInterviewer = useSetRecoilState(isInterviewerAtom);

  const [roomPassword, setRoomPassword] = useState(""); // TODO: 변수명 수정

  const { mutate, isLoading } = usePostJoinRoom();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomPassword(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = () => {
    if (!roomPasswordRegex.test(roomPassword)) {
      window.alert("비밀번호가 형식에 맞지 않습니다.");
      return;
    }

    if (!isLoading) {
      mutate(
        {
          roomIdx: roomIdx,
          password: roomPassword,
        },
        {
          onSuccess: ({ data }) => {
            setUserInterviewData(data.data);
            setIsInterviewer(true);
            navigate("/interview/user");
            onClose();
          },
          onError(error) {
            alert(error);
          },
        },
      );
    }
  };

  return (
    <Popup
      open={open}
      onClose={onClose}
      h={450}
      confirmText="확인"
      cancelText="취소"
      onConfirm={handleSubmit}
    >
      <StyledWrap>
        <h2>면접방 비밀번호 입력</h2>
        <StyledInputWrap>
          <StyledHiddenLabel htmlFor="lobby-room-password">비밀번호</StyledHiddenLabel>
          <StyledInput
            id="lobby-room-password"
            type="password"
            value={roomPassword}
            onChange={handleChange}
          />
        </StyledInputWrap>
        <StyledSmall>
          비공개 면접방에 입장하기 위해
          <br />3 ~ 10자리의 숫자를 입력해주세요.
        </StyledSmall>
      </StyledWrap>
    </Popup>
  );
};

export default RoomPasswordPopup;

const StyledWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 86px;

  & h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 400;
  }
`;

const StyledInputWrap = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  width: 200px;
  height: 30px;
  border: 1px solid var(--main-black);
  border-radius: 10px;
  font-size: 16px;
  padding: 0 10px;
`;

const StyledHiddenLabel = styled.label`
  ${a11yHidden}
`;

const StyledSmall = styled.small`
  font-size: 12px;
  color: var(--font-gray);
  line-height: 1.2;
  width: 100%;
  text-align: center;
  margin: 0 auto;
`;
