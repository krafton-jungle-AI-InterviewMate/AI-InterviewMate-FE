import { Cookies } from "react-cookie";
import { ONE_DAY } from "constants/common";

const cookies = new Cookies();
const COOKIE_NAME = "refresh_token";

const refreshTokenCookies = {
  set: (refreshToken: string) => {
    const todayInMilliseconds = new Date().getTime();
    const expireDate = new Date(todayInMilliseconds + (ONE_DAY * 7));

    cookies.set(COOKIE_NAME, refreshToken, {
      sameSite: "strict",
      // use / as the path if you want your cookie to be accessible on all pages
      path: "/",
      expires: expireDate,
    });
  },

  get: () => cookies.get(COOKIE_NAME),

  // uses when logout
  remove: () => {
    cookies.remove(COOKIE_NAME, {
      sameSite: "strict",
      path: "/",
    });
  },
};

export default refreshTokenCookies;
