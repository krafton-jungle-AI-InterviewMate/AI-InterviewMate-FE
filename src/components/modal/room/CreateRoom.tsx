import styled from "@emotion/styled";
import { useState } from "react";
import AiRoomForm from "./AiRoomForm";
import UserRoomForm from "./UserRoomForm";

const StyledCreateRoom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  .contents {
    border-radius: 10px;
    padding: 60px;
    width: 815px;
    background-color: var(--main-white);
    .contentsHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 45px;
      h2 {
        color: var(--main-black);
        font-size: 24px;
      }
      .tabBtn {
        button {
          margin-left: 20px;
        }
      }
    }
  }
`;

const StyledTabBtn = styled.button`
  width: 200px;
  height: 48px;
  transition: 0.2s;
  border-radius: 5px 15px;
  background-color: var(--main-white);
  filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.5));
  &.active {
    background-color: var(--main-black);
    color: var(--main-white);
  }
  &:hover {
    background-color: var(--main-black);
    color: var(--main-white);
  }
`;

function CreateRoom({ setModalCreateRoom }) {
  const [isUser, setIsUser] = useState("user");

  const onTabBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setIsUser(name);
  };

  const onClickModalClose = () => {
    setModalCreateRoom(false);
  };
  return (
    <StyledCreateRoom>
      <div className="contents">
        <div className="contentsHeader">
          <h2>방 만들기</h2>
          <div className="tabBtn">
            <StyledTabBtn
              className={isUser === "user" ? "active" : ""}
              onClick={onTabBtn}
              name="user"
            >
              유저 면접관
            </StyledTabBtn>
            <StyledTabBtn className={isUser === "ai" ? "active" : ""} onClick={onTabBtn} name="ai">
              AI 면접관
            </StyledTabBtn>
          </div>
        </div>
        {isUser === "user" ? (
          <UserRoomForm onClickModalClose={onClickModalClose} />
        ) : (
          <AiRoomForm onClickModalClose={onClickModalClose} />
        )}
      </div>
    </StyledCreateRoom>
  );
}

export default CreateRoom;
