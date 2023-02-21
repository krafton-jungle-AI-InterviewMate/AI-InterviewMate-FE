import "./App.css";

import OpenViduSession from "openvidu-react";
import axios from "axios";
import { useState } from "react";

const UserInterview = () => {
  const APPLICATION_SERVER_URL = "http://localhost:5000/";
  const [mySessionId, setMySessionId] = useState("SessionA");
  const [myUserName, setMyUserName] = useState("OpenVidu_User_" + Math.floor(Math.random() * 100));
  const [token, setToken] = useState();
  const [session, setSession] = useState<boolean>();
  // this.state = {
  //   mySessionId: "SessionA",
  //   myUserName: "OpenVidu_User_" + Math.floor(Math.random() * 100),
  //   token: undefined,
  // };

  // this.handlerJoinSessionEvent = this.handlerJoinSessionEvent.bind(this);
  // this.handlerLeaveSessionEvent = this.handlerLeaveSessionEvent.bind(this);
  // this.handlerErrorEvent = this.handlerErrorEvent.bind(this);
  // this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
  // this.handleChangeUserName = this.handleChangeUserName.bind(this);
  // this.joinSession = this.joinSession.bind(this);

  const handlerJoinSessionEvent = () => {
    console.log("Join session");
  };

  const handlerLeaveSessionEvent = () => {
    console.log("Leave session");
    // setSession(undefined);
    // this.setState({
    //   session: undefined,
    // });
  };

  const handlerErrorEvent = () => {
    console.log("Leave session");
  };

  const handleChangeSessionId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyUserName(e.target.value);
  };

  const joinSession = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mySessionId && myUserName) {
      const token = await getToken();
      setToken(token);
      setSession(true);
      // this.setState({
      //   token: token,
      //   session: true,
      // });
    }
  };

  // const mySessionId = this.state.mySessionId;
  // const myUserName = this.state.myUserName;
  // const token = this.state.token;
  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async sessionId => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return response.data; // The sessionId
  };

  const createToken = async sessionId => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return response.data; // The token
  };
  return (
    <div>
      {session === undefined ? (
        <div id="join">
          <div id="join-dialog">
            <h1> Join a video session </h1>
            <form onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
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
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p>
                <input name="commit" type="submit" value="JOIN" />
              </p>
            </form>
          </div>
        </div>
      ) : (
        <div id="session">
          <OpenViduSession
            id="opv-session"
            sessionName={mySessionId}
            user={myUserName}
            token={token}
            joinSession={handlerJoinSessionEvent}
            leaveSession={handlerLeaveSessionEvent}
            error={handlerErrorEvent}
          />
        </div>
      )}
    </div>
  );
};

export default UserInterview;
