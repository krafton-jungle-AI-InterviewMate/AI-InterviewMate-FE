import { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ScriptDialog from "./ScriptDialog";

import { tableContainerStyleOverride } from "./styles";
import { GetRatingDetailResponse } from "api/mypage/types";

type ResultTableProps = {
  data: GetRatingDetailResponse;
};

const ResultTable = (props: ResultTableProps) => {
  const {
    data: {
      data: {
        eyesRating,
        attitudeRating,
        scriptList,
      },
    },
  } = props;

  const [ dialogOpen, setDialogOpen ] = useState<null | number>(null);

  const handleClose = () => {
    setDialogOpen(null);
  };

  return (
    <TableContainer sx={tableContainerStyleOverride} component={Paper}>
      {typeof dialogOpen === "number" && (
        <ScriptDialog
          questionTitle={scriptList[Number(dialogOpen)].questionTitle}
          script={scriptList[Number(dialogOpen)].script}
          isOpen={typeof dialogOpen === "number"}
          handleClose={handleClose}
        />
      )}
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center">항목</TableCell>
            <TableCell align="center" colSpan={2}>
              점수
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>시선 점수</TableCell>
            <TableCell align="center" colSpan={2}>{eyesRating}/100</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>자세 점수</TableCell>
            <TableCell align="center" colSpan={2}>{attitudeRating}/100</TableCell>
          </TableRow>
          {scriptList.map((script, idx, self) =>
            <TableRow key={idx}>
              {!idx && <TableCell rowSpan={self.length}>답변 점수</TableCell>}
              <TableCell align="center">{`Q${idx + 1}. ${script.questionTitle}`}</TableCell>
              <TableCell align="center">
                <button type="button" onClick={() => setDialogOpen(idx)}>
                  {script.rating}/100
                </button>
              </TableCell>
            </TableRow>,
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
