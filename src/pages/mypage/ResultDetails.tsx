import { useSearchParams } from "react-router-dom";
import { useGetRatingDetail } from "hooks/queries/mypage";
import { RoomTypes } from "api/mypage/types";

import ResultDetailsLayout from "components/layout/result/ResultDetailsLayout";
import Loading from "components/common/Loading";

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
      <p>TODO:</p>
    </ResultDetailsLayout>
  ) : (
    <div>
      <p>데이터를 불러오는 중 에러가 발생했습니다.</p>
    </div>
  );
};

export default ResultDetails;
