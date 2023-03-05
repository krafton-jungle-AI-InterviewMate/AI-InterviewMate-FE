import OpenViduVideoComponent from "./OvVideo";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { hostAtom, isInterviewStartAtom } from "store/interview/atom";

interface UserVideoComponentProps {
  streamManager: any;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
}

const UserVideoComponent = (props: UserVideoComponentProps) => {
  const { streamManager, videoRef } = props;
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
          <OpenViduVideoComponent streamManager={streamManager} videoRef={videoRef} />
          {!isInterviewStart && (
            <p>
              <span className="interviewer">{isHost ? "면접자" : "면접관"}</span>
              <span className="nickname">{streamManager.stream.connection.data.split('"')[3]}</span>
            </p>
          )}
        </div>
      ) : null}
    </StyledUserVideoComponent>
  );
};

interface StyledUserVideoComponentProps {
  isHost: boolean;
  isInterviewStart: boolean;
}

const StyledUserVideoComponent = styled.div<StyledUserVideoComponentProps>`
  .streamcomponent {
    position: relative;
    display: flex;
    flex-direction: ${props => (props.isHost ? "column" : "row")};
    p {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 0 0;
      width: ${props => (props.isHost ? "1000px" : "333px")};
      span {
        display: block;
      }
      .interviewer {
        padding: 5px 20px;
        border-radius: 5px;
        font-size: 1.4rem;
        font-weight: 400;
        margin-right: 12px;
        color: var(--main-white);
        background-color: ${props => (props.isHost ? "var(--main-blue)" : "var(--push-gray)")};
        color: ${props => (props.isHost ? "var(--main-white)" : "var(--push-black)")};
      }
      .nickname {
        padding: 5px 20px;
        border-radius: 5px;
        font-size: 1.4rem;
        font-weight: 400;
        margin-right: 12px;
        background-color: var(--main-white);
        color: var(--main-black);
      }
    }
  }
`;

export default UserVideoComponent;
