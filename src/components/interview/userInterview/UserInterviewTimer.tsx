import { useEffect, useRef, useState } from "react";

interface UserInterviewTimerProps {
  roomTime: number;
}

const UserInterviewTimer = (props: UserInterviewTimerProps) => {
  const { roomTime } = props;
  const padNumber = (num, length) => {
    return String(num).padStart(length, "0");
  };

  const initialTime = useRef(roomTime * 60);
  const interval = useRef<any>();

  const [min, setMin] = useState(padNumber(initialTime, 2));
  const [sec, setSec] = useState(padNumber(initialTime, 2));

  useEffect(() => {
    interval.current = setInterval(() => {
      initialTime.current -= 1;
      setSec(padNumber(initialTime.current % 60, 2));
      setMin(padNumber(initialTime.current / 60, 2));
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
    <div>
      {min} : {sec}
    </div>
  );
};

export default UserInterviewTimer;
