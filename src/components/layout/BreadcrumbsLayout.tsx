import { Outlet } from "react-router-dom";
import NavWithBreadcrumbs from "./nav/NavWithBreadcrumbs";


const BreadcrumbsLayout = () => {
  return (
    <>
      <NavWithBreadcrumbs />
      <Outlet />
    </>
  );
};

export default BreadcrumbsLayout;
