import { atom } from "recoil";
import { Member } from "types/auth";

export const memberInitialState: Member = {
  accessToken: "",
  username: "테스트",
};

export const memberAtom = atom<Member>({
  key: "Member",
  default: memberInitialState,
});
