import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import AiRoomForm from "./AiRoomForm";
import UserRoomForm from "./UserRoomForm";
import { useGetQuestionBoxes } from "hooks/queries/questionBoxes";
import { QuestionBoxes } from "api/questionBoxes/type";
import { RoomTypes } from "api/mypage/types";
import "react-responsive-modal/styles.css";
import { Modal, ModalProps } from "react-responsive-modal";

type CreateRoomProps = ModalProps;

const modalStyles: ModalProps["styles"] = {
  root: {
    top: "0",
  },
  modal: {
    position: "relative",
    width: "815px",
    padding: "50px 35px",
    boxSizing: "border-box",
    boxShadow: "var(--box-shadow)",
    borderRadius: "15px",
    overflow: "hidden",
  },
};

const StyledWrap = styled.div`
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

const CreateRoom = (props: CreateRoomProps) => {
  const { open, onClose } = props;

  const [roomType, setRoomType] = useState<RoomTypes>("USER");
  const [questionBoxes, SetQuestionBoxes] = useState<QuestionBoxes[]>([]);
  const { data, isLoading, isError, isSuccess } = useGetQuestionBoxes();
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

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeOnOverlayClick={false}
      showCloseIcon={false}
      styles={modalStyles}
    >
      <StyledWrap>
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
            <UserRoomForm
              roomType={roomType}
              onClickModalClose={onClose}
              questionBoxes={questionBoxes}
            />
          ) : (
            <AiRoomForm
              roomType={roomType}
              onClickModalClose={onClose}
              questionBoxes={questionBoxes}
            />
          )}
        </div>
      </StyledWrap>
    </Modal>
  );
};

export default CreateRoom;
