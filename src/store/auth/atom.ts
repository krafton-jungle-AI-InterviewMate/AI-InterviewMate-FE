import { atom } from "recoil";
import { Member } from "types/auth";

export const memberInitialState: Member = {
  isLoggedIn: false,
  accessToken: "",
  username: "",
};

export const memberAtom = atom<Member>({
  key: "Member",
  default: memberInitialState,
});
