import { Link } from "react-router-dom";
import sorry from "static/images/sorry.svg";
import ExternalLink from "components/common/ExternalLink";
import styled from "@emotion/styled";

const NotAvailable = () => {
  return (
    <StyledWrap>
      <ExternalLink href="https://storyset.com/people">
        <StyledImg src={sorry} alt="People illustrations by Storyset" />
      </ExternalLink>
      <StyledTextBox>
        아쉽지만 현재 인터뷰메이트는
        <br />
        <em>크롬(Chrome)</em> 브라우저만 지원하고 있습니다.
        <br />

        <div className="space" />
        계속해서 이용하시려면 크롬을 설치하신 후
        <br />
        이용해주시길 바랍니다.

        <div className="space" />
        <ExternalLink href="https://www.google.co.kr/intl/ko/chrome/">
          👉 크롬 설치하러가기
        </ExternalLink>

        <div className="space" />
        <i>*</i> 접속 중이신 브라우저에서는 마이페이지 조회만 가능합니다.

        <div className="space" />
        <Link to="/mypage">
          👉 마이페이지로 이동
        </Link>
      </StyledTextBox>
    </StyledWrap>
  );
};

export default NotAvailable;

const StyledWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledImg = styled.img`
  width: 320px;
  margin-bottom: 30px;
`;

const StyledTextBox = styled.div`
  width: 400px;
  word-break: keep-all;

  & .space {
    width: 100%;
    height: 1px;
    background-color: transparent;
    margin-top: 20px;
  }

  em {
    font-weight: 700;
    font-style: normal;
  }

  a {
    color: var(--main-blue);
    font-weight: 500;
  }

  i {
    font-size: 30px;
    font-style: normal;
  }
`;
