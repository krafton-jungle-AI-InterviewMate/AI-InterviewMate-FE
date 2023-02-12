import ResultTable from "components/mypage/ResultTable";

import styled from "@emotion/styled";

const ResultDetails = () => {
  return (
    <StyledWrapper>
      <StyledHeader>
        <div className="left-section">
          <div className="left-section__role-tag">
            <span>AI 면접관</span>
          </div>
          <h2>
            JS 면접 준비
          </h2>
        </div>
        <div className="right-section">
          <p className="right-section__time">2월 6일 일요일 17:32 면접</p>
          <p className="right-section__option">질문 개수: 3개</p>
        </div>
      </StyledHeader>
      <ResultTable />
    </StyledWrapper>
  );
};

export default ResultDetails;

const StyledWrapper = styled.section`
  width: 900px;
  margin-top: 70px;
`;

const StyledHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: baseline;
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
