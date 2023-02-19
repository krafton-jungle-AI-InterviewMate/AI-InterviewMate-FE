import { Outlet } from "react-router-dom";
import NavSimple from "components/layout/nav/NavSimple";


const SimpleLayout = () => {
  return (
    <>
      <NavSimple />
      <Outlet />
    </>
  );
};

export default SimpleLayout;
