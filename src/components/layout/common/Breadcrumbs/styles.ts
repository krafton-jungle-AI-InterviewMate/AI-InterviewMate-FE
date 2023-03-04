import { SxProps } from "@mui/material";
import styled from "@emotion/styled";

export const breadcrumbsStyleOverride: SxProps = {
  marginLeft: "20px",
  fontFamily: "\"Archivo\", \"Spoqa Han Sans Neo\", sans-serif",
  fontWeight: 400,
  fontSize: "1.8rem",
};

export const StyledPlainCrumb = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 36px;
  color: var(--main-black);
`;
