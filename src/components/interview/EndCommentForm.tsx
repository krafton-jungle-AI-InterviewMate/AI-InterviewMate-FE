import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue} from "recoil";
import {
  interviewCommentAtom,
  interviewDataAtom,
} from "store/interview/atom";

import { usePostResultComment } from "hooks/queries/mypage";

import { StyledBtn } from "styles/StyledBtn";

const EndCommentForm = () => {
  const [ comment, setComment ] = useRecoilState(interviewCommentAtom);
  const interviewData = useRecoilValue(interviewDataAtom);
  const { mutate } = usePostResultComment();
  const navigate = useNavigate();

  const textarea = useRef<null | HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    if (!textarea.current) {
      return;
    }

    setComment(textarea.current.value);
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  const handleClickCommentSave = () => {
    mutate(
      {
        roomIdx: interviewData!.roomIdx,
        comment: comment,
      },
      {
        onSuccess: () => {
          console.log("저장하고 나가기");
          setComment("");
          navigate("/lobby");
        },
        onError(error) {
          alert(error);
        },
      },
    );
  };

  return (
    <div className="userEndContents">
      <p>면접자를 위한 코멘트를 남겨주세요.</p>
      <div>
        <textarea
          onChange={handleResizeHeight}
          value={comment}
          ref={textarea}
          name="comment"
          id="comment"
          cols={30}
          rows={10}
          spellCheck={false}
        ></textarea>
      </div>
      <StyledBtn onClick={handleClickCommentSave} width="150px" height="32px" color="red">
        저장하고 나가기
      </StyledBtn>
    </div>
  );
};

export default EndCommentForm;
