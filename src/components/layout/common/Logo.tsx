import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const Logo = () => {
  return (
    <StyledH1>
      <Link to="/">
        인터뷰<span>메이트</span>
      </Link>
    </StyledH1>
  );
};

export default Logo;

const StyledH1 = styled.h1`
  & a {
    font-size: 32px;
    vertical-align: 30%;
    color: var(--main-black);

    & span {
      color: var(--main-blue);
    }
  }
`;
