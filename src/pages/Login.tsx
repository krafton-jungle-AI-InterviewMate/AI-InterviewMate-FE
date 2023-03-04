import SocialLoginLink from "components/login/SocialLoginLink";
import { Providers } from "constants/login";
import { BASE_URL, API_PATH } from "constants/api";
import { PagesPath } from "constants/pages";

import styled from "@emotion/styled";

const Login = () => {
  return (
    <StyledSection>
      <StyledH2>간편 로그인</StyledH2>
      <StyledButtons>
        {Providers.map((provider) =>
          <li key={provider}>
            <SocialLoginLink
              provider={provider}
              href={`${BASE_URL}${API_PATH.GET_AUTHORIZATION(
                {
                  social: provider,
                  redirect_uri: PagesPath.REDIRECT_URI,
                },
              )}`}
              target="_self"
              rel=""
            />
          </li>,
        )}
      </StyledButtons>
    </StyledSection>
  );
};

export default Login;

const StyledSection = styled.section`
  margin-top: 60px;
  width: 800px;
  height: 400px;
  padding: 60px;
  border-radius: 16px;
  border: 2px solid black;
  box-shadow: 0px 6px 24px 0px rgba(255, 132, 0, 0.05), 6px 0px 24px 0px rgba(0, 132, 255, 0.1);
`;

const StyledH2 = styled.h2`
  font-size: 2.4rem;
  font-weight: 500;
  margin: 0 auto 100px;
`;

const StyledButtons = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 60px;
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
