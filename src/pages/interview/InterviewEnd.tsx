import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { StyledRedBtn } from "styles/RedBtn";

const StyledInterviewEnd = styled.div`
  color: var(--main-black);
  h3 {
    margin: 50px 0;
    font-size: 36px;
  }
  .endContents {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 78px;
    border-radius: 5px;
    border: 1px solid var(--main-gray);
    background-color: var(--main-white);
    p {
      margin: 0px 0px 80px;
      font-size: 20px;
    }
    filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.04));
    span {
      font-size: 12px;
      color: var(--font-gray);
      margin-bottom: 15px;
    }
  }
`;

function InterviewEnd() {
  return (
    <StyledInterviewEnd>
      <h3>인터뷰 종료!</h3>
      <div className="endContents">
        <p>수고하셨습니다.</p>
        <span>인터뷰 결과는 마이페이지에서 확인하실 수 있습니다.</span>
        <Link to="/lobby">
          <StyledRedBtn width="100px" height="32px">
            나가기
          </StyledRedBtn>
        </Link>
      </div>
    </StyledInterviewEnd>
  );
}

export default InterviewEnd;
