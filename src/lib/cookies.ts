import { Cookies } from "react-cookie";
import { ONE_DAY } from "constants/common";

const cookies = new Cookies();
const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";

export const refreshTokenCookies = {
  set: (refreshToken: string) => {
    // * refresh token 만료일 = 자동 로그인 유지 기간
    const todayInMilliseconds = new Date().getTime();
    const expireDate = new Date(todayInMilliseconds + ONE_DAY);

    cookies.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      sameSite: "strict",
      // use / as the path if you want your cookie to be accessible on all pages
      path: "/",
      expires: expireDate,
      httpOnly: true,
    });
  },

  get: () => cookies.get(REFRESH_TOKEN_COOKIE_NAME),

  // uses when logout
  remove: () => {
    cookies.remove(REFRESH_TOKEN_COOKIE_NAME, {
      sameSite: "strict",
      path: "/",
    });
  },
};
