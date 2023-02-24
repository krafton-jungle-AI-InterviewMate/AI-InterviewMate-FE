import { OpenVidu } from "openvidu-browser";
import { useState, useEffect } from "react";
import UserVideoComponent from "../../../components/interview/userInterview/UserVideoComponent";
import { useRecoilValue } from "recoil";
import { userInterviewDataAtom } from "store/interview/atom";
import { BASE_URL } from "constants/api";

// const APPLICATION_SERVER_URL = BASE_URL; // ! TODO: 우리 서버 URL로 바꿔야 함.
const APPLICATION_SERVER_URL = "https://denia-wwdt.shop"; // ! TODO: 우리 서버 URL로 바꿔야 함.

const UserInterview = () => {
  const [OV, setOV] = useState<any>(null);

  const userInterviewData = useRecoilValue(userInterviewDataAtom);

  const [mySessionId, setMySessionId] = useState(userInterviewData?.roomName);
  const [myUserName, setMyUserName] = useState(userInterviewData?.nickName);
  const [session, setSession] = useState<any>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
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

  const handleMainVideoStream = (stream: any) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
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
    console.log(newOV);
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
        setMainStreamManager(publisher);
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
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  useEffect(() => {
    joinSession();
    // ! 이 컴포넌트가 렌더링 되자마자
    // ! joinSession을 최초로 한번 실행해줘야 함.
  }, []);

  return (
    <div className="container">
      {session ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{mySessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
          </div>

          {mainStreamManager ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {publisher ? (
              <div
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div
                key={i}
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(sub)}
              >
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserInterview;
