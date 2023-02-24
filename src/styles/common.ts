import { css } from "@emotion/react";

export const commonButtonStyle = css`
width: 200px;
height: 48px;
border-radius: var(--button-border-radius);
transition: all 200ms;
`;

export const a11yHidden = css`
  overflow: hidden;
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: polygon(0 0, 0 0, 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  white-space: nowrap;
`;
