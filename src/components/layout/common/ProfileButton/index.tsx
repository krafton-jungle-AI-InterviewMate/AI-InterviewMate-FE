import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { memberAtom } from "store/auth/atom";
import useLogout from "hooks/useLogout";

import { PagesPath } from "constants/pages";

import Popover from "@mui/material/Popover";
import { popoverStyleOverride } from "./styles";

const ProfileButton = () => {
  const { pathname } = useLocation();
  
  const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement | null>(null);

  const {
    accessToken,
    nickname,
  } = useRecoilValue(memberAtom);

  const {
    handleLogout,
  } = useLogout();

  if (pathname === PagesPath.LOGIN) {
    return null;
  }

  const handleProfileButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pathname === PagesPath.MYPAGE) {
      return;
    }

    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return accessToken ? (
    <>
      <button type="button" className="profile" onClick={handleProfileButtonClick}>
        {nickname}
      </button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={popoverStyleOverride}
      >
        <Link to={PagesPath.MYPAGE} className="mypageLink">
          마이페이지
        </Link>
        <button type="button" className="logout" onClick={handleLogout}>
          로그아웃
        </button>
      </Popover>
    </>
  ) : (
    <Link to={PagesPath.LOGIN} style={{ fontSize: "1.8rem" }}>
      로그인
    </Link>
  );
};

export default ProfileButton;
