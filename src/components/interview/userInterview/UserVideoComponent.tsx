import OpenViduVideoComponent from "./OvVideo";
import styled from "@emotion/styled";
import Loading from "components/common/Loading";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { hostAtom, isInterviewStartAtom } from "store/interview/atom";

interface UserVideoComponentProps {
  streamManager: any;
}

const UserVideoComponent = (props: UserVideoComponentProps) => {
  const { streamManager } = props;
  const [isLoading, setIsLoading] = useState(true);
  const host = useRecoilValue(hostAtom);
  const isInterviewStart = useRecoilValue(isInterviewStartAtom);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    if (streamManager) {
      setIsLoading(false);
      setIsHost(host === streamManager.stream.connection.connectionId);
    }
  }, [streamManager]);
  return (
    <StyledUserVideoComponent isHost={isHost} isInterviewStart={isInterviewStart}>
      {!isLoading ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager} />
          {!isInterviewStart && (
            <p>
              <span className="interviewer">{isHost ? "면접자" : "면접관"}</span>
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
  isHost: boolean;
  isInterviewStart: boolean;
}

const StyledUserVideoComponent = styled.div<StyledUserVideoComponentProps>`
  position: relative;
  .streamcomponent {
    display: flex;
    flex-direction: ${props => (props.isHost ? "column" : "row")};
  }
  p {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${props => (props.isHost ? "30px 0 0" : "0 0 0 50px")};
    span {
      display: block;
    }
    .interviewer {
      padding: 5px 20px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 400;
      margin-right: 12px;
      color: var(--main-white);
      background-color: ${props => (props.isHost ? "var(--main-blue)" : "var(--push-gray)")};
    }
    .nickname {
      font-size: 16px;
      font-weight: 500;
      color: var(--main-black);
    }
  }
`;

export default UserVideoComponent;
