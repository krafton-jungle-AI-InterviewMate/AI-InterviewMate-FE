import styled from "@emotion/styled";
import { ClipLoader } from "react-spinners";

interface LoadingProps {
  margin: string;
}

const StyledLoading = styled.div<LoadingProps>`
  margin: ${props => props.margin};
`;

const Loading = (props: LoadingProps) => {
  const {
    margin,
  } = props;

  return (
    <StyledLoading margin={margin}>
      <ClipLoader color="var(--main-blue)" size={50} />
    </StyledLoading>
  );
};

export default Loading;
