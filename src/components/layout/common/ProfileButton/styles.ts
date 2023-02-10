import { SxProps } from "@mui/material";

export const popoverStyleOverride: SxProps = {
  "& .MuiPaper-root": {
    width: "174px",
    height: "116px",
    borderRadius: "5px",
    border: "1px solid var(--main-gray)",
    boxShadow: "var(--box-shadow)",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-evenly",
    alignContent: "center",
    textAlign: "center",
    fontSize: "14px",
  },
  "& button.logout": {
    background: "none",
    padding: 0,
    outline: "none",
    border: "none",
    fontWeight: 400,

    "&:hover": {
      color: "var(--light-blue)",
    },
  },
  "& .mypageLink": {
    fontWeight: 400,

    "&:hover": {
      color: "var(--light-blue)",
    },
  },
};
