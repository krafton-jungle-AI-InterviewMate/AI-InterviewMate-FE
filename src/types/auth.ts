import { Myinfo } from "api/auth/type";

export type SocialLoginProviderType = "google" | "github" | "kakao";

export type Member = Myinfo & {
  accessToken: string;
};
