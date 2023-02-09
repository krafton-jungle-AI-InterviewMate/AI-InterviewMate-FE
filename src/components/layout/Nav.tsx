import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const Nav = () => {
  return (
    <StyledNav>
      <h1>
        <Link to="/">
          인터뷰<span>메이트</span>
        </Link>
      </h1>
      <button type="button" className="profile">
        김기태님
      </button>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  height: 150px;

  h1 {
    font-size: 32px;
    color: var(--main-black);

    & span {
      color: var(--main-blue);
    }
  }

  button.profile {
    font-size: 20px;
    background-color: transparent;
    border: none;
    outline: none;
    padding-right: 0;
  }
`;

export default Nav;
