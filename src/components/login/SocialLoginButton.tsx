import { SocialLoginProviderType } from "types/login";
import { ProviderName } from "constants/login";

import googleIcon from "static/images/login-google.svg";
import githubIcon from "static/images/login-github.svg";
import kakaoLogin from "static/images/kakao_login_medium_wide.png";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

type SocialLoginButtonProps = {
  provider: SocialLoginProviderType;
}

const SocialLoginButton = (props: SocialLoginButtonProps) => {
  const {
    provider,
  } = props;

  return (
    <StyledButton provider={provider} type="button" onClick={() => {}}>
      {provider === "kakao" ? (
        <img src={kakaoLogin} alt="카카오 로그인" />
      ) : (
        <>
          <img className={provider} src={provider === "github" ? githubIcon : googleIcon} alt="" />
          <StyledText>{ProviderName[provider]} 로그인</StyledText>
        </>
      )}
    </StyledButton>
  );
};

export default SocialLoginButton;

const StyledButton = styled.button<{ provider: SocialLoginProviderType }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 45px;
  padding: 0;
  border-radius: 5px;
  font-weight: 500;
  font-size: 14px;
  background-color: transparent;
  overflow: hidden;

  & img.github {
    width: 24px;
    height: 24px;
    margin-left: 12px;
  }

  /**
  디자인 가이드 참고:
  https://developers.google.com/identity/branding-guidelines?hl=ko#matching
  */
  ${({ provider }) => provider === "google" && css`
    background-color: var(--main-white);
    color: var(--main-black);
    box-shadow: 0px 1px 4px 0px var(--push-gray);
    font-family: "Roboto", "Spoqa Han Sans Neo", sans-serif;
  `}

  ${({ provider }) => provider === "github" && css`
    background-color: var(--github-black);
    color: var(--main-white);
  `}
`;

const StyledText = styled.span`
  width: calc(300px - 42px);
  text-align: center;
`;

