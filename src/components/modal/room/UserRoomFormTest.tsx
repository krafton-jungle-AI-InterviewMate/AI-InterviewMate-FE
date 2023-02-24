import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import { useState, useEffect } from "react";
import UserVideoComponent from "./UserVideoComponent";
import { useRecoilState } from "recoil";
import { roomNameAtom, userNameAtom } from "store/interview/atom";

const APPLICATION_SERVER_URL = "http://localhost:5000/";

const UserRoomFormTest = () => {
  const [ userName, setUserName ] = useRecoilState(userNameAtom);
  const [ roomName, setRoomName ] = useRecoilState(roomNameAtom);
  console.log(userName);
  console.log(roomName);
  const [ OV, setOV ] = useState<any>(null);

  const [ mySessionId, setMySessionId ] = useState(roomName);
  const [ myUserName, setMyUserName ] = useState(userName);
  const [ session, setSession ] = useState<any>(undefined);
  const [ mainStreamManager, setMainStreamManager ] = useState(undefined);
  const [ publisher, setPublisher ] = useState(undefined);
  const [ subscribers, setSubscribers ] = useState<Array<any>>([]);

  useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  const onbeforeunload = event => {
    leaveSession();
  };

  // const handleChangeSessionId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log("romeName" + e.target.value);
  //   setMySessionId(e.target.value);
  // };

  // const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log("userName" + e.target.value);
  //   setMyUserName(e.target.value);
  // };

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
    // --- 1) Get an OpenVidu object ---
    // --- 1) OpenVidu 객체 가져오기 ---
    const newOV = new OpenVidu();
    newOV.enableProdMode();

    // --- 2) Init a session ---
    // --- 2) 세션 초기화 ---
    setOV(newOV);
    const newSession = newOV.initSession();
    setSession(newSession);
    const mySession = session;

    // --- 3) Specify the actions when events take place in the session ---
    // --- 3) 세션에서 이벤트가 발생할 때 수행할 작업 ---

    // On every new Stream received...
    // 스트림이 새로 수신될 때마다
    mySession.on("streamCreated", event => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      const newSubscriber = mySession.subscribe(event.stream, undefined);

      // Update the state with the new subscribers
      setSubscribers([ ...subscribers, newSubscriber ]);
    });

    // On every Stream destroyed...
    mySession.on("streamDestroyed", event => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on("exception", exception => {
      console.warn(exception);
    });

    // --- 4) Connect to the session with a valid user token ---

    // Get a token from the OpenVidu deployment
    getToken().then(token => {
      // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession
        .connect(token, { clientData: myUserName })
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

          mySession.publish(publisher);

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
          // this.setState({
          //   currentVideoDevice: currentVideoDevice,
          //   mainStreamManager: publisher,
          //   publisher: publisher,
          // });
        })
        .catch(error => {
          console.log("There was an error connecting to the session:", error.code, error.message);
        });
    });
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = session;

    if (mySession) {
      mySession.disconnect();
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

  // const mySessionId = this.state.mySessionId;
  // const myUserName = this.state.myUserName;

  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async sessionId => {
    const response: any = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return response.data; // The sessionId
  };

  const createToken = async sessionId => {
    const response: any = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return response.data; // The token
  };

  useEffect(() => {
    if (session !== undefined) {
      joinSession();
    }
  }, [ session ]);

  return (
    <div className="container">
      {/* {session === undefined ? (
        <div id="join">
          <div id="img-div">
            <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
          </div>
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form className="form-group" onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p className="text-center">
                <input
                  className="btn btn-lg btn-success"
                  name="commit"
                  type="submit"
                  value="JOIN"
                />
              </p>
            </form>
          </div>
        </div>
      ) : null} */}

      {session !== undefined ? (
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

          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
              {/* <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchCamera"
                onClick={switchCamera}
                value="Switch Camera"
              /> */}
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {publisher !== undefined ? (
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

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
};

export default UserRoomFormTest;
