import { atom } from "recoil";
import { Member } from "types/auth";

export const memberInitialState: Member = {
  accessToken: "",
  idx: 0,
  nickname: "",
  email: "",
  authProvider: "google",
};

export const memberAtom = atom<Member>({
  key: "Member",
  default: memberInitialState,
});

export const azureTokenAtom = atom<string>({
  key: "AzureToken",
  default: "",
});
