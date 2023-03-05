import styled from "@emotion/styled";
import { a11yHidden } from "styles/common";

export const Wrapper = styled.section`
  width: 1200px;
  margin-top: 70px;
`;

export const TitleWrap = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 642px;
  margin-bottom: 44px;
`;

export const CheckIcon = styled.i`
  position: absolute;
  right: -50px;
  font-size: 2rem;
  font-style: normal;
`;

export const HiddenLabel = styled.label`
  ${a11yHidden}
`;

export const Input = styled.input`
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--push-gray);
  font-family: "Archivo", "Spoqa Han Sans Neo", sans-serif;
  font-size: 2rem;
  color: var(--main-black);
  padding: 6px;
`;

export const EditButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  background-color: transparent;
  font-size: 1.6rem;
  color: var(--font-gray);
`;

export const List = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  padding-bottom: 120px;
  margin: 0;

  & .empty {
    padding-top: 60px;
    font-size: 1.6rem;
    color: var(--font-gray);
    opacity: .6;
  }
`;

export const Question = styled.li`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 78px;
  border-radius: var(--button-border-radius);
  border: 2px solid var(--main-black);
  box-shadow: var(--box-shadow);
  margin-bottom: 32px;
  padding: 7px 10px 7px 32px;
  box-sizing: border-box;
  transition: border-color 200ms;

  &:hover {
    border-color: var(--main-orange);
  }
`;

export const LeftSecion = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 120px);
`;

export const Icon = styled.i`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 54px;
  height: 54px;
  border-radius: 999px;
  font-style: normal;
  font-weight: 700;
  font-size: 1.8rem;
  color: var(--main-white);
  background-color: var(--main-black);
  margin-right: 12px;
`;

export const QuestionButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--main-black);
  padding-left: 0;
  width: 100%;
  text-align: left;
`;

export const FixedBottom = styled.div`
  position: fixed;
  bottom: 0;
  right: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100vw;
  background: var(--main-white);
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(253,187,45,0) 100%);
`;

export const AddQuestionButton = styled.button`
  width: 1000px;
  height: 80px;
  margin: 0px auto 60px;
  border-radius: var(--button-border-radius);
  background-color: var(--main-orange);
  color: var(--main-white);
  font-size: 2rem;
  font-weight: 500;
  transition: background-color 200ms;

  &:hover {
    background-color: var(--light-orange);
  }
  &:active {
    background-color: var(--push-orange);
  }
`;
