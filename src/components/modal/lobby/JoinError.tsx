import styled from "@emotion/styled";
import { StyledBtn } from "styles/StyledBtn";

const StyledJoinError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  .contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    padding: 50px;
    background-color: var(--main-white);
    h2 {
      font-size: 24px;
      font-weight: 400;
      color: var(--main-black);
      margin-bottom: 78px;
    }
  }
`;

function JoinError({ setIsJoinError }) {
  const onClickCancel = () => {
    setIsJoinError(false);
  };
  return (
    <StyledJoinError>
      <div className="contents">
        <h2>이 방에는 입장하실 수 없습니다.</h2>
        <StyledBtn onClick={onClickCancel} width="200px" height="42px" color="orange">
          네!
        </StyledBtn>
      </div>
    </StyledJoinError>
  );
}

export default JoinError;
