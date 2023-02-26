import { OpenVidu } from "openvidu-browser";
import { useState, useEffect } from "react";
import UserVideoComponent from "../../../components/interview/userInterview/UserVideoComponent";
import { useRecoilValue } from "recoil";
import { InterviewDataAtom } from "store/interview/atom";
import styled from "@emotion/styled";
import Loading from "components/common/Loading";
import { StyledBtn } from "styles/StyledBtn";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router";

const UserInterview = () => {
  const [OV, setOV] = useState<any>(null);

  const userInterviewData = useRecoilValue(InterviewDataAtom);
  const navigate = useNavigate();

  const [mySessionId, setMySessionId] = useState<string | undefined>(userInterviewData?.roomName);
  const [myUserName, setMyUserName] = useState<string | undefined>(userInterviewData?.nickName);
  const [session, setSession] = useState<any>(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState<Array<any>>([]);

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
    const newSubscribers = subscribers;
    let index = newSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setSubscribers(newSubscribers);
    }
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
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      const newSubscriber = session.subscribe(event.stream, undefined);

      // Update the state with the new subscribers
      setSubscribers([...subscribers, newSubscriber]);
    });

    // On every Stream destroyed...
    session.on("streamDestroyed", event => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    session.on("exception", exception => {
      console.warn(exception);
    });

    // --- 4) Connect to the session with a valid user token ---

    // Get a token from the OpenVidu deployment

    // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
    session
      .connect(userInterviewData?.connectionToken, { clientData: myUserName })
      .then(async () => {
        // --- 5) Get your own camera stream ---

        // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
        // element: we will manage it on our own) and with the desired properties
        let publisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          resolution: "640x480", // The resolution of your video
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
    setMySessionId("");
    setMyUserName("");
    setPublisher(undefined);
    navigate("/lobby");
  };

  useEffect(() => {
    joinSession();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const handleClickLeave = () => {
    setIsOpen(true);
  };

  return (
    <StyledUserInterview>
      {session ? (
        <>
          <div className="video_contents">
            {publisher ? (
              <div>
                <UserVideoComponent streamManager={publisher} />
                {userInterviewData?.nickName}
              </div>
            ) : (
              <div className="publisher_skeleton"></div>
            )}
            <div>
              {subscribers.map((sub, i) => (
                <div key={i}>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
          </div>
          <div className="interview_actions">
            <StyledBtn onClick={handleClickLeave} width="200px" height="48px" color="red">
              나가기
            </StyledBtn>
            <StyledBtn width="200px" height="48px" color="orange">
              READY
            </StyledBtn>
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
              <StyledBtn onClick={leaveSession} width="200px" height="42px" color="orange">
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
    </StyledUserInterview>
  );
};

const StyledUserInterview = styled.div`
  width: 1440px;
  min-width: 1440px;
  .video_contents {
    display: flex;
    justify-content: space-between;
    .publisher_skeleton {
      background-color: var(--main-gray);
    }
  }
  .interview_actions {
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 28px;
    }
  }
`;

export default UserInterview;
