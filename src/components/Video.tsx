import React, { useEffect, useRef } from 'react';

interface TProps {
  stream?: MediaStream | null;
  muted?: boolean;
}

const Video = ({ stream, muted = false }: TProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current || !stream) return;
    videoRef.current.srcObject = stream;
  }, [videoRef]);

  return <video ref={videoRef} className="rounded-md" autoPlay playsInline muted={muted} />;
};

export default Video;
