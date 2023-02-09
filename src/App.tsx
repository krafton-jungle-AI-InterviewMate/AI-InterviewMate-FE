import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import styled from "@emotion/styled";

function App() {
  return (
    <Wrapper>
      <h1>
        <p>InterviewMate</p>
        <p>인터뷰메이트</p>
      </h1>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Wrapper>
  );
}

// TODO: common layout
const Wrapper = styled.div`
  max-width: 1440px;
  min-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

export default App;
