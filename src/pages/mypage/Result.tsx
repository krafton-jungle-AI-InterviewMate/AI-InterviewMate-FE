import InterviewResult from "components/interview/InterviewResult";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useGetRatingHistory } from "hooks/queries/mypage";
import { useEffect, useState } from "react";
import { RatingHistory } from "api/mypage/types";
import Loading from "components/common/Loading";
import ServerError from "components/common/ServerError";
import { PagesPath } from "constants/pages";

const StyledResult = styled.div`
  margin-top: 120px;
`;

function Result() {
  const [ historys, setHistorys ] = useState<RatingHistory[]>([]);
  const { data, isLoading, isError } = useGetRatingHistory();

  useEffect(() => {
    if (!isLoading && data) {
      setHistorys(data.data.data);
    }
  }, [ isLoading ]);
  return (
    <StyledResult>
      {isLoading ? (
        <Loading margin="120px 0 0" />
      ) : isError ? (
        <ServerError />
      ) : (
        historys.map(history => (
          <Link
            key={history.roomIdx}
            to={`${PagesPath.RESULT_DETAILS}?room=${history.roomIdx}&type=${history.roomType}`}
          >
            <InterviewResult
              roomName={history.roomName}
              createdAt={history.createdAt}
              roomType={history.roomType}
              roomTime={history.roomTime}
              roomQuestionNum={history.roomQuestionNum}
            />
          </Link>
        ))
      )}
    </StyledResult>
  );
}

export default Result;
