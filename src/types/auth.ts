export type SocialLoginProviderType = "google" | "github" | "kakao";

export type Member = {
  isLoggedIn: boolean;
  accessToken: string;
  username: string;
};
