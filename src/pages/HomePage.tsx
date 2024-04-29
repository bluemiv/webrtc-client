import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants';
import { getLocalMediaStream } from '@/utils';

const HomePage = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const stream = await getLocalMediaStream();
      setStream(stream);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Button
        disabled={!stream}
        type="primary"
        onClick={() => nav(ROUTE_PATH.CHAT.replace(':room', 'test-room'))}
      >
        방 들어가기
      </Button>
    </div>
  );
};

export default HomePage;
