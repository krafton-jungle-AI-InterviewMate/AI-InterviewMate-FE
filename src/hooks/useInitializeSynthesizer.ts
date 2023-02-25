import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { aiInterviewerGenderSelector } from "store/interview/selector";
import { azureTokenAtom } from "store/auth/atom";

const useInitializeSynthesizer = () => {
  const azureToken = useRecoilValue(azureTokenAtom);
  const aiInterviewerGender = useRecoilValue(aiInterviewerGenderSelector);
  const synthVoice = useMemo(() => {
    return aiInterviewerGender === "Female"
      ? "ko-KR-SunHiNeural"
      : "ko-KR-InJoonNeural";
  }, [ aiInterviewerGender ]);
  const player = useMemo(() => new window.SpeechSDK.SpeakerAudioDestination(), []);

  const initializeSynthesizer = async () => {
    const speechConfig = window.SpeechSDK.SpeechConfig.fromAuthorizationToken(
      azureToken,
      "koreacentral",
    );

    const audioConfig = window.SpeechSDK.AudioConfig.fromSpeakerOutput(player);

    speechConfig.setProperty("SpeechServiceConnection_SynthLanguage", "ko-KR");
    speechConfig.setProperty("SpeechServiceConnection_SynthVoice", synthVoice);

    return new window.SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);
  };

  return {
    player,
    initializeSynthesizer,
  };
};

export default useInitializeSynthesizer;
