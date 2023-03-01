import OpenViduVideoComponent from "./OvVideo";
import styled from "@emotion/styled";
import Loading from "components/common/Loading";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isInterviewStartAtom } from "store/interview/atom";

interface UserVideoComponentProps {
  streamManager: any;
  isInterviewer: boolean;
}

const UserVideoComponent = (props: UserVideoComponentProps) => {
  const { streamManager, isInterviewer } = props;
  const [isLoading, setIsLoading] = useState(true);
  const isInterviewStart = useRecoilValue(isInterviewStartAtom);

  useEffect(() => {
    if (streamManager) {
      setIsLoading(false);
    }
  }, [streamManager]);
  return (
    <StyledUserVideoComponent isInterviewer={isInterviewer} isInterviewStart={isInterviewStart}>
      {!isLoading ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager} isInterviewer={isInterviewer} />
          {!isInterviewStart && (
            <p>
              <span className="interviewer">{isInterviewer ? "면접관" : "면접자"}</span>
              <span className="nickname">{streamManager.stream.connection.data.split('"')[3]}</span>
            </p>
          )}
        </div>
      ) : (
        <Loading margin="0" />
      )}
    </StyledUserVideoComponent>
  );
};

interface StyledUserVideoComponentProps {
  isInterviewer: boolean;
  isInterviewStart: boolean;
}

const StyledUserVideoComponent = styled.div<StyledUserVideoComponentProps>`
  margin-bottom: ${props => (props.isInterviewStart ? 0 : "20px")};
  .streamcomponent {
    display: flex;
    flex-direction: ${props => (props.isInterviewer ? "row" : "column")};
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${props => (props.isInterviewer ? "0 0 0 50px" : "45px 0 0")};
    span {
      display: block;
    }
    .interviewer {
      width: 70px;
      height: 24px;
      border-radius: 5px;
      font-size: 12px;
      font-weight: 400;
      margin-right: 12px;
      color: var(--main-white);
      background-color: ${props => (props.isInterviewer ? "var(--push-gray)" : "var(--main-blue)")};
    }
    .nickname {
      font-size: 16px;
      font-weight: 500;
      color: var(--main-black);
    }
  }
`;

export default UserVideoComponent;
