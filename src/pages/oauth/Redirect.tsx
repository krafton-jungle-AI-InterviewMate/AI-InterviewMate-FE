import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isLoggedInCookie } from "lib/cookies";
import { useRecoilState } from "recoil";
import { memberAtom } from "store/auth/atom";
import { useGetMyinfo } from "hooks/queries/auth";

import Loading from "components/common/Loading";

import { PagesPath } from "constants/pages";

const Redirect = () => {
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  const [ member, setMember ] = useRecoilState(memberAtom);

  const {
    data: myinfo,
    isSuccess: isMyinfoSuccess,
  } = useGetMyinfo(!!member.accessToken);

  useEffect(() => {
    if (searchParams) {
      const accessToken = searchParams.get("accessToken");

      if (accessToken) {
        isLoggedInCookie.set(true);

        setMember(({ idx, nickname, email, authProvider }) => ({
          accessToken,
          idx,
          nickname,
          email,
          authProvider,
        }));
      }
    }
  }, [ searchParams ]);

  useEffect(() => {
    if (isMyinfoSuccess && myinfo) {
      const {
        data: {
          data: {
            idx, nickname, email, authProvider,
          },
        },
      } = myinfo;

      setMember(({ accessToken }) => ({
        accessToken,
        idx,
        nickname,
        email,
        authProvider,
      }));

      navigate(PagesPath.LOBBY, {
        replace: true,
      });
    }
  }, [ isMyinfoSuccess ]);

  return (
    <div>
      <Loading margin="60px 0 0" />
      잠시만 기다려주세요.
    </div>
  );
};

export default Redirect;
