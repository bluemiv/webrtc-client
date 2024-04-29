import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { getLocalMediaStream } from '@/utils';
import { RequestChatModal } from '@/components';
import { useCallStatusChatStore, useSocketChatStore } from '@/store';
import { SOCKET_EVENTS_NAME } from '@/constants';

const HomePage = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { chatState, setChatState } = useCallStatusChatStore();

  const { socket } = useSocketChatStore();

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    if (!stream) return;
  }, [stream]);

  const requestPermissions = async () => {
    const stream = await getLocalMediaStream();
    setStream(stream);
  };

  const onClickRequestChat = () => {
    setChatState({ ...chatState, sendModalOpen: true });
    socket?.emit(SOCKET_EVENTS_NAME.CALL);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Button disabled={!stream} type="primary" onClick={onClickRequestChat}>
        화상 통화 요청하기
      </Button>
      <RequestChatModal />
    </div>
  );
};

export default HomePage;
