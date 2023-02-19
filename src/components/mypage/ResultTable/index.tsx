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

  const [ isDialogOpen, setIsDialogOpen ] = useState<boolean>(false);
  const [ questionIdx, setQuestionIdx ] = useState<number>(0);

  const handleOpen = (idx: number) => {
    setIsDialogOpen(true);
    setQuestionIdx(idx);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <TableContainer sx={tableContainerStyleOverride} component={Paper}>
      {isDialogOpen && (
        <ScriptDialog
          questionTitle={scriptList[questionIdx]?.questionTitle || ""}
          script={scriptList[questionIdx]?.script || ""}
          isOpen={isDialogOpen}
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
                <button type="button" onClick={() => handleOpen(idx)}>
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
