import { styled } from "@mui/material/styles";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { GrClose as CloseIcon } from "react-icons/gr";

import { replaceKeywordTags } from "./util";

import emotionStyled from "@emotion/styled";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiPaper-root": {
//     width: "600px",
//     height: "400px",
//   },
//   "& .MuiDialogContent-root": {
//     display: "flex",
//     flexFlow: "colum nowrap",
//     justifyContents: "center",
//     alignItems: "center",
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: "var(--font-gray)",

//     "& span": {
//       color: "var(--push-gray)",
//     },
//   },
//   "& *": {
//     fontFamily: "\"Archivo\", \"Spoqa Han Sans Neo\", sans-serif;",
//   },
//   "& path": {
//     stroke: "var(--font-gray)",
//   },
//   "& h2": {
//     color: "var(--font-gray)",
//     width: "80%",
//   },
// }));

type ScriptDialogProps = {
  questionTitle: string;
  script: string;
  isOpen: boolean;
  handleClose: () => void;
}

const ScriptDialog = (props: ScriptDialogProps) => {
  const {
    questionTitle,
    script,
    isOpen,
    handleClose,
  } = props;

  return (
    <Modal
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <StyledScriptWrap>
        <Typography
          gutterBottom
          dangerouslySetInnerHTML={{
            __html: replaceKeywordTags({
              script,
              tag: "strong",
            })
            || "<span className=\"placeholder\">작성된 내용이 없습니다.</span>",
          }}
        />
      </StyledScriptWrap>
    </Modal>
  );
};

export default ScriptDialog;

const StyledScriptWrap = emotionStyled.div`
  margin: 0 auto;

  & .MuiTypography-root strong {
    display: inline;
    box-shadow: inset 0 -10px 0 #a0ec2e90;
  }
`;
