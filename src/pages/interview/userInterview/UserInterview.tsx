import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { OpenVidu } from "openvidu-browser";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  hostAtom,
  interviewCommentAtom,
  interviewDataAtom,
  isInterviewerAtom,
  isInterviewStartAtom,
  roomPeopleNowAtom,
} from "store/interview/atom";
import { memberAtom } from "store/auth/atom";
import UserInterviewReady from "components/interview/userInterview/UserInterviewReady";
import UserInterviewStart from "components/interview/userInterview/UserInterviewStart";
import { useDeleteInterviewRooms, usePutInterviewRooms } from "hooks/queries/interview";

const UserInterview = () => {
  const userInterviewData = useRecoilValue(interviewDataAtom);
  const { nickname } = useRecoilValue(memberAtom);
  const setRoomPeopleNow = useSetRecoilState(roomPeopleNowAtom);
  const [isInterviewStart, setIsInterviewStart] = useRecoilState(isInterviewStartAtom);
  const isInterviewer = useRecoilValue(isInterviewerAtom);
  const [host, setHost] = useRecoilState(hostAtom);
  const setComment = useSetRecoilState(interviewCommentAtom);

  const navigate = useNavigate();

  const [OV, setOV] = useState<any>(null);
  const [myUserName, setMyUserName] = useState<string | undefined>(nickname);
  const [session, setSession] = useState<any>(undefined);
  const [publisher, setPublisher] = useState<any>(undefined);
  const [subscribers, setSubscribers] = useState<Array<any>>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: putInterviewRoomsMutate } = usePutInterviewRooms();
  const { mutate: deleteInterviewRoomsMutate } = useDeleteInterviewRooms();

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
    setSubscribers(curr => curr.filter(sub => sub !== streamManager));
  };

  const joinSession = async () => {
    const newOV = new OpenVidu();
    newOV.enableProdMode();

    setOV(newOV);
    const newSession = newOV.initSession();
    setSession(newSession);
  };

  useEffect(() => {
    if (!session) {
      return;
    }

    session.on("streamCreated", event => {
      const newSubscriber = session.subscribe(event.stream, undefined);
      setSubscribers(curr => [...curr, newSubscriber]);
    });

    session.on("streamDestroyed", event => {
      deleteSubscriber(event.stream.streamManager);
    });

    session.on("exception", exception => {
      console.warn(exception);
    });

    session.on("signal:readyOut", event => {
      console.log(event.type);
      if (event.data === "면접자") {
        navigate("/lobby");
        leaveSession();
      }
    });

    session.on("signal:interviewOut", event => {
      console.log(event.type);
      console.log(event.data);
      if (event.data === "면접자") {
        // 면접자가 나갔을 때 면접관들 모두 로비로
        console.log("면접자가 나갔을 때 면접관들 모두 로비로");
        setIsInterviewStart(false);
        navigate("/lobby");
        leaveSession();
      }
      if (event.data === "면접관" && subscribers.length === 0 && !isInterviewer) {
        // 면접관이 나갔을 때 다른 면접관이 남아있지 않고 본인이 면접자일 때
        console.log("면접관이 나갔을 때 다른 면접관이 남아있지 않고 본인이 면접자일 때");
        setIsInterviewStart(false);
        navigate("/interview/end");
        leaveSession();
      }
    });

    session.on("signal:interviewStart", event => {
      console.log(event.type);
      setIsInterviewStart(event.data);
    });

    session.on("signal:setHost", event => {
      console.log(event.type);
      setHost(event.data);
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

        setPublisher(publisher);
      })
      .catch(error => {
        console.log("There was an error connecting to the session:", error.code, error.message);
      });
  }, [session]);

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    setOV(null);
    setSession(undefined);
    setSubscribers([]);
    setMyUserName("");
    setPublisher(undefined);
  };

  useEffect(() => {
    setIsInterviewStart(false);
    setComment("");
    joinSession();
  }, []);

  const handleClickModalClose = () => {
    // 모달창 닫기
    setIsOpen(false);
  };

  const handleClickModalRoomLeave = () => {
    // 모달창 열기
    setIsOpen(true);
  };

  const handleClickInterviewOut = () => {
    // 인터뷰 도중 나감
    session
      .signal({
        data: host === publisher.stream.connection.connectionId ? "면접자" : "면접관",
        to: subscribers,
        type: "interviewOut",
      })
      .catch(error => {
        console.error(error);
      });
    deleteInterviewRoomsMutate(userInterviewData!.roomIdx, {
      onSuccess: () => {
        console.log("면접방을 나갔습니다.");
        if (isInterviewer) {
          navigate("/lobby");
        }
        if (!isInterviewer) {
          navigate("/interview/end");
        }
        leaveSession();
        setIsInterviewStart(false);
      },
      onError(error) {
        alert(error);
      },
    });
  };

  const handleClickReadyOut = () => {
    // 대기방에서 나감
    session
      .signal({
        data: host === publisher.stream.connection.connectionId ? "면접자" : "면접관",
        to: subscribers,
        type: "readyOut",
      })
      .catch(error => {
        console.error(error);
      });
    deleteInterviewRoomsMutate(userInterviewData!.roomIdx, {
      onSuccess: () => {
        console.log("면접방을 나갔습니다.");
        leaveSession();
        navigate("/lobby");
      },
      onError(error) {
        alert(error);
      },
    });
  };

  const handleClickStart = async () => {
    // 면접 시작
    if (ready) {
      try {
        session
          .signal({
            data: true,
            to: subscribers,
            type: "interviewStart",
          })
          .then(() => {
            console.log("면접을 시작합니다.");
          })
          .catch(error => {
            console.error(error);
          });
        putInterviewRoomsMutate(userInterviewData!.roomIdx, {
          onSuccess: () => {
            setIsInterviewStart(true);
          },
          onError(error) {
            alert(error);
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const interviewEnd = () => {
    // 면접 정상 종료
    if (!userInterviewData) {
      return;
    }
    setIsInterviewStart(false);
    leaveSession();
    console.log("면접을 정상적으로 종료합니다.");
    navigate("/interview/end");
  };

  useEffect(() => {
    console.log(subscribers);
    setRoomPeopleNow(subscribers.length);
    if (subscribers.length) {
      setReady(true);
    } else {
      setReady(false);
    }
    if (!isInterviewer && session && publisher) {
      session
        .signal({
          data: publisher.stream.connection.connectionId,
          to: subscribers,
          type: "setHost",
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [subscribers]);

  useEffect(() => {
    if (publisher && !isInterviewer) {
      setHost(publisher.stream.connection.connectionId);
    }
  }, [publisher]);

  return (
    <>
      {isInterviewStart ? (
        <UserInterviewStart
          session={session}
          publisher={publisher}
          subscribers={subscribers}
          isOpen={isOpen}
          handleClickModalClose={handleClickModalClose}
          handleClickModalRoomLeave={handleClickModalRoomLeave}
          handleClickInterviewOut={handleClickInterviewOut}
          interviewEnd={interviewEnd}
        />
      ) : (
        <UserInterviewReady
          session={session}
          publisher={publisher}
          subscribers={subscribers}
          ready={ready}
          isOpen={isOpen}
          handleClickModalRoomLeave={handleClickModalRoomLeave}
          handleClickStart={handleClickStart}
          handleClickModalClose={handleClickModalClose}
          handleClickReadyOut={handleClickReadyOut}
        />
      )}
    </>
  );
};

export default UserInterview;
