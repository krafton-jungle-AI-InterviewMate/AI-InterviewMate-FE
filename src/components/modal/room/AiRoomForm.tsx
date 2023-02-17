import { StyledBtn } from "styles/StyledBtn";

function AiRoomForm({ onClickModalClose }) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <StyledBtn width="380px" height="58px" color="orange">
        확인
      </StyledBtn>
      <StyledBtn onClick={onClickModalClose} width="380px" height="58px" color="red">
        취소
      </StyledBtn>
    </form>
  );
}

export default AiRoomForm;
