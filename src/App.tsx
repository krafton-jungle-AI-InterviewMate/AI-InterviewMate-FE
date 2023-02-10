import { Routes, Route } from "react-router-dom";
import { PagesPath } from "constants/pages";
import { NavInterview } from "components/layout/nav";
import Home from "pages/Home";
import Mypage from "pages/Mypage";
import InterviewReady from "pages/interview/InterviewReady";
import styled from "@emotion/styled";

function App() {
  return (
    <StyledWrapper>
      <NavInterview />

      <Routes>
        <Route path={PagesPath.INDEX} element={<Home />} />
        <Route path={PagesPath.MYPAGE} element={<Mypage />} />
        <Route path={PagesPath.INTERVIEW_READY} element={<InterviewReady />} />
      </Routes>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  max-width: 1440px;
  min-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

export default App;
