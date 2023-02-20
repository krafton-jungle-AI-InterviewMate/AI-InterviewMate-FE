import { useState, useEffect } from "react";
import SocialLoginButton from "components/login/SocialLoginButton";
import { Providers } from "constants/login";
import { useGetAuthorization } from "hooks/queries/auth";
import { SocialTypes } from "api/auth/type";
import { AUTH_REDIRECT_URI } from "constants/api";

import styled from "@emotion/styled";

const Login = () => {
  const [ social, setSocial ] = useState<SocialTypes>("google");
  const [ isAuthEnabled, setIsAuthEnabled ] = useState(false);

  const {
    data,
    isSuccess,
  } = useGetAuthorization({
    social,
    redirect_uri: AUTH_REDIRECT_URI,
  }, isAuthEnabled);

  const handleClick = (provider: SocialTypes) => {
    setSocial(provider);
    setIsAuthEnabled(true);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      // ! TODO: set cookie
    }
  }, [ data ]);

  return (
    <StyledSection>
      <StyledH2>간편 로그인</StyledH2>
      <StyledButtons>
        {Providers.map((provider) =>
          <li key={provider}>
            <SocialLoginButton
              provider={provider}
              onClick={() => handleClick(provider)}
            />
          </li>,
        )}
      </StyledButtons>
    </StyledSection>
  );
};

export default Login;

const StyledSection = styled.section`
  margin-top: 120px;
  width: 300px;
`;

const StyledH2 = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin: 0 auto 30px;
`;

const StyledButtons = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  & > li {
    margin-bottom: 20px;

    &:last-of-type {
      margin: 0;
    }
  }
`;
