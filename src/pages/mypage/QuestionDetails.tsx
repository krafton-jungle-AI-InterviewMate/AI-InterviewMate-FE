import { useSearchParams } from "react-router-dom";
import { useQuestionDetails } from "hooks/queries/questionBoxes";

import Loading from "components/common/Loading";

import styled from "@emotion/styled";
import { useEffect } from "react";

const QuestionDetails = () => {
  const [ searchParams ] = useSearchParams();

  const {
    data,
    isSuccess,
    isFetching,
  } = useQuestionDetails(
    Number(searchParams.get("box")),
  );


  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [ data ]);

  if (isFetching) {
    return (
      <StyledWrapper>
        <Loading margin="0" />
      </StyledWrapper>
    );
  }

  // return (
  //   <StyledWrapper>
  //     {isSuccess && data ? (
  //       <>
  //         <StyledHeader>
  //           <div className="left-section">
  //             <div className="left-section__role-tag">
  //               <span>
  //                 {searchParams.get("type") as RoomTypes === "USER" ? "유저" : "AI"} 면접관
  //               </span>
  //             </div>
  //             <h2>
  //               {data.data.data.roomName}
  //             </h2>
  //           </div>
  //           <div className="right-section">
  //             <p className="right-section__time">
  //               {formatDate(data.data.data.createdAt)} 면접
  //             </p>
  //             <p className="right-section__option">
  //               질문 개수: {data.data.data.roomQuestionNum}개
  //             </p>
  //           </div>
  //         </StyledHeader>
  //         <ResultTable data={data.data} />
  //       </>
  //     ) : (
  //       <div>
  //         <p>데이터를 불러오는 중 에러가 발생했습니다.</p>
  //       </div>
  //     )}
  //   </StyledWrapper>
  // );

  return (
    <StyledWrapper>
    </StyledWrapper>
  );
};

export default QuestionDetails;

const StyledWrapper = styled.section`
  width: 900px;
  margin-top: 70px;
`;
