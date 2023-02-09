import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Popover from "@mui/material/Popover";
import { popoverStyleOverride } from "./styles";
import styled from "@emotion/styled";

const Nav = () => {
  const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement | null>(null);

  const { pathname } = useLocation();

  const handleProfileButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pathname === "/mypage") {
      return;
    }

    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledNav>
      <h1>
        <Link to="/">
          인터뷰<span>메이트</span>
        </Link>
      </h1>
      <button type="button" className="profile" onClick={handleProfileButtonClick}>
        김기태님
      </button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={popoverStyleOverride}
      >
        <Link to="/mypage" className="mypageLink">
          마이페이지
        </Link>
        <button type="button" className="logout" onClick={() => {}}>
          로그아웃
        </button>
      </Popover>
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
