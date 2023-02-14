import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

  return (
    <TableContainer sx={tableContainerStyleOverride} component={Paper}>
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
                <button type="button" onClick={() => console.log("TODO: 스크립트 모달", script.script)}>
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
