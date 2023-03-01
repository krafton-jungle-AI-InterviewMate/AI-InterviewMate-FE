import { GetRatingDetailResponse, RoomTypes } from "api/mypage/types";
import { formatDate } from "lib/format";

import styled from "@emotion/styled";

type ResultDetailsLayoutProps = {
  roomType: RoomTypes;
  data: GetRatingDetailResponse;
  children: React.ReactNode;
};

const ResultDetailsLayout = (props: ResultDetailsLayoutProps) => {
  const { roomType, data, children } = props;

  return (
    <StyledWrapper>
      <StyledHeader>
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

      <StyledCommentSection>
        <StyledLabel htmlFor="result-detail-comment">코멘트</StyledLabel>
        <StyledTextarea id="result-detail-comment" />
        <StyledSubmitButton type="button">저장</StyledSubmitButton>
      </StyledCommentSection>
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

const StyledHeader = styled.header`
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
      background-color: var(--push-gray);
      border-radius: 5px;

      & span {
        font-size: 12px;
        color: var(--main-white);
      }
    }

    & h2 {
      margin: 0;
      margin-left: 13px;
      font-weight: 500;
      font-size: 24px;
    }
  }

  .right-section {
    font-size: 14px;
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

const StyledCommentSection = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  width: 100%;
  margin-top: 30px;
`;

const StyledLabel = styled.label`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  border: 1px solid var(--main-gray);
  box-shadow: var(--box-shadow);
  font-size: 16px;
  font-family: "Archivo", "Spoqa Han Sans Neo", sans-serif;
  padding: 20px;
  resize: none;
  box-sizing: border-box;
`;

const StyledSubmitButton = styled.button`
  width: 100px;
  border: 0;
  padding: 10px;
  border-radius: 6px;
  background-color: var(--main-blue);
  color: var(--main-white);
  font-size: 16px;
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
