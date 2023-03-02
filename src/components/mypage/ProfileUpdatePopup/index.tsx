import { useEffect, useState } from "react";
import { usePutNickname } from "hooks/queries/auth";

import Popup from "components/common/Popup";
import { nicknameRegex } from "./regex";

import { a11yHidden } from "styles/common";
import styled from "@emotion/styled";

type ProfileUpdatePopupProps = {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
};

const ProfileUpdatePopup = (props: ProfileUpdatePopupProps) => {
  const { open, onClose, refetch } = props;

  const {
    mutate,
    isLoading,
    isSuccess,
    error,
  } = usePutNickname();

  const [ newNickname, setNewNickname ] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  const handleSubmit = () => {
    if (!nicknameRegex.test(newNickname)) {
      window.alert("닉네임이 형식에 맞지 않습니다.");
      return;
    }

    mutate({
      nickname: newNickname,
    });
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isSuccess) {
      refetch();
      onClose();
    }
    else if (error) {
      window.alert("에러가 발생했습니다.");
    }
  }, [ isLoading ]);

  return (
    <Popup
      open={open}
      onClose={onClose}
      h={450}
      confirmText="변경하기"
      cancelText="취소"
      onConfirm={handleSubmit}
    >
      <StyledWrap>
        <h2>프로필 수정하기</h2>
        <StyledInputWrap>
          <StyledHiddenLabel htmlFor="mypage-update-nickname">
            닉네임
          </StyledHiddenLabel>
          <StyledInput
            id="mypage-update-nickname"
            type="text"
            value={newNickname}
            onChange={handleChange}
          />
        </StyledInputWrap>
        <StyledSmall>
          닉네임은 최소 2자 ~ 최대 10자까지 입력 가능합니다.
          <br />
          특수문자는 사용 불가능합니다.
        </StyledSmall>
      </StyledWrap>
    </Popup>
  );
};

export default ProfileUpdatePopup;

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
