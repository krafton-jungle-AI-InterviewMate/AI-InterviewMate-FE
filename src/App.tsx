import { Routes, Route } from "react-router-dom";
import { PagesPath } from "constants/pages";

import { SimpleLayout, BreadcrumbsLayout, InterviewLayout } from "components/layout";
import { InterviewAi, InterviewReady, InterviewEnd } from "pages/interview";
import Home from "pages/Home";
import Mypage from "pages/mypage/Mypage";
import Result from "pages/mypage/Result";
import ResultDetails from "pages/mypage/ResultDetails";
import Lobby from "pages/Lobby";
import NotFound from "pages/NotFound";

import styled from "@emotion/styled";

function App() {
  return (
    <StyledWrapper>
      <Routes>
        {/* NavSimple */}
        <Route element={<SimpleLayout />}>
          <Route path={PagesPath.INDEX} element={<Home />} />
          <Route path={PagesPath.LOBBY} element={<Lobby />} />
        </Route>

        {/* NavWithBreadcrumbs */}
        <Route element={<BreadcrumbsLayout />}>
          <Route path={PagesPath.MYPAGE} element={<Mypage />} />
          <Route path={PagesPath.RESULT} element={<Result />} />
          <Route path={PagesPath.RESULT_DETAILS} element={<ResultDetails />} />
          <Route
            path={PagesPath.INTERVIEW_END}
            element={<InterviewEnd isAiInterview={true} isInterviewer={true} />}
          />
          {/* TODO: 면접 진행 페이지 외에 새로 추가하시는 페이지는 모두 이 부분에 추가해주세요. */}
        </Route>

        {/* NavInterview */}
        <Route element={<InterviewLayout />}>
          <Route path={PagesPath.INTERVIEW_READY} element={<InterviewReady />} />
        </Route>

        {/* Pages Without Nav */}
        <Route path={PagesPath.INTERVIEW_AI} element={<InterviewAi />} />

        <Route element={<SimpleLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
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
  padding-bottom: 68px;
  text-align: center;
`;

export default App;
