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

export type GetAuthorizationResponse = ResponseStatus & {
  data: any; // FIXME: response 확인 후 변경
};

export type GetAuthorization = (params: GetAuthorizationParams) =>
  Promise<AxiosResponse<GetAuthorizationResponse>>;
