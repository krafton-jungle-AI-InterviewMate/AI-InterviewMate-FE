import { AnchorHTMLAttributes } from "react";

const ExternalLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { className, href, children } = props;

  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default ExternalLink;
