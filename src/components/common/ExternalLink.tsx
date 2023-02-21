import { AnchorHTMLAttributes } from "react";

const ExternalLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {props.children}
    </a>
  );
};

export default ExternalLink;
