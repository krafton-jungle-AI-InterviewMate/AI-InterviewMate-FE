import { AxiosResponse } from "axios";

type ResponseStatus = {
  statusCode: number;
  statusMsg: string;
};

export type SocialTypes = "google" | "github" | "kakao";

export type GetAuthorizationParams = {
  social: SocialTypes;
  redirect_uri: string;
};

export type GetAuthorizationResponse = ResponseStatus;

export type GetAuthorization = (params: GetAuthorizationParams) =>
  Promise<AxiosResponse<GetAuthorizationResponse>>;


type AccessToken = {
  accessToken: string;
};

export type GetRefreshResponse = ResponseStatus & {
  data: AccessToken;
};

export type GetRefresh = () => Promise<AxiosResponse<GetRefreshResponse>>;

export type Myinfo = {
  idx: number;
  nickname: string;
  email: string;
  authProvider: SocialTypes;
  refreshToken: string;
}

export type GetMyinfoResponse = ResponseStatus & {
  data: Myinfo;
};

export type GetMyinfo = () => Promise<AxiosResponse<GetMyinfoResponse>>;

export type GetAzureTokenResponse = {
  token: string;
  region: string;
};

export type GetAzureToken = () => Promise<AxiosResponse<GetAzureTokenResponse>>;
