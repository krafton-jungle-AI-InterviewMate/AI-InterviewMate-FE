import { Outlet } from "react-router-dom";
import NavWithBreadcrumbs from "components/layout/nav/NavWithBreadcrumbs";


const BreadcrumbsLayout = () => {
  return (
    <>
      <NavWithBreadcrumbs />
      <Outlet />
    </>
  );
};

export default BreadcrumbsLayout;
