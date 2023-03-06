import { useState } from "react";
import { GetRatingDetailResponse, RoomTypes } from "api/mypage/types";
import { formatDate } from "lib/format";
import "react-responsive-modal/styles.css";
import { Modal, ModalProps } from "react-responsive-modal";

import { usePostResultMemo } from "hooks/queries/mypage";

import styled from "@emotion/styled";
import { commonLabelStyle } from "styles/resultDetails";

type ResultDetailsLayoutProps = {
  roomType: RoomTypes;
  roomIdx: number;
  data: GetRatingDetailResponse;
  refetch: () => void,
  children: React.ReactNode;
};

const ResultDetailsLayout = (props: ResultDetailsLayoutProps) => {
  const { roomType, roomIdx, data, refetch, children } = props;

  const [ resultMemo, setResultMemo ] = useState(data.data.memo ?? "");
  const [ isPopupOpen, setIsPopupOpen ] = useState(false);

  const { mutate: postMemo } = usePostResultMemo();

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResultMemo(e.target.value);
  };

  const handleMemoSubmit = () => {
    postMemo({
      roomIdx,
      memo: resultMemo,
    }, {
      onSuccess: () => {
        setIsPopupOpen(true);
      },
    });
  };
  
  const handlePopupClose = () => {
    setIsPopupOpen(false);
    refetch();
  };

  return (
    <StyledWrapper>
      <Modal
        open={isPopupOpen}
        onClose={handlePopupClose}
        styles={modalStyles}
      >
        수정이 완료되었습니다.
      </Modal>
      <StyledHeader roomType={roomType}>
        <div className="left-section">
          <div className="left-section__role-tag">
            <span>
              {roomType === "USER" ? "유저" : "AI"} 면접관
            </span>
          </div>
          <h2>
            {data.data.roomName}
          </h2>
        </div>
        <div className="right-section">
          <p className="right-section__time">
            {formatDate(data.data.createdAt)} 면접
          </p>
          <p className="right-section__option">
            {roomType === "AI" ? (
              <>질문 개수: {data.data.roomQuestionNum}개</>
            ) : ( // TODO: 진행 시간!
              <>진행 시간: 15분</>
            )}
          </p>
        </div>
      </StyledHeader>

      {children}

      <StyledMemoSection>
        <StyledLabel htmlFor="result-detail-comment">메모장</StyledLabel>
        <StyledTextarea
          id="result-detail-comment"
          placeholder="면접에 대한 메모를 남겨보세요."
          value={resultMemo}
          onChange={handleMemoChange}
        />
        <StyledSubmitButton type="button" onClick={handleMemoSubmit}>
          저장
        </StyledSubmitButton>
      </StyledMemoSection>
    </StyledWrapper>
  );
};

export default ResultDetailsLayout;

const StyledWrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 1200px;
  margin-top: 70px;
`;

const StyledHeader = styled.header<{ roomType: "USER" | "AI" }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  margin-bottom: 56px;

  .left-section {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    &__role-tag {
      width: 100px;
      height: 24px;
      background-color:
        ${({ roomType }) => roomType === "AI"
    ? "var(--main-blue)"
    : "var(--main-black)"
};
      border-radius: 5px;

      & span {
        font-size: 1.2rem;
        color: var(--main-white);
      }
    }

    & h2 {
      margin: 0;
      margin-left: 13px;
      font-weight: 500;
      font-size: 2.4rem;
    }
  }

  .right-section {
    font-size: 1.2rem;
    text-align: right;

    & p {
      margin: 0;
      padding: 0;
    }

    &__time {
      color: var(--main-black);
    }
    &__option {
      color: var(--font-gray);
    }
  }
`;

const StyledMemoSection = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  width: 100%;
  margin-top: 30px;
`;

const StyledLabel = styled.label`
  ${commonLabelStyle}
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  border: 2px solid var(--main-black);
  box-shadow: var(--box-shadow);
  font-size: 1.4rem;
  font-family: "Archivo", "Spoqa Han Sans Neo", sans-serif;
  padding: 20px;
  resize: none;
  box-sizing: border-box;

  &::placeholder {
    font-family: "Archivo", "Spoqa Han Sans Neo", sans-serif;
    font-size: 1.4rem;
  }
`;

const StyledSubmitButton = styled.button`
  width: 100px;
  border: 0;
  padding: 10px;
  border-radius: 6px;
  background-color: var(--main-blue);
  color: var(--main-white);
  font-size: 1.4rem;
  text-align: center;
  align-self: flex-end;
  margin: 16px 0 0;
  transition: all 200ms;

  &:hover {
    background-color: var(--light-blue);
  }
  &:active {
    background-color: var(--push-blue);
  }
`;

const modalStyles: ModalProps["styles"] = {
  root: {
    top: "24%",
  },
  modal: {
    position: "relative",
    width: "500px",
    height: "200px",
    padding: "50px 35px",
    boxSizing: "border-box",
    boxShadow: "var(--box-shadow)",
    borderRadius: "15px",
    overflow: "hidden",
    fontSize: "24px",
    textAlign: "center",
    lineHeight: "100px",
  },
};
