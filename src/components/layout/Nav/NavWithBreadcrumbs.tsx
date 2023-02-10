import Nav from "./Nav";
import Logo from "components/layout/common/Logo";
import Breadcrumbs from "components/layout/common/Breadcrumbs";
import ProfileButton from "components/layout/common/ProfileButton";

import styled from "@emotion/styled";

const NavWithBreadcrumbs = () => {
  return (
    <Nav>
      <StyledLeftSection>
        <Logo />
        <Breadcrumbs />
      </StyledLeftSection>
      <ProfileButton />
    </Nav>
  );
};

export default NavWithBreadcrumbs;

const StyledLeftSection = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  & a:hover {
    color: var(--push-blue);
  }
`;
