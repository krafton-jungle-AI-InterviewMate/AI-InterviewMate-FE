import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { memberAtom, memberInitialState } from "store/auth/atom";
import { isLoggedInCookie } from "lib/cookies";
import { PagesPath } from "constants/pages";

const useLogout = () => {
  const navigate = useNavigate();
  const setMember = useSetRecoilState(memberAtom);

  const handleLogout = () => {
    isLoggedInCookie.remove();
    setMember(memberInitialState);
    navigate(PagesPath.INDEX);
  };

  return {
    handleLogout,
  };
};

export default useLogout;
