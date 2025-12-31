export const speakText = (text) => {
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.9;
  utter.lang = "en-IN";

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
};

export const stopSpeech = () => {
  window.speechSynthesis.cancel();
};
