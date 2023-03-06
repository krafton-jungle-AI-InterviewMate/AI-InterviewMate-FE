import styled from "@emotion/styled";

type InterviewCommentProps = {
  children: React.ReactNode;
};

const InterviewComment = (props: InterviewCommentProps) => {
  const {
    children,
  } = props;

  return (
    <StyledInterviewComment>
      {children}
    </StyledInterviewComment>
  );
};

export default InterviewComment;

const StyledInterviewComment = styled.div`
  width: 900px;
  height: 88px;
  margin: 0 auto;
  background-color: var(--main-white);
  border: 2px solid var(--main-black);
  border-radius: var(--button-border-radius);
  box-shadow: 0px 6px 24px 0px rgba(196, 196, 196, 0.357), 6px 0px 24px 0px rgba(128, 128, 128, 0.357);
  color: var(--main-black);
  word-break: keep-all;
  line-height: 1.2;
  padding: 0 10px;
`;
