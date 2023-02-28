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
  border: 1px solid var(--main-gray);
  border-radius: var(--button-border-radius);
  box-shadow: var(--box-shadow);
  color: var(--font-gray);
  word-break: keep-all;
  line-height: 1.2;
  padding: 0 10px;
`;
