export const joinScripts = (
  script: string,
  recognitionResult: SpeechRecognitionResultList,
) => {
  const { transcript } = recognitionResult[0][0];

  return `${script} ${transcript}.`;
};
