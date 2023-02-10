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
  color: white;
  background-color: var(--main-orange);
  border-radius: ${props => (props.width === "250px" ? "15px 30px" : "5px 15px")};
  font-size: ${props =>
    props.width === "250px" ? "24px" : props.width === "200px" ? "20px" : "16px"};
  font-weight: 400;
  text-align: center;
  transition: 0.2s;
  &:hover {
    background-color: var(--light-orange);
    cursor: pointer;
  }
  &:active {
    background-color: var(--push-orange);
  }
`;
