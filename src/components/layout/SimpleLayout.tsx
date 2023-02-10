import { Outlet } from "react-router-dom";
import { NavSimple } from "components/layout/nav";


const SimpleLayout = () => {
  return (
    <>
      <NavSimple />
      <Outlet />
    </>
  );
};

export default SimpleLayout;
