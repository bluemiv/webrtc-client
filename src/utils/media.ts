export const getLocalMediaStream = async () => {
  try {
    return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  } catch (e) {
    console.error(e);
  }
  return null;
};
