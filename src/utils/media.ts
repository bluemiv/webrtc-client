export const getLocalMediaStream = () =>
  navigator.mediaDevices.getUserMedia({ video: true, audio: true });
