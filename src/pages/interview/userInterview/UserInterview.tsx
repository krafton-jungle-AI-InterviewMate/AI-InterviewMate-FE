import { OpenVidu } from "openvidu-browser";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  hostAtom,
  interviewCommentAtom,
  interviewDataAtom,
  isInterviewerAtom,
  isInterviewStartAtom,
  motionSnapshotAtom,
  roomPeopleNowAtom,
  timelineRecordAtom,
} from "store/interview/atom";
import { useNavigate } from "react-router";
import UserInterviewReady from "components/interview/userInterview/UserInterviewReady";
import { useDeleteInterviewRooms, usePutInterviewRooms } from "hooks/queries/interview";
import { memberAtom } from "store/auth/atom";
import UserInterviewStart from "./../../../components/interview/userInterview/UserInterviewStart";
import useInitializeInterviewState from "hooks/useInitializeInterviewState";
import useFaceLandmarksDetection from "hooks/useFaceLandmarksDetection";
import { toast } from "react-toastify";
import * as Styled from "pages/interview/InterviewReady/style";
import { usePostRatingViewee } from "hooks/queries/mypage";

const UserInterview = () => {
  const userInterviewData = useRecoilValue(interviewDataAtom);
  const { nickname } = useRecoilValue(memberAtom);
  const setRoomPeopleNow = useSetRecoilState(roomPeopleNowAtom);
  const [isInterviewStart, setIsInterviewStart] = useRecoilState(isInterviewStartAtom);
  const isInterviewer = useRecoilValue(isInterviewerAtom);
  const [host, setHost] = useRecoilState(hostAtom);
  const setComment = useSetRecoilState(interviewCommentAtom);
  const setMotionSnapshot = useSetRecoilState(motionSnapshotAtom);
  const {
    timeline: { eyes, attitude, questionModeStart },
  } = useRecoilValue(timelineRecordAtom);

  const navigate = useNavigate();

  const [OV, setOV] = useState<any>(null);
  const [myUserName, setMyUserName] = useState<string | undefined>(nickname);
  const [session, setSession] = useState<any>(undefined);
  const [publisher, setPublisher] = useState<any>(undefined);
  const [subscribers, setSubscribers] = useState<Array<any>>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [video, setVideo] = useState<null | HTMLVideoElement>(null);

  const { mutate: putInterviewRoomsMutate } = usePutInterviewRooms();
  const { mutate: deleteInterviewRoomsMutate } = useDeleteInterviewRooms();
  const { mutate: postRatingVieweeMutate, isLoading } = usePostRatingViewee();

  const { initializeInterviewState } = useInitializeInterviewState();
  const { isVideoReady, setNewDetector, setIsDetectionOn, updateFace, detector } =
    useFaceLandmarksDetection({
      video,
      isOneOff: true,
    });

  useEffect(() => {
    if (isVideoReady) {
      (async () => {
        await setNewDetector();
      })();
    }
  }, [isVideoReady]);

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
      console.log(subscribers.length);
      if (event.data === "면접자") {
        setIsInterviewStart(false);
        leaveSession();
        navigate("/lobby");
      } else if (
        event.data === "면접관" &&
        subscribers.length === 0 &&
        host === publisher.stream.connection.connectionId
      ) {
        setIsInterviewStart(false);
        leaveSession();
        navigate("/lobby");
      }
    });

    session.on("signal:interviewStart", event => {
      console.log(event.type);
      setIsInterviewStart(event.data);
    });

    session.on("signal:setHost", event => {
      console.log(event.type);
      if (isInterviewer) {
        setHost(event.data);
      }
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
        setIsInterviewStart(false);
        leaveSession();
        navigate("/lobby");
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
        setComment("");
        leaveSession();
        navigate("/lobby");
      },
      onError(error) {
        alert(error);
      },
    });
  };

  const handleClickStart = async () => {
    console.log(detector);
    // 면접 시작
    if (ready && detector) {
      try {
        if (!detector) {
          throw new Error("detector is not ready");
        }

        initializeInterviewState();
        setIsDetectionOn(true);

        const newFace = await updateFace(detector);

        if (newFace) {
          setIsDetectionOn(false);
          toast.clearWaitingQueue();
          setMotionSnapshot(newFace);
        } else {
          toast("화면에서 얼굴이 인식되지 않습니다", Styled.toastOptions);
        }

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

  const InterviewEnd = () => {
    // 면접 정상 종료
    if (host === publisher.stream.connection.connectionId) {
      putInterviewRoomsMutate(userInterviewData!.roomIdx, {
        onSuccess: () => {
          setIsInterviewStart(false);
          leaveSession();
          console.log("면접을 정상적으로 종료합니다.");
          navigate("/interview/end");
        },
        onError(error) {
          alert(error);
        },
      });
    } else {
      setIsInterviewStart(false);
      leaveSession();
      console.log("면접을 정상적으로 종료합니다.");
      navigate("/interview/end");
    }
  };

  useEffect(() => {
    console.log(subscribers);
    console.log(userInterviewData);
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
        .then(() => {
          console.log(host);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [subscribers]);

  useEffect(() => {
    if (publisher && !isInterviewer) {
      console.log(publisher);
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
          video={video}
          handleClickModalClose={handleClickModalClose}
          handleClickModalRoomLeave={handleClickModalRoomLeave}
          handleClickInterviewOut={handleClickInterviewOut}
          InterviewEnd={InterviewEnd}
          setVideo={setVideo}
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
          setVideo={setVideo}
        />
      )}
    </>
  );
};

export default UserInterview;
