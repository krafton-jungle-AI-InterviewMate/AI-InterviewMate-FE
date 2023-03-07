import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

interface UserInterviewTimerProps {
  roomTime: number;
}

const UserInterviewTimer = (props: UserInterviewTimerProps) => {
  const { roomTime } = props;
  const padNumber = (num, length) => {
    return String(num).padStart(length, "0");
  };

  const initialTime = useRef<number>(roomTime * 60);
  const interval = useRef<any>(null);

  const [min, setMin] = useState<string>(roomTime + "");
  const [sec, setSec] = useState<string>("00");

  useEffect(() => {
    interval.current = setInterval(() => {
      initialTime.current -= 1;
      setSec(padNumber(initialTime.current % 60, 2));
      setMin(padNumber(Math.floor(initialTime.current / 60), 2));
    }, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  useEffect(() => {
    if (initialTime.current <= 0) {
      clearInterval(interval.current);
    }
  }, [sec]);

  return (
    <StyledUserInterviewTimer>
      {min} : {sec}
    </StyledUserInterviewTimer>
  );
};

const StyledUserInterviewTimer = styled.div`
  padding-top: 50px;
  font-size: 2rem;
`;

export default UserInterviewTimer;
