import { useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { interviewModeAtom, interviewQuestionNumberAtom } from "store/interview/atom";

export type UseAzureTTSParams = {
  questionList: string[];
  synthesizer: SpeechSynthesizer;
  player: SpeakerAudioDestination;
};

const useAzureTTS = (params: UseAzureTTSParams) => {
  const { questionList, synthesizer, player } = params;

  const [ interviewQuestionNumber, setInterviewQuestionNumber ] = useRecoilState(
    interviewQuestionNumberAtom,
  );
  const setInterviewMode = useSetRecoilState(interviewModeAtom);

  const synthesizeSpeech = async () => {
    synthesizer.speakTextAsync(
      questionList[interviewQuestionNumber],
      result => {
        if (result) {
          synthesizer.close();
          player.onAudioEnd = () => {
            setInterviewMode("answer");
            setInterviewQuestionNumber(curr => curr + 1);
          };
        }
      },
      error => {
        console.log(error);
        synthesizer.close();
      });
  };

  useEffect(() => {
    (async () => {
      await synthesizeSpeech();
    })();

    return () => {
      synthesizer.close();
    };
  }, []);
};

export default useAzureTTS;
