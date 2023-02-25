import { useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { interviewModeAtom, interviewQuestionNumberAtom } from "store/interview/atom";

import useInitializeSynthesizer from "hooks/useInitializeSynthesizer";

export type UseAzureTTSParams = {
  questionList: string[];
};

const useAzureTTS = (params: UseAzureTTSParams) => {
  const { questionList } = params;

  const {
    player,
    initializeSynthesizer,
  } = useInitializeSynthesizer();

  const [ interviewQuestionNumber, setInterviewQuestionNumber ] = useRecoilState(
    interviewQuestionNumberAtom,
  );
  const setInterviewMode = useSetRecoilState(interviewModeAtom);

  const synthesizeSpeech = async () => {
    const synthesizer = await initializeSynthesizer();

    synthesizer.speakTextAsync(
      questionList[interviewQuestionNumber],
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
  }, []);
};

export default useAzureTTS;
