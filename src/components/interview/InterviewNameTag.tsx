import styled from "@emotion/styled";
import { css } from "@emotion/react";

type RoleType = "interviewee" | "interviewer";

type NameTagProps = {
  role: RoleType;
  profileName: string;
};

const NameTag = (props: NameTagProps) => {
  const {
    role,
    profileName,
  } = props;

  return (
    <StyledNameTag>
      <StyledRoleTag role={role}>
        <span>
          {role === "interviewee" ? "면접자" : "면접관"}
        </span>
      </StyledRoleTag>
      <StyledProfileName>
        {profileName}
      </StyledProfileName>
    </StyledNameTag>
  );
};

export default NameTag;

const StyledNameTag = styled.dl`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

const StyledRoleTag = styled.dt<{ role: RoleType }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 24px;
  border-radius: 5px;
  margin-right: 12px;
  font-size: 16px;
  font-weight: 500;

  ${({ role }) => role === "interviewee" && css`
    background-color: var(--main-blue);
    color: var(--main-white);
  `}
  ${({ role }) => role === "interviewer" && css`
    background-color: var(--push-gray);
    color: var(--main-black);
  `}
`;

const StyledProfileName = styled.dd`
  color: var(--main-black);
  font-size: 24px;
  font-weight: 500;
`;
