import styled from "@emotion/styled";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledBtn } from "styles/StyledBtn";
import { useState } from "react";

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
    .dialogContents {
      font-size: 24px;
      font-weight: 400;
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

const StyledBtnStlyed = styled(StyledBtn)`
  margin-right: 25px;
`;

interface QuestionsProps {
  boxName: string;
  idx: number;
  questionNum: number;
}

const Questions = ({ boxName, idx, questionNum }: QuestionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickDelete = () => {
    setIsOpen(true);
  };
  const handleClickClose = () => {
    setIsOpen(false);
  };
  return (
    <StyledQuestions>
      <div className="contents">
        <StyledLink to="/*">
          <h2>{boxName}</h2>
          <span>{questionNum} / 30</span>
        </StyledLink>
        <StyledBtn onClick={handleClickDelete} width="100px" height="32px" color="red">
          비우기
        </StyledBtn>
        <Dialog
          open={isOpen}
          onClose={handleClickClose}
          PaperProps={{
            style: {
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              padding: "50px 35px",
            },
          }}
        >
          <DialogTitle
            fontSize={24}
            fontWeight={400}
            color={"var(--main-black)"}
            marginBottom={9}
            padding={0}
          >
            꾸러미를 비우시겠습니까?
          </DialogTitle>
          <DialogActions className="dialogActions">
            <StyledBtnStlyed onClick={handleClickClose} width="200px" height="42px" color="orange">
              네!
            </StyledBtnStlyed>
            <StyledBtn onClick={handleClickClose} width="200px" height="42px" color="red">
              취소
            </StyledBtn>
          </DialogActions>
        </Dialog>
      </div>
    </StyledQuestions>
  );
};

export default Questions;
