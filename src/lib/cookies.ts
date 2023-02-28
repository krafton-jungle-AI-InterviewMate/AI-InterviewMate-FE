import { Cookies } from "react-cookie";
import { ONE_DAY } from "constants/common";

const cookies = new Cookies();

const getCookieExpireDate = (duration: number) => {
  const todayInMilliseconds = new Date().getTime();
  return new Date(todayInMilliseconds + (ONE_DAY * duration));
};

export const CookieName = {
  IS_LOGGED_IN: "isLoggedIn",
};

export const isLoggedInCookie = {
  set: (isLoggedIn: boolean) => {
    const expireDate = getCookieExpireDate(1);

    cookies.set(CookieName.IS_LOGGED_IN, isLoggedIn, {
      sameSite: "strict",
      path: "/",
      expires: expireDate,
      secure: true,
    });
  },

  get: () => cookies.get(CookieName.IS_LOGGED_IN),

  // uses when logout
  remove: () => {
    cookies.remove(CookieName.IS_LOGGED_IN, {
      sameSite: "strict",
      path: "/",
      secure: true,
    });
  },
};
