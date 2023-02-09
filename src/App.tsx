import { Routes, Route } from "react-router-dom";
import Nav from "components/layout/Nav";
import Home from "pages/Home";
import Mypage from "pages/Mypage";
import styled from "@emotion/styled";

function App() {
  return (
    <StyledWrapper>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage />} />
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
