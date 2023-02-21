import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { memberAtom } from "store/auth/atom";

import { useGetRefresh } from "./queries/auth";
import useLogout from "./useLogout";
import { isLoggedInCookie } from "lib/cookies";

import { PagesPath } from "constants/pages";

/** 로그아웃 없이 앱을 종료하고 재접속한 경우인지 판별하고,
 *  그 경우에 해당한다면 access token을 재요청합니다.
 * 
 *  refresh token 자체가 만료된 경우에는 로그아웃 처리됩니다.
 *  (*refresh token 만료 여부는 백엔드에서 판별)
 */
const useCheckAuth = () => {
  const { pathname } = useLocation();

  const { accessToken } = useRecoilValue(memberAtom);
  const setMember = useSetRecoilState(memberAtom);
  const [ isFetchingEnabled, setIsFetchingEnabled ] = useState(false);

  const {
    data,
    isSuccess,
    isFetching,
  } = useGetRefresh(isFetchingEnabled);
  
  const { handleLogout } = useLogout();

  useEffect(() => {
    if (pathname === PagesPath.REDIRECT_URI || accessToken) {
      setIsFetchingEnabled(false);
      return;
    }

    const isLoggedIn = isLoggedInCookie.get();

    if (isLoggedIn) {
      setIsFetchingEnabled(true);
    }
  }, [ pathname ]);

  useEffect(() => {
    if (!isFetchingEnabled) {
      return;
    }
    if (isFetching) {
      return;
    }

    if (isSuccess && data) {
      const accessToken = data.data.data.accessToken;

      setMember((curr) => ({
        accessToken,
        username: curr.username, // TODO: update
      }));
    }
    else { // * refresh token 자체가 만료된 경우 isError === true
      handleLogout();
    }
  }, [ isFetchingEnabled, isFetching ]);

  return {
    isCheckingAuth: isFetching,
  };
};

export default useCheckAuth;