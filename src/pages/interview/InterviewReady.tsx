import { useNavigate } from "react-router-dom";
import InterviewReadyContainer from "components/interview/InterviewReadyContainer";

import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "@emotion/styled";
import { commonButtonStyle } from "styles/common";

const InterviewReady = () => {
  const navigate = useNavigate();

  const handleCancelButton = () => {
    // TODO: 컨펌 팝업
    navigate("/lobby");
  };

  const handleGoButton = () => {
    // TODO: landmarks 상태 저장
    navigate("/interview/ai");
  };

  return (
    <StyledWrapper>
      <InterviewReadyContainer />
      <StyledFlexContainer>
        <StyledButtonBox>
          <StyledCancelButton type="button" onClick={handleCancelButton}>
            면접 취소하기
          </StyledCancelButton>
          <StyledGoButton type="button" onClick={handleGoButton}>
            GO
            <StyledInformation>
              <AiOutlineInfoCircle size={24} />
              <small>
                참가 면접관이 모두 READY 상태여야
                <br />
                면접을 시작할 수 있습니다.
              </small>
            </StyledInformation>
          </StyledGoButton>
        </StyledButtonBox>
      </StyledFlexContainer>
    </StyledWrapper>
  );
};

export default InterviewReady;

const StyledWrapper = styled.section`
  width: 1000px;
`;

const StyledFlexContainer = styled.div`
  display: flex;
  flex-flow: row-reverse nowrap;
  margin-top: 160px;
`;

const StyledButtonBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 430px;
`;

const StyledCancelButton = styled.button`
  ${commonButtonStyle}
  background-color: var(--main-white);
  border: 1px solid var(--main-black);

  &:hover {
    background-color: var(--light-alert);
    color: var(--main-white);
    border-color: transparent;
  }
  &:active {
    background-color: var(--push-alert);
  }
`;

const StyledGoButton = styled.button`
  position: relative;
  ${commonButtonStyle}
  background-color: var(--main-orange);
  margin-left: 28px;

  &:hover {
    background-color: var(--light-orange);
  }
  &:active {
    background-color: var(--push-orange);
  }
`;

const StyledInformation = styled.div`
  position: absolute;
  left: 0;
  bottom: -40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 216px;
  color: var(--font-gray);

  & small {
    display: block;
    width: 100%;
    font-size: 12px;
    text-align: left;
    margin-left: 4px;
  }
`;
