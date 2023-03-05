import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  interviewModeAtom,
  interviewQuestionNumberAtom,
  synthesizerAtom,
  playerAtom,
} from "store/interview/atom";
import { QuestionListItem } from "api/interview/type";
import { useRecorderPermission } from "hooks/useRecorderPermission";

export type UseAzureTTSParams = {
  questionList: QuestionListItem[];
};

const useAzureTTS = (params: UseAzureTTSParams) => {
  const { questionList } = params;

  const [ interviewQuestionNumber, setInterviewQuestionNumber ] = useRecoilState(
    interviewQuestionNumberAtom,
  );
  const setInterviewMode = useSetRecoilState(interviewModeAtom);
  const [ synthesizer, setSynthesizer ] = useRecoilState(synthesizerAtom);
  const [ player, setPlayer ] = useRecoilState(playerAtom);

  const {
    getPermissionInitializeRecorder,
  } = useRecorderPermission("video");

  const synthesizeSpeech = async () => {
    if (!(synthesizer && player)) {
      console.log("synthesizer is null");
      return;
    }

    const rec = await getPermissionInitializeRecorder();

    synthesizer.speakTextAsync(
      questionList[interviewQuestionNumber].questionTitle,
      result => {
        if (result) {
          try {
            synthesizer.close();
          }
          catch (e) {
            synthesizer.close();
            console.log(e);
          }
          finally {
            player.onAudioEnd = () => {
              // * question mode 중간에 나가면 이 콜백이 한박자 늦게 실행돼서
              // * 인터뷰 방으로 다시 들어가면 answer 모드로 바로 시작되어 버린다.
              // * 따라서 아래 클린업 함수에서 override 필요!
              setInterviewMode("answer");
              setInterviewQuestionNumber(curr => curr + 1);
            };
          }
        }
      });
  };

  useEffect(() => {
    (async () => {
      await synthesizeSpeech();
    })();

    return (() => {
      player?.mute();
      player?.close();
      // * override previous callback
      player!.onAudioEnd = () => {};

      setSynthesizer(null);
      setPlayer(null);
    });
  }, []);
};

export default useAzureTTS;
