import { Outlet } from "react-router-dom";
import { NavInterview } from "./temp";

const InterviewLayout = () => {
  return (
    <>
      <NavInterview />
      <Outlet />
    </>
  );
};

export default InterviewLayout;
