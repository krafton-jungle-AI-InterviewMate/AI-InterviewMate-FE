import { useEffect } from "react";
import { useCats } from "hooks/queries/example";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { tableContainerStyleOverride } from "./styles";

const ResultTable = () => {
  const {
    data,
    isSuccess,
  } = useCats({});

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [ isSuccess ]);

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
            <TableCell align="center" colSpan={2}>87/100</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>자세 점수</TableCell>
            <TableCell align="center" colSpan={2}>90/100</TableCell>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={3}>답변 점수</TableCell>
            <TableCell align="center">Q1. HTTP 프로토콜에 대해 설명해주세요.</TableCell>
            <TableCell align="center">
              <button type="button" onClick={() => console.log("TODO: 스크립트 모달")}>
                54/100
              </button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Q2. HTTP와 HTTPS의 차이점은 무엇인가요?</TableCell>
            <TableCell align="center">
              <button type="button" onClick={() => console.log("TODO: 스크립트 모달")}>
                62/100
              </button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Q3. TCP와 UDP의 차이를 설명해주세요.</TableCell>
            <TableCell align="center">
              <button type="button" onClick={() => console.log("TODO: 스크립트 모달")}>
                78/100
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
