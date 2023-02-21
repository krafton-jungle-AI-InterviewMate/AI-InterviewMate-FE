import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import AiRoomForm from "./AiRoomForm";
import UserRoomForm from "./UserRoomForm";
import { useGetQuestionBoxes } from "hooks/queries/questionBoxes";
import { questionBoxes } from "api/questionBoxes/type";
import { RoomTypes } from "api/mypage/types";
import UserRoomFormTest from "./UserRoomFormTest";

const StyledCreateRoom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
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

const CreateRoom = ({ setModalCreateRoom }) => {
  const [roomType, setRoomType] = useState<RoomTypes>("USER");
  const [questionBoxes, SetQuestionBoxes] = useState<questionBoxes[]>([]);
  const { data, isLoading, isError, isSuccess } = useGetQuestionBoxes("4"); // 임시 파라미터값

  useEffect(() => {
    if (!isLoading && data) {
      SetQuestionBoxes(data.data.data);
    }
  }, [isLoading]);

  const onClickTabBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setRoomType(name as RoomTypes);
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
              className={roomType === "USER" ? "active" : ""}
              onClick={onClickTabBtn}
              name="USER"
            >
              유저 면접관
            </StyledTabBtn>
            <StyledTabBtn
              className={roomType === "AI" ? "active" : ""}
              onClick={onClickTabBtn}
              name="AI"
            >
              AI 면접관
            </StyledTabBtn>
          </div>
        </div>
        {roomType === "USER" ? (
          <UserRoomFormTest
            roomType={roomType}
            onClickModalClose={onClickModalClose}
            questionBoxes={questionBoxes}
          />
        ) : (
          <AiRoomForm
            roomType={roomType}
            onClickModalClose={onClickModalClose}
            questionBoxes={questionBoxes}
          />
        )}
      </div>
    </StyledCreateRoom>
  );
};

export default CreateRoom;
