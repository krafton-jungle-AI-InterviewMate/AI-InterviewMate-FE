import styled from "@emotion/styled";

interface BtnSize {
  width: string;
  height: string;
}

export const StyledRedBtn = styled.div<BtnSize>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  color: var(--main-black);
  background-color: var(--main-white);
  border-radius: ${props => (props.width === "250px" ? "15px 30px" : "5px 15px")};
  font-size: ${props => (props.width === "250px" ? "24px" : "20px")};
  font-weight: 400;
  text-align: center;
  transition: 0.2s;
  &:hover {
    background-color: var(--main-alert);
    color: var(--main-white);
  }
  &:active {
    background-color: var(--push-alert);
  }
`;
