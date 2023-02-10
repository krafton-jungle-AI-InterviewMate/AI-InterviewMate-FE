import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { PagesName } from "constants/pages";
import { getBreadcrumbs } from "lib/pages";
import { breadcrumbsStyleOverride } from "./styles";

const Breadcrumbs = () => {
  const {
    pathname,
  } = useLocation();

  const breadcrumbs = useMemo(() => {
    return getBreadcrumbs(pathname);
  }, [ pathname ]);

  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      sx={breadcrumbsStyleOverride}>
      {breadcrumbs.map((crumb, idx) =>
        <Link to={crumb} key={idx}>
          {PagesName[crumb]}
        </Link>,
      )}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
