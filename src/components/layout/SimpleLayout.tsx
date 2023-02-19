import { Outlet } from "react-router-dom";
import { NavSimple } from "./temp";


const SimpleLayout = () => {
  return (
    <>
      <NavSimple />
      <Outlet />
    </>
  );
};

export default SimpleLayout;
