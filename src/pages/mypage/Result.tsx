import InterviewResult from "components/interview/InterviewResult";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useGetRatingHistory } from "hooks/queries/mypage";
import { useEffect, useState } from "react";
import { RatingHistory } from "api/mypage/types";
import Loading from "pages/Loading";
import ServerError from "pages/ServerError";

const StyledResult = styled.div`
  margin-top: 120px;
`;

function Result() {
  const [historys, setHistorys] = useState<RatingHistory[]>([]);
  const { data, isSuccess, isLoading, isError } = useGetRatingHistory();

  useEffect(() => {
    if (!isLoading && data) {
      setHistorys(data.data.data);
    }
  }, [isLoading]);
  return (
    <StyledResult>
      {isLoading ? (
        <Loading margin="120px 0 0" />
      ) : isError ? (
        <ServerError />
      ) : (
        historys.map(history => (
          <Link key={history.roomIdx} to={`/mypage/result/${history.roomIdx}`}>
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
