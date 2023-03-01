import { OpenVidu } from "openvidu-browser";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  interviewDataAtom,
  isInterviewerAtom,
  isInterviewStartAtom,
  roomPeopleNowAtom,
} from "store/interview/atom";
import { useNavigate } from "react-router";
import UserInterviewReady from "components/interview/userInterview/UserInterviewReady";
import { usePutInterviewRooms } from "hooks/queries/interview";
import styled from "@emotion/styled";
import UserVideoComponent from "components/interview/userInterview/UserVideoComponent";
import Loading from "components/common/Loading";
import { StyledBtn } from "styles/StyledBtn";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import InterviewQuestionTab from "components/interview/userInterview/InterviewerQuestionTap";

const UserInterview = () => {
  const { mutate } = usePutInterviewRooms();

  const userInterviewData = useRecoilValue(interviewDataAtom);
  const setRoomPeopleNow = useSetRecoilState(roomPeopleNowAtom);
  const [isInterviewStart, setIsInterviewStart] = useRecoilState(isInterviewStartAtom);
  const isInterviewer = useRecoilValue(isInterviewerAtom);
  const navigate = useNavigate();

  const [OV, setOV] = useState<any>(null);
  const [myUserName, setMyUserName] = useState<string | undefined>(userInterviewData?.nickname);
  const [session, setSession] = useState<any>(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState<Array<any>>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  const onbeforeunload = event => {
    leaveSession();
  };

  const deleteSubscriber = (streamManager: any) => {
    const newSubscribers = [...subscribers];
    setSubscribers(newSubscribers.filter(v => v !== streamManager));
  };

  const joinSession = async () => {
    // --- 1) OpenVidu 객체 가져오기 ---
    const newOV = new OpenVidu();
    newOV.enableProdMode();

    // --- 2) 세션 초기화 ---
    setOV(newOV);
    const newSession = newOV.initSession();
    setSession(newSession);
  };

  useEffect(() => {
    // --- 3) 세션에서 이벤트가 발생할 때 수행할 작업 ---
    if (!session) {
      return;
    }
    // 스트림이 새로 수신될 때마다
    session.on("streamCreated", event => {
      const newSubscriber = session.subscribe(event.stream, undefined);
      setSubscribers(curr => [...curr, newSubscriber]);
    });

    // On every Stream destroyed...
    session.on("streamDestroyed", event => {
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    session.on("exception", exception => {
      console.warn(exception);
    });

    session.on("signal:start", event => {
      setIsInterviewStart(event.data);
    });
    session.on("signal:end", event => {
      setIsInterviewStart(event.data);
    });

    session
      .connect(userInterviewData?.connectionToken, { clientData: myUserName })
      .then(async () => {
        let publisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          // resolution: "272x204", // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
          mirror: false, // Whether to mirror your local video or not
        });

        // --- 6) Publish your stream ---
        session.publish(publisher);

        // Obtain the current video device in use
        const devices = await OV.getDevices();
        const videoDevices = devices.filter(device => device.kind === "videoinput");
        const currentVideoDeviceId = publisher.stream
          .getMediaStream()
          .getVideoTracks()[0]
          .getSettings().deviceId;
        const currentVideoDevice = videoDevices.find(
          device => device.deviceId === currentVideoDeviceId,
        );

        // Set the main video in the page to display our webcam and store our Publisher
        setPublisher(publisher);
      })
      .catch(error => {
        console.log("There was an error connecting to the session:", error.code, error.message);
      });
  }, [session]);

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    if (session) {
      session.disconnect();
    }

    // Empty all properties...
    setOV(null);
    setSession(undefined);
    setSubscribers([]);
    setMyUserName("");
    setPublisher(undefined);
  };

  useEffect(() => {
    setIsInterviewStart(false);
    joinSession();
  }, []);

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const handleClickLeave = () => {
    setIsOpen(true);
  };

  const handleClickEnd = () => {
    mutate(userInterviewData!.roomIdx, {
      onSuccess: () => {
        setIsInterviewStart(false);
        console.log(isInterviewStart);
      },
      onError(error) {
        alert(error);
      },
    });
    session
      .signal({
        data: false,
        to: subscribers,
        type: "end",
      })
      .then(() => {
        console.log("면접을 종료합니다.");
      })
      .catch(error => {
        console.error(error);
      });
    leaveSession();
    navigate("/lobby");
  };

  const handleClickStart = () => {
    if (ready) {
      mutate(userInterviewData!.roomIdx, {
        onSuccess: () => {
          setIsInterviewStart(true);
        },
        onError(error) {
          alert(error);
        },
      });
      session
        .signal({
          data: true,
          to: subscribers,
          type: "start",
        })
        .then(() => {
          console.log("면접을 시작합니다.");
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    console.log(subscribers);
    setRoomPeopleNow(subscribers.length);
    if (subscribers.length) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [subscribers]);

  return (
    <>
      {isInterviewStart ? (
        <StyledUserInterviewStart>
          {session ? (
            <>
              <div className="subscribersContents">
                <div className="subscribersVideo">
                  {subscribers.map((sub, i) => (
                    <div key={i}>
                      <UserVideoComponent streamManager={sub} isInterviewer={true} />
                    </div>
                  ))}
                </div>
                <div className="interviewActions">
                  <StyledBtn onClick={handleClickLeave} width="200px" height="48px" color="red">
                    면접 나가기
                  </StyledBtn>
                </div>
              </div>
              <div className="publisherContents">
                {publisher && (
                  <div className="publisherVideo">
                    <UserVideoComponent streamManager={publisher} isInterviewer={false} />
                    {isInterviewer && <InterviewQuestionTab />}
                  </div>
                )}
              </div>
              <Dialog
                open={isOpen}
                onClose={handleClickClose}
                PaperProps={{
                  style: {
                    padding: "50px 35px",
                    borderRadius: "10px",
                  },
                }}
              >
                <DialogTitle
                  fontSize={16}
                  fontWeight={400}
                  color={"var(--main-black)"}
                  marginBottom={3}
                  padding={0}
                  textAlign={"center"}
                >
                  현재 면접 방을 나가고
                  <br />
                  로비로 이동하시겠습니까?
                </DialogTitle>
                <DialogActions>
                  <StyledBtn onClick={handleClickEnd} width="200px" height="42px" color="orange">
                    네!
                  </StyledBtn>
                  <StyledBtn onClick={handleClickClose} width="200px" height="42px" color="red">
                    취소
                  </StyledBtn>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            <Loading margin="250px" />
          )}
        </StyledUserInterviewStart>
      ) : (
        <UserInterviewReady
          session={session}
          publisher={publisher}
          subscribers={subscribers}
          ready={ready}
          isOpen={isOpen}
          handleClickLeave={handleClickLeave}
          handleClickStart={handleClickStart}
          handleClickClose={handleClickClose}
          handleClickEnd={handleClickEnd}
        />
      )}
    </>
  );
};

const StyledUserInterviewStart = styled.div`
  overflow-x: hidden;
  .subscribersContents {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 200px;
    background-color: var(--main-gray);
    .subscribersVideo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 798px;
    }
  }
  .publisherContents {
    margin-top: 70px;
    .publisherVideo {
      display: flex;
      justify-content: center;
    }
  }
  .interviewActions {
    position: absolute;
    top: 30px;
    right: 150px;
  }
`;

export default UserInterview;
