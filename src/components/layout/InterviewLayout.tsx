import { Outlet } from "react-router-dom";
import { NavInterview } from "components/layout/nav";


const InterviewLayout = () => {
  return (
    <>
      <NavInterview />
      <Outlet />
    </>
  );
};

export default InterviewLayout;
