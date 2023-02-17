import styled from "@emotion/styled";

const Login = () => {
  return (
    <StyledSection>
      <StyledH2>간편 로그인</StyledH2>
    </StyledSection>
  );
};

export default Login;

const StyledSection = styled.section`
  margin-top: 120px;
  width: 360px;

  background-color: ivory;
`;

const StyledH2 = styled.h2`
  font-size: 24px;
  font-weight: 400;
`;
