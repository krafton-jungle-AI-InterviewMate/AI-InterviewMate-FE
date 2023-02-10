import styled from "@emotion/styled";

type NavProps = {
  children: React.ReactNode;
}

const Nav = (props: NavProps) => {
  const {
    children,
  } = props;

  return (
    <StyledNav>
      {children}
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

  button.profile {
    font-size: 20px;
    background-color: transparent;
    border: none;
    outline: none;
    padding-right: 0;
  }
`;

export default Nav;
