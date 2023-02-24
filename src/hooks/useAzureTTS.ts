import { useEffect } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { interviewModeAtom, interviewQuestionNumberAtom } from "store/interview/atom";
import { azureTokenAtom } from "store/auth/atom";

const useAzureTTS = (questionList: string[]) => {
  const [ interviewQuestionNumber, setInterviewQuestionNumber ] = useRecoilState(
    interviewQuestionNumberAtom,
  );
  const setInterviewMode = useSetRecoilState(interviewModeAtom);
  const azureToken = useRecoilValue(azureTokenAtom);

  const synth = window.speechSynthesis;

  useEffect(() => {
    const msg = new SpeechSynthesisUtterance(questionList[interviewQuestionNumber]);
    msg.rate = 1;
    msg.pitch = 1.5;

    msg.onend = () => {
      setInterviewMode("answer");
      setInterviewQuestionNumber(curr => curr + 1);
    };

    synth.speak(msg);

    return () => {
      synth.cancel();
    };
  }, []);
};

export default useAzureTTS;
