import { SxProps } from "@mui/material";

const commonFontStyle: SxProps = {
  color: "var(--main-black)",
  fontFamily: "\"Archivo\", \"Spoqa Han Sans Neo\", sans-serif",
  fontSize: "16px",
};

export const tableContainerStyleOverride: SxProps = {
  borderRadius: "var(--button-border-radius)",
  boxShadow: "var(--box-shadow)",
  padding: "32px",
  boxSizing: "border-box",
  border: "1px solid var(--main-gray)",

  "& th": {
    ...commonFontStyle,
  },
  "& td": {
    borderRight: "1px solid rgb(224, 224, 224)",
    ...commonFontStyle,
  },
  "& tr td:last-child": {
    borderRight: "none",
  },
  "& button": {
    ...commonFontStyle,
    backgroundColor: "transparent",
    padding: "10px",
    border: 0,
    color: "var(--main-blue)",
  },
};
