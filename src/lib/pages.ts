import { PagesName } from "constants/pages";

export const getBreadcrumbs = (pathname: string) => {
  const breadcrumbs: string[] = [];

  let beginIndex = 0;

  while (beginIndex !== -1) {
    const piece = pathname.slice(0, beginIndex);
    
    if (PagesName[piece]) {
      breadcrumbs.push(piece);
    }
    
    beginIndex = pathname.indexOf("/", beginIndex + 1);
  }

  if (PagesName[pathname]) {
    breadcrumbs.push(pathname);
  }

  return breadcrumbs;
};
