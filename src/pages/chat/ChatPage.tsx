import React, { useEffect, useState } from 'react';
import { VideoContainer } from '@/components';
import { getLocalMediaStream } from '@/utils';
import { ROOM_NAME } from '@/constants';
import { useRTCPCChatStore } from '@/store';

const ChatPage = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const { pc } = useRTCPCChatStore();

  useEffect(() => {
    initLocalMeidaStream();
  }, []);

  const initLocalMeidaStream = async () => {
    const stream = await getLocalMediaStream();
    if (!stream) return;

    setLocalStream(stream);
    stream.getTracks().forEach((track) => pc?.addTrack(track, stream));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="font-semibold flex gap-6">
        <span>현재 방</span>
        <span>{ROOM_NAME}</span>
      </div>
      <div className="flex flex-col md:flex-row">
        <VideoContainer title="내 화면" className="flex-1" muted stream={localStream} />
        <VideoContainer title="상대 화면" className="flex-1" />
      </div>
    </div>
  );
};

export default ChatPage;
