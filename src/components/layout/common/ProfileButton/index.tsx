import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Popover from "@mui/material/Popover";
import { popoverStyleOverride } from "./styles";

const ProfileButton = () => {
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
    <>
      <button type="button" className="profile" onClick={handleProfileButtonClick}>
        김기태님
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
        <Link to="/mypage" className="mypageLink">
          마이페이지
        </Link>
        <button type="button" className="logout" onClick={() => {}}>
          로그아웃
        </button>
      </Popover>
    </>
  );
};

export default ProfileButton;
