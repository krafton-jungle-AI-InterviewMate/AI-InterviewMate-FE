import { useEffect, useMemo, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  interviewModeAtom,
  answerScriptAtom,
  interviewQuestionNumberAtom,
} from "store/interview/atom";

import { joinScripts } from "lib/stt";

const useSTT = () => {
  const [ answerScript, setAnswerScript ] = useRecoilState(answerScriptAtom);
  const interviewMode = useRecoilValue(interviewModeAtom);
  const interviewQuestionNumber = useRecoilValue(interviewQuestionNumberAtom);

  const [ isRecognitionEnd, setIsRecognitionEnd ] = useState(true);
  const [ recognitionResult, setRecognitionResult ] = useState<null | SpeechRecognitionResultList>(null);

  const recognition = useMemo(() => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    return new Recognition();
  }, []);

  const handleRecognitionEnd = () => {
    setIsRecognitionEnd(true);
  };

  const handleRecognitionResult = ({ results }: SpeechRecognitionEvent) => {
    setRecognitionResult(results);
  };

  // * answer mode일 때만 음성 인식 시작
  useEffect(() => {
    if (interviewMode === "answer") {
      recognition.start();
      setIsRecognitionEnd(false);
    }
    else {
      recognition.stop();
      setIsRecognitionEnd(true);
    }

    return (() => {
      recognition.stop();
    });
  }, [ interviewMode ]);

  // * 음성 인식이 자동으로 종료됐는데 아직 answer mode라면 음성 인식 재시작
  useEffect(() => {
    if (isRecognitionEnd && interviewMode === "answer") {
      recognition.start();
      setIsRecognitionEnd(false);
    }

    return (() => {
      recognition.stop();
    });
  }, [ isRecognitionEnd ]);

  // * speech recognition 객체 언어 설정 및 이벤트 핸들러 등록
  useEffect(() => {
    recognition.lang = "ko-KR";

    recognition.addEventListener("end", handleRecognitionEnd);
    recognition.addEventListener("result", handleRecognitionResult);

    return (() => {
      recognition.stop();
      recognition.removeEventListener("end", handleRecognitionEnd);
      recognition.removeEventListener("result", handleRecognitionResult);
    });
  }, []);

  // * 음성 인식 결과로서 전달받는 transcript 가공하여 전역 상태 업데이트
  useEffect(() => {
    if (!recognitionResult) {
      return;
    }

    const currQuestionIdx = interviewQuestionNumber - 1;

    setAnswerScript((curr) => curr.map((script, idx) => {
      if (idx === currQuestionIdx) {
        return joinScripts(script, recognitionResult).trim();
      }

      return script;
    }));
  }, [ recognitionResult ]);

  return {
    recognition,
    answerScript,
  };
};

export default useSTT;
