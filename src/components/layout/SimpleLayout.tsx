import { Outlet } from "react-router-dom";
import NavSimple from "./nav/NavSimple";


const SimpleLayout = () => {
  return (
    <>
      <NavSimple />
      <Outlet />
    </>
  );
};

export default SimpleLayout;
