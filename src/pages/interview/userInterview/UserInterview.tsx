import { OpenVidu } from "openvidu-browser";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { interviewDataAtom, roomPeopleNowAtom } from "store/interview/atom";
import styled from "@emotion/styled";
import { StyledBtn } from "styles/StyledBtn";
import { useNavigate } from "react-router";
import UserInterviewReady from "components/interview/userInterview/UserInterviewReady";

const UserInterview = () => {
  const [OV, setOV] = useState<any>(null);

  const userInterviewData = useRecoilValue(interviewDataAtom);
  const setRoomPeopleNow = useSetRecoilState(roomPeopleNowAtom);
  const navigate = useNavigate();

  const [myUserName, setMyUserName] = useState<string | undefined>(userInterviewData?.nickname);
  const [session, setSession] = useState<any>(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState<Array<any>>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [start, setStart] = useState(false);

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
    navigate("/lobby");
  };

  useEffect(() => {
    joinSession();
  }, []);

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const handleClickLeave = () => {
    setIsOpen(true);
  };

  const handleClickStart = () => {
    if (ready) {
      setStart(true);
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
      {start ? (
        <div></div>
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
          leaveSession={leaveSession}
        />
      )}
    </>
  );
};

export default UserInterview;
