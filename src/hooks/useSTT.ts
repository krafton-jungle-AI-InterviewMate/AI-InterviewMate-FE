import { useEffect, useMemo, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  interviewModeAtom,
  answerScriptAtom,
  interviewQuestionNumberAtom,
  aiRoomResponseAtom,
} from "store/interview/atom";

import { joinScripts } from "lib/stt";

const useSTT = () => {
  const [ answerScript, setAnswerScript ] = useRecoilState(answerScriptAtom);
  const interviewMode = useRecoilValue(interviewModeAtom);
  const interviewQuestionNumber = useRecoilValue(interviewQuestionNumberAtom);
  const aiRoomResponse = useRecoilValue(aiRoomResponseAtom);

  const [ isListening, setIsListening ] = useState(false);
  const [ isRecognitionEnd, setIsRecognitionEnd ] = useState(true);
  const [ recognitionResult, setRecognitionResult ] = useState<null | SpeechRecognitionResultList>(null);

  const recognition = useMemo(() => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    return new Recognition();
  }, []);

  const handleRecognitionStart = () => {
    setIsListening(true);
    setIsRecognitionEnd(false);
  };

  const handleRecognitionEnd = () => {
    setIsListening(false);
    setIsRecognitionEnd(true);
  };

  const handleRecognitionResult = ({ results }: SpeechRecognitionEvent) => {
    setRecognitionResult(results);
  };

  // * answer mode일 때만 음성 인식 시작
  useEffect(() => {
    try {
      if (interviewMode === "answer") {
        if (isListening) {
          return;
        }
  
        recognition.start();
        handleRecognitionStart();
      }
      else {
        if (!isListening) {
          return;
        }
  
        recognition.stop();
        handleRecognitionEnd();
      }
    }
    catch (e) {
      console.log(e);
      recognition.stop();
      handleRecognitionEnd();
    }
  }, [ interviewMode ]);

  // * 음성 인식이 자동으로 종료됐는데 아직 answer mode라면 음성 인식 재시작
  useEffect(() => {
    try {
      if (isRecognitionEnd && interviewMode === "answer") {
        recognition.start();
        handleRecognitionStart();
      }
    }
    catch (e) {
      console.log(e);
      recognition.stop();
      handleRecognitionEnd();
    }
  }, [ isRecognitionEnd ]);

  // * speech recognition 객체 언어 설정 및 이벤트 핸들러 등록
  useEffect(() => {
    recognition.lang = "ko-KR";

    recognition.addEventListener("start", handleRecognitionStart);
    recognition.addEventListener("end", handleRecognitionEnd);
    recognition.addEventListener("result", handleRecognitionResult);

    return (() => {
      recognition.stop();
      recognition.removeEventListener("start", handleRecognitionStart);
      recognition.removeEventListener("end", handleRecognitionEnd);
      recognition.removeEventListener("result", handleRecognitionResult);
    });
  }, []);

  // * 음성 인식 결과로서 전달받는 transcript 가공하여 전역 상태 업데이트
  useEffect(() => {
    if (!recognitionResult || !aiRoomResponse) {
      return;
    }

    const currQuestionIdx = interviewQuestionNumber - 1;
    const {
      data: {
        questionList,
      },
    } = aiRoomResponse;

    if (answerScript.length < interviewQuestionNumber) {
      setAnswerScript((curr) => ([
        ...curr,
        {
          questionIdx: questionList[currQuestionIdx].questionIdx,
          script: joinScripts("", recognitionResult).trim(),
        },
      ]));
    }
    else {
      setAnswerScript((curr) => curr.map((scriptDto, idx) => {
        if (idx === currQuestionIdx) {
          return {
            questionIdx: questionList[currQuestionIdx].questionIdx,
            script: joinScripts(scriptDto.script, recognitionResult).trim(),
          };
        }
  
        return scriptDto;
      }));
    }

  }, [ recognitionResult ]);

  return {
    recognition,
    answerScript,
  };
};

export default useSTT;
