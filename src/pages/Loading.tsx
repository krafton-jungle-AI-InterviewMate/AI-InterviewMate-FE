import styled from "@emotion/styled";
import { ClipLoader } from "react-spinners";

interface StyledLoadingProps {
  margin: string;
}

const StyledLoading = styled.div<StyledLoadingProps>`
  margin: ${props => props.margin};
`;

function Loading({ margin }) {
  return (
    <StyledLoading margin={margin}>
      <ClipLoader color="#146eb4" size={50} />
    </StyledLoading>
  );
}

export default Loading;
