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
  position: fixed;
  top: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
  height: 150px;
  background: var(--main-white);
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(253,187,45,0) 100%);
  z-index: 11;
  backdrop-filter: blur(3px);

  button.profile {
    font-size: 20px;
    background-color: transparent;
    border: none;
    outline: none;
    padding-right: 0;
  }
`;

export default Nav;
