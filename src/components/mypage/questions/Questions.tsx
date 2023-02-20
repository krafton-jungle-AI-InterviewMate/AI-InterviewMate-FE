import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { StyledBtn } from "styles/StyledBtn";

const StyledQuestions = styled.div`
  width: 900px;
  margin-bottom: 32px;
  border-radius: 5px 15px;
  border: 1px solid var(--main-gray);
  background-color: var(--main-white);
  color: var(--main-black);
  transition: all 0.2s;
  filter: drop-shadow(0px 6px 24px rgba(0, 0, 0, 0.03));
  &:hover {
    border-color: var(--main-orange);
  }
  .contents {
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .questionInfo {
      display: flex;
      align-items: center;
      span {
        margin-right: 24px;
      }
    }
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;
  height: 32px;
  padding: 10px 0;
  h2 {
    font-size: 20px;
    font-weight: 500;
    margin: 0;
    color: var(--main-black);
  }
  span {
    color: var(--main-black);
  }
`;

const Questions = ({ boxName, idx, questionNum }) => {
  const onClickDelete = () => {
    console.log("delete");
  };
  return (
    <StyledQuestions>
      <div className="contents">
        <StyledLink to="/*">
          <h2>{boxName}</h2>
          <span>{questionNum} / 30</span>
        </StyledLink>
        <StyledBtn onClick={onClickDelete} width="100px" height="32px" color="red">
          비우기
        </StyledBtn>
      </div>
    </StyledQuestions>
  );
};

export default Questions;
