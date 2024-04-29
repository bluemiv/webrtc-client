import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { getLocalMediaStream } from '@/utils';
import { RequestChatModal } from '@/components';

const HomePage = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
    setModalOpen(true);
    // nav(ROUTE_PATH.CHAT.replace(':room', 'test-room'));
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Button disabled={!stream} type="primary" onClick={onClickRequestChat}>
        방 들어가기
      </Button>
      {modalOpen && <RequestChatModal open={modalOpen} onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default HomePage;
