import { useSearchParams } from "react-router-dom";
import { useGetRatingDetail } from "hooks/queries/mypage";
import { RoomTypes } from "api/mypage/types";

import Loading from "components/common/Loading";
import ResultDetailsLayout from "components/layout/result/ResultDetailsLayout";
import ResultVideo from "components/mypage/resultDetails/ResultVideo";

import styled from "@emotion/styled";

const mock_video_url = "https://bucket1182644-staging.s3.ap-northeast-2.amazonaws.com/interviewer/Seungmin.mp4";

const ResultDetails = () => {
  const [ searchParams ] = useSearchParams();

  const {
    data,
    isFetching,
    isSuccess,
  } = useGetRatingDetail(
    Number(searchParams.get("room")),
    searchParams.get("type") as RoomTypes,
  );

  if (isFetching) {
    return <Loading margin="0" />;
  }

  return isSuccess && data ? (
    <ResultDetailsLayout roomType={searchParams.get("type") as RoomTypes} data={data.data}>
      <StyledVideoSection>
        <ResultVideo videoUrl={mock_video_url} />
        <div>타임라인 컴포넌트</div>
      </StyledVideoSection>
    </ResultDetailsLayout>
  ) : (
    <div>
      <p>데이터를 불러오는 중 에러가 발생했습니다.</p>
    </div>
  );
};

export default ResultDetails;

const StyledVideoSection = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
`;
