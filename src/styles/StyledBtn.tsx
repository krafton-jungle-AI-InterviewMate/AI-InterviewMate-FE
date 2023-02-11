import styled from "@emotion/styled";

interface StyledBtnProps {
  width: string;
  height: string;
  color: string;
}

export const StyledBtn = styled.div<StyledBtnProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  color: ${props => (props.color === "orange" ? "var(--main-white)" : "var(--main-black)")};
  background-color: ${props =>
    props.color === "orange" ? "var(--main-orange)" : "var(--main-white)"};
  border-radius: ${props => (props.width === "250px" ? "15px 30px" : "5px 15px")};
  ${props =>
    props.color === "orange" ? null : "filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.5))"};
  font-size: ${props =>
    props.width === "250px" ? "24px" : props.width === "200px" ? "20px" : "16px"};
  font-weight: 400;
  text-align: center;
  transition: 0.2s;
  &:hover {
    background-color: ${props =>
      props.color === "orange"
        ? "var(--light-orange)"
        : props.color === "blue"
        ? "var(--main-blue)"
        : "var(--main-alert)"};
    color: var(--main-white);
    cursor: pointer;
  }
  &:active {
    background-color: ${props =>
      props.color === "orange"
        ? "var(--push-orange)"
        : props.color === "blue"
        ? "var(--push-blue)"
        : "var(--push-alert)"};
  }
`;
