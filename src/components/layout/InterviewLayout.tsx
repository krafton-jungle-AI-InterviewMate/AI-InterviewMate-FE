import { Outlet } from "react-router-dom";
import NavInterview from "components/layout/nav/NavInterview";


const InterviewLayout = () => {
  return (
    <>
      <NavInterview />
      <Outlet />
    </>
  );
};

export default InterviewLayout;
