import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { GrClose as CloseIcon } from "react-icons/gr";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "600px",
    height: "400px",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    textAlign: "center",

    "& .placeholder": {
      color: "var(--push-gray)",
    },
  },
  "& *": {
    color: "var(--font-gray)",
    fontFamily: "\"Archivo\", \"Spoqa Han Sans Neo\", sans-serif;",
  },
  "& path": {
    stroke: "var(--font-gray)",
  },
  "& h2": {
    width: "80%",
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

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
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {questionTitle}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          {script || <span className="placeholder">작성된 내용이 없습니다.</span>}
        </Typography>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default ScriptDialog;
