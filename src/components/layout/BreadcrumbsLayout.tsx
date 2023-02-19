import { Outlet } from "react-router-dom";
import { NavWithBreadcrumbs } from "./nav";


const BreadcrumbsLayout = () => {
  return (
    <>
      <NavWithBreadcrumbs />
      <Outlet />
    </>
  );
};

export default BreadcrumbsLayout;
