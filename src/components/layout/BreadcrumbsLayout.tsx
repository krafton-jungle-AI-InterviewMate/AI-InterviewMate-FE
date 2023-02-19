import { Outlet } from "react-router-dom";
import { NavWithBreadcrumbs } from "./temp";


const BreadcrumbsLayout = () => {
  return (
    <>
      <NavWithBreadcrumbs />
      <Outlet />
    </>
  );
};

export default BreadcrumbsLayout;
