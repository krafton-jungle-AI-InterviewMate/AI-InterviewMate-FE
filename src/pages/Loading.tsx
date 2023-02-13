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
      <ClipLoader color="var(--main-blue)" size={50} />
    </StyledLoading>
  );
}

export default Loading;
