import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { VideoContainer } from '@/components';
import { getLocalMediaStream } from '@/utils';

const ChatPage = () => {
  const params = useParams();
  const { room } = params;

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    initLocalMeidaStream();
  }, []);

  const initLocalMeidaStream = async () => {
    const stream = await getLocalMediaStream();
    setLocalStream(stream);
    // stream.getTracks().forEach((track) => peerConnection?.addTrack(track, stream));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="font-semibold flex gap-6">
        <span>현재 방</span>
        <span>{room}</span>
      </div>
      <div className="flex flex-col md:flex-row">
        <VideoContainer title="내 화면" className="flex-1" muted stream={localStream} />
        <VideoContainer title="상대 화면" className="flex-1" />
      </div>
    </div>
  );
};

export default ChatPage;
