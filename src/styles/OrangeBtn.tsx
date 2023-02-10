import styled from "@emotion/styled";

interface BtnSize {
  width: string;
  height: string;
}

export const StyledOrangeBtn = styled.div<BtnSize>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  margin-top: 60px;
  color: white;
  background-color: var(--main-orange);
  border-radius: 15px 30px;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  transition: 0.2s;
  &:hover {
    background-color: var(--light-orange);
  }
  &:active {
    background-color: var(--push-orange);
  }
`;
