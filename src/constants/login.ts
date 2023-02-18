import { SocialLoginProviderType } from "types/login";

export const Providers: Array<SocialLoginProviderType> = [
  "google", "github", "kakao",
];
export const ProviderName: { [name in SocialLoginProviderType]: string } = {
  "google": "Google",
  "github": "GitHub",
  "kakao": "카카오",
} as const;
