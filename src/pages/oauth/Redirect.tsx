import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isLoggedInCookie } from "lib/cookies";
import { useSetRecoilState } from "recoil";
import { memberAtom } from "store/auth/atom";

import Loading from "components/common/Loading";

import { PagesPath } from "constants/pages";

const Redirect = () => {
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  const setMember = useSetRecoilState(memberAtom);

  useEffect(() => {
    if (searchParams) {
      const accessToken = searchParams.get("accessToken");

      if (accessToken) {
        isLoggedInCookie.set(true);
        // TODO: 멤버 정보 요청

        setMember((curr) => ({
          accessToken,
          username: curr.username,
        }));
      }

      navigate(PagesPath.LOBBY, {
        replace: true,
      });
    }
  }, [ searchParams ]);

  return (
    <div>
      <Loading margin="60px 0 0" />
      잠시만 기다려주세요.
    </div>
  );
};

export default Redirect;
